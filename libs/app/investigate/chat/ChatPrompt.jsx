import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useRef, useState, useEffect } from "react";
import sageClient from "../httpClient";
<<<<<<< Updated upstream:libs/app/investigate/chat/ChatPrompt.jsx
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './ChatPrompt.scss'
=======
import { Stack, Row, Col, Button, Form, FormLabel, Modal, Container } from 'react-bootstrap';
import './ChatPrompt.scss'
import IconButton from '../../../shared/icon-button/IconButton';
import AdvancedSettingsModal from '../advancedSettingsModal';

const advOptHelpText = "This is also a help text";
const advOptTitle = "Advanced Options";
const advOptHeader = "This default investigative prompt will be used to provide instructions to the LLM on how to answer questions about the documents in your population.";
const advOptDefaultPrompt = "Default Prompt";
const advOptDefaultOption = "Assistant that helps with general questions about the contents of documents.\n"+
"Please identify person names in your answer.\n"+
"Whenever you mention a person name you must encapsulate it within the <name> and </name> tags.\n"+
"For instance, if you mention \'Joe Bloggs,\' you should format it as \"Here is information about <name>Joe Bloggs</name>\'s job title\".\n"+
"Even if you cannot answer the question you must encapsulate the name.\n"+
"You may be provided with the contents from several documents, if there are facts that answer the question in more than one document use those facts and cite that document.\n"+
"If you find contradictory information in those documents, then highlight the contradiction and provide both answers.\n"+
"Answer ONLY with the facts in the the source document.\n"+
"Do not answer the question from any other source.\n"+
"After you have stated a fact, provide a source for that fact at the end of the fact.\n"+
"If there isn\'t enough information in the source to answer the question, say you do not know.\n"+
"Do not generate answers that do not use the sources provided.\n"+
"For each document that you reference extract all people names and list them along with the document reference from which they came.\n"+
"Each Source has a name followed by the thorn character \'þ\' and the contents of that document.\n"+
"Do not combine sources, reference each Source separately.\n"+
"Use square brackets to reference the source document, e.g. [ID12345678]\n"
>>>>>>> Stashed changes:libs/app/Investigate/chat/ChatPrompt.jsx

export default function ChatPrompt({ loading, onQuery }) {
    const text = useRef("");
    const [querying, setQuerying] = useState(false);
    const [textLength, setTextLength] = useState(0);
    const [canSubmitQuery, setCanSubmitQuery] = useState(false);

    const maxQueryLength = 2000;
    const placeholderText = `Ask your question here, such as "How did Enron manipulate its financial statements, and what were the consequences?"`;
<<<<<<< Updated upstream:libs/app/investigate/chat/ChatPrompt.jsx
=======

>>>>>>> Stashed changes:libs/app/Investigate/chat/ChatPrompt.jsx

    const onClickDelegate = async (e) => {
        setQuerying(true);
        const currentText = text.current.value;
        let queryId = await sageClient.poseQuestionAsync(currentText);
        setQuerying(false);
        onQuery && onQuery({ id: queryId, value: currentText });
    }

    const onInputDelegate = (e) => {
        const currentText = text.current.value;
        setTextLength(currentText.length);
    }

    const handleAdvOptClose = () => setShowAdvOptModal(false);

    const handleAdvOptShow = () => setShowAdvOptModal(true);

    useEffect(() => {
        if (loading) {
            setCanSubmitQuery(false);
        }
        else if (querying) {
            setCanSubmitQuery(false);
        }
        else if (textLength === 0) {
            setCanSubmitQuery(false);
        }
        else if (textLength > maxQueryLength) {
            setCanSubmitQuery(false);
        }
		else {
            setCanSubmitQuery(true);
        }
	}, [ loading, querying, textLength ]);

    return (
        <Form>
            <Row>
<<<<<<< Updated upstream:libs/app/investigate/chat/ChatPrompt.jsx
=======
                <Col bsPrefix="chat-prompt-header-col col-11">
                    <Stack direction="horizontal" gap={0}>
                        <FormLabel bsPrefix="chat-prompt-advanced-options form-label" onClick={handleAdvOptShow}>Advanced Options</FormLabel>
                        <Modal show={showAdvOptModal} onHide={handleAdvOptClose} backdrop="false" dialogClassName="advOptmodal" contentClassName="advOptContent">
                            <Modal.Header closeButton bsPrefix="modal-header advOptHeader">
                                <Modal.Title>{advOptTitle}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <Row bsPrefix="row advOptContentRow">
                                        <Col>
                                            {advOptHeader}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form>
                                                <Form.Check // prettier-ignore
                                                    type={'radio'}
                                                    id={`default`}
                                                    label={advOptDefaultPrompt}
                                                    defaultChecked
                                                />
                                                <div className="advOptOption">
                                                    {advOptDefaultOption}
                                                </div>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Container>
                            </Modal.Body>
                        </Modal>
                        <IconButton className="sage-icon-superscript" icon="circle-question" tooltip={advOptHelpText} tooltipId="advanced-optiond-title-help" />
                    </Stack>
                </Col>
            </Row>
            <Row>
>>>>>>> Stashed changes:libs/app/Investigate/chat/ChatPrompt.jsx
                <Col xs="11">
                    <Form.Group className="chat-prompt-div form-control">
                        <Form.Control maxLength={maxQueryLength} bsPrefix="chat-prompt-text-area" as="textarea" placeholder={placeholderText} rows={2} ref={text} onInput={onInputDelegate} />
                        <Form.Text bsPrefix="chat-prompt-text-counter form-text" muted>{textLength} / {maxQueryLength}</Form.Text>
                    </Form.Group>
                </Col>
                <Col bsPrefix="chat-prompt-run-col col-1">
                    <Button bsPrefix="chat-prompt-run-button btn" variant={canSubmitQuery ? "primary" : "secondary"} onClick={onClickDelegate} disabled={!canSubmitQuery}>{querying ? "Loading..." : "Run"}</Button>
                </Col>
            </Row>
        </Form>
    );
}