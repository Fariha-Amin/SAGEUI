import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatPrompt.scss'
import React from 'react';
import { useRef, useState, useEffect } from "react";
import { Stack, Row, Col, Button, Form, FormLabel } from 'react-bootstrap';
import IconButton from '_shared/icon-button/IconButton';
import sageClient from "_investigate/httpClient";
import AdvancedSettingsFlyout from '_investigate/AdvancedSettingsFlyout';

const advOptHelpText = "This is also a help text";

export default function ChatPrompt({ loading, onQuery, docCount }) {
    const text = useRef("");
    const [querying, setQuerying] = useState(false);
    const [textLength, setTextLength] = useState(0);
    const [canSubmitQuery, setCanSubmitQuery] = useState(false);
    const [showAdvOptModal, setShowAdvOptModal] = useState(false);

    const maxQueryLength = 2000;
    const placeholderText = `Ask your question here, such as "How did Enron manipulate its financial statements, and what were the consequences?"`;

    const handleAdvOptShow = () => { setShowAdvOptModal(true) };
    const handleAdvOptClose = () => { setShowAdvOptModal(false) };

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

    useEffect(() => {
        if (docCount === 0) {
            setCanSubmitQuery(false);
        }
        else if (loading) {
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
    }, [loading, querying, textLength]);

    return (
        <Form>
            <Row>
                <Col bsPrefix="chat-prompt-header-col col-11">
                    <Stack direction="horizontal" gap={0}>
                        <Button className="chat-prompt-advanced-options" variant="link" onClick={handleAdvOptShow}>Advanced Options</Button>
                        <IconButton className="sage-icon-superscript" icon="circle-question" title={advOptHelpText} data-test-id="advance-options-link-help" />
                        <AdvancedSettingsFlyout shouldShow={showAdvOptModal} onClose={handleAdvOptClose} />
                    </Stack>
                </Col>
            </Row>
            <Row>
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