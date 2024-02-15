import './ChatHistoryPlaceholder.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

export default function ChatHistoryPlaceholder(docCount) {
    const defaultPlaceholder = 
        <div className='sage-chat-history__placeholder'>
            <Row>
                <Col></Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Your results will appear in this space.
                            </Card.Title>
                            <Card.Text>
                                You can then investigate into the questions and
                                answers generated from documents in population.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </div>
    ;

    const zeroDocsPlaceholder = 
        <div className='sage-chat-history__placeholder'>
            <Row>
                <Col></Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                There are currently no documents in your Investigate Population.
                            </Card.Title>
                            <Card.Text>
                            Please add documents using the “Manage Population” button above. 
                            Once added, you can ask questions about the documents in your Investigate Population and take action on the responses provided by the Generative AI model.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </div>
    ;

    return (docCount.docCount > 0 ? defaultPlaceholder: zeroDocsPlaceholder);
}