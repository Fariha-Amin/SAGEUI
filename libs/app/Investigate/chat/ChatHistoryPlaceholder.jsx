import './ChatHistoryPlaceholder.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

export default function ChatHistoryPlaceholder() {
    return (
        <div className='sage-chat-history__placeholder'>
            <Row>
                <p>
                    Enter a question to start your investigation process. For guidance on using the neXgenAI features in Sightline, please refer to the <a href="#">FAQ</a>.
                </p>
            </Row>
            <br />
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
    );
}