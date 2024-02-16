import './Answer.scss';
import React from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import parse from 'html-react-parser';

export default function Answer({ model }) {
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
            return parse(answer);
        }
    };

    return (
        <Card className='sage-chat-history__item-answer'>
            <Card.Body>
                <Row>
                    <Col xs="auto">
                        <Badge bg="warning" text="dark">A{model.id}</Badge>
                    </Col>
                    <Col>
                        {renderAnswer()}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}