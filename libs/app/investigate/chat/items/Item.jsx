import './Item.scss';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import AccordionButton from '_shared/accordion-button/AccordionButton'
import Actions from './Actions';
import Answer from './Answer';
import Question from './Question';
import sageClient from "_investigate/httpClient";

function formatDate(datetime) {
    const d = new Date(datetime);
    const locale = "en-us";

    // Produces the format: 12 February 2024
    const dOptions = { month: 'long' };
    const month = d.toLocaleDateString(locale, dOptions);
    const date = `${d.getDate()} ${month} ${d.getFullYear()}`;

    // Produces the format: 09:54 AM
    const tOptions = { hour: "2-digit", minute: "2-digit" };
    const time = d.toLocaleTimeString(locale, tOptions)

    return `${date} - ${time}`;
}

export default function Item({ model }) {

    const onFavoriteClickDelegate = async (e) => {
        model.isFavorite = !model.isFavorite;
        await sageClient.updateInvestigation(model);
    }

    const onNoteClickkDelegate = async (e) => {
        // Show note UI
        // To do
        model.hasNote = !model.hasNote;
        await sageClient.updateInvestigation(model);
    }

    const onFeedbackClickDelegate = async (e) => {
        // Show feedback UI
        // To do
        model.hasFeedback = !model.hasFeedback;
        await sageClient.updateInvestigation(model);
    }

    const onDeleteClickDelegate = async (e) => {
        model.isDeleted = !model.isDeleted;
        await sageClient.updateInvestigation(model);
    }

    return (
        <Accordion defaultActiveKey="0" className='sage-chat-history__item' data-id={model.id}>
            <Card>
                <Card.Header className='sage-chat-history__item-header'>
                    <Row>
                        <Col>
                        </Col>
                        <Col xs="auto">
                            <Stack direction="horizontal">
                                <Actions
                                    model={model}
                                    onFavoriteClick={onFavoriteClickDelegate}
                                    onNoteClick={onNoteClickkDelegate}
                                    onFeedbackClick={onFeedbackClickDelegate}
                                    onDeleteClick={onDeleteClickDelegate}
                                />
                                <AccordionButton eventKey="0" />
                            </Stack>
                        </Col>
                    </Row>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className='sage-chat-history__item-body'>
                        <Question model={model} />
                        <Answer model={model} />
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