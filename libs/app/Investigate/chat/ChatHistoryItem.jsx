import './ChatHistoryItem.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Icon from '../../../shared/icon/Icon';
import IconButton from '../../../shared/icon-button/IconButton';
import LayeredIconButton from '../../../shared/layered-icon-button/LayeredIconButton';

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

function formatDate(datetime) {
    const d = new Date(datetime);
    const locale = "en-us";

    // Produces the format: 12 February 2024
    const dOptions = { month: 'long' };
    const month = d.toLocaleDateString(locale, dOptions);
    const date = `${d.getDay()} ${month} ${d.getFullYear()}`;

    // Produces the format: 09:54 AM
    const tOptions = { hour: "2-digit", minute: "2-digit" };
    const time = d.toLocaleTimeString(locale, tOptions)

    return `${date} - ${time}`;
}

export default function ChatHistoryItem({ model }) {
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
            return model.response.answer;
        }
    };

    return (
        <Accordion defaultActiveKey="0" className='sage-chat-history__item' data-id={model.id}>
            <Card>
                <Card.Header className='sage-chat-history__item-header'>
                    <Row>
                        <Col>
                        </Col>
                        <Col xs="auto">
                            <IconButton icon="fa-regular fa-star" />
                            <IconButton icon="magnifying-glass" />
                            <IconButton icon="wand-magic-sparkles" />
                            <LayeredIconButton>
                                <Icon icon="fa-regular fa-file-lines" />
                                <Icon icon="circle" transform="shrink-6 down-5 right-5" />
                                <Icon icon="plus" transform="shrink-7 down-5 right-5" inverse />
                            </LayeredIconButton>
                            <IconButton icon="fa-regular fa-comments" />
                            <IconButton icon="fa-regular fa-trash-can" />
                            <ContextAwareToggle eventKey="0" />
                        </Col>
                    </Row>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className='sage-chat-history__item-body'>
                        <Card className='sage-chat-history__item-question'>
                            <Card.Body>
                                <Row>
                                    <Col xs="auto">
                                        <Badge bg="warning" text="dark">Q{model.id}</Badge>
                                    </Col>
                                    <Col>
                                        {model.query.question}
                                    </Col>
                                    <Col xs="auto">
                                        {`${model.query.prompt.type} Prompt`}
                                        {" "}
                                        <a href="#">25 Relevant Docs</a>
                                        {" "}
                                        <IconButton icon="circle-question" />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
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
                        <div className='sage-chat-history__item-timestamp'>
                            <Row>
                                <Col>
                                    {formatDate(model.datetime)}
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}