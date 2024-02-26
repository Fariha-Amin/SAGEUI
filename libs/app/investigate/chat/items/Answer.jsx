import 'bootstrap/dist/css/bootstrap.min.css';
import './Answer.scss';
import React from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import parse from 'html-react-parser';
import ChatPrompt from '../ChatPrompt';
import sageClient from '../../httpClient'

export default function Answer({ model, onQuery }) {
    let renderAnswer = () => {
        if (model.response.isInProgress) {
            return (
                <>
                    <Placeholder animation="glow" as="div">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder animation="glow" as="div">
                        <Placeholder xs={3} /> <Placeholder xs={3} /> <Placeholder xs={3} />
                    </Placeholder>
                    <Placeholder animation="glow" as="div">
                        <Placeholder xs={4} /> <Placeholder xs={4} />
                    </Placeholder>
                    <Placeholder animation="glow" as="div">
                        <Placeholder xs={7} />
                    </Placeholder>
                </>);
        }
        else if (!model.response.result.isSuccess) {
            return model.response.result.failureReason;
        }
        else {
            // Format the output to include links
            let answer = model.response.answer;
            for (let docId of model.response.documentIds) {
                answer = answer.replaceAll(docId, `<a href="#">${docId}</a>`);
            }
            for(let personName of model.response.personNames)
            {
                answer = answer.replaceAll(personName, `<button> ${personName}</button>`);
            }
            return parse(answer, {
                replace: (domNode) => 
                   {
                        if (domNode.name === "button") 
                            {
                                return <button className="personName" onClick={onClickAnswerDelegate} value={domNode.children[0].data} >{domNode.children[0].data}</button>;
                            }
                   }
                });
        }
    };
   
    const onClickAnswerDelegate = async (e) => {
        const currentText = `Provide a summary of ${e.target.value}.`;
        let queryId = await sageClient.poseQuestionAsync(currentText, "Individual");
        onQuery && onQuery({ id: queryId, value: currentText, personalId: e.target.value });
    }

    return (
        <Card className='sage-chat-history__item-answer'>
            <Card.Body>
                <Row>
                    <Col xs="auto">
                        <Badge bg="warning" text="dark">A{model.id}</Badge>
                    </Col>
                        {
                            (model.query.prompt.type ==='Individual') 
                                ? <Col className='individual-col'>{renderAnswer()}</Col>
                                : <Col>{renderAnswer()}</Col>
                        }
                </Row>
            </Card.Body>
        </Card>
    );
}