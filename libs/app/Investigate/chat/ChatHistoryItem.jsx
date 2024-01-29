import './ChatHistoryItem.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import IconButton from '../../../shared/icon-button/IconButton';

import { useContext } from 'react';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

function ContextAwareToggle({ children, eventKey, callback }) {
    // https://react-bootstrap.github.io/docs/components/accordion#custom-toggle-with-expansion-awareness
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <IconButton
            icon={isCurrentEventKey ? "chevron-down" : "chevron-up"}
            onClick={decoratedOnClick}
        >
        </IconButton>
    );
}

export default function ChatHistoryItem({ model }) {
    const promptType = "Default Prompt";
    return (
        <Accordion defaultActiveKey="0" className='sage-chat-history__item'>
            <Card>
                <Card.Header className='sage-chat-history__item-header'>
                    <Row>
                        <Col>
                        </Col>
                        <Col xs="auto">
                            <IconButton icon="star" />
                            <IconButton icon="magnifying-glass" />
                            <IconButton icon="wand-magic-sparkles" />
                            <IconButton icon="file-circle-plus" />
                            <IconButton icon="comments" />
                            <IconButton icon="trash-can" />
                            <ContextAwareToggle eventKey="0" />
                        </Col>
                    </Row>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className='sage-chat-history__item-body'>
                        <Card className='sage-chat-history__item-question'>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col xs="auto">
                                            <Badge bg="warning" text="dark">Q{model.id}</Badge>
                                        </Col>
                                        <Col>
                                            {model.question}
                                        </Col>
                                        <Col xs="auto">
                                            {promptType}
                                            {" "}
                                            <a href="#">25 Relevant Docs</a>
                                            {" "}
                                            <IconButton icon="circle-question" />
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                        <Card className='sage-chat-history__item-answer'>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col xs="auto">
                                            <Badge bg="warning" text="dark">A{model.id}</Badge>
                                        </Col>
                                        <Col>
                                            {model.answer}
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                        <Form className='sage-chat-history__item-timestamp'>
                            <Row>
                                <Col>
                                    {`${model.datetime}`}
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}