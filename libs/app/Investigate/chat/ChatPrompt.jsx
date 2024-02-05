import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useRef, useState, useEffect } from "react";
import sageClient from "../httpClient";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './ChatPrompt.scss'

export default function ChatPrompt({ onQuery }) {
    const text = useRef("");
    const [loading, setLoading] = useState(false);
    const [textLength, setTextLength] = useState(0);
    const [canSubmitQuery, setCanSubmitQuery] = useState(false);

    const maxQueryLength = 2000;
    const placeholderText = `Ask your question here, such as "How did Enron manipulate its financial statements, and what were the consequences?"`;

    const onClickDelegate = async (e) => {
        setLoading(true);
        const currentText = text.current.value;
        let queryId = await sageClient.poseQuestionAsync(currentText);
        setLoading(false);
        onQuery && onQuery({ id: queryId, value: currentText });
    }

    const onInputDelegate = (e) => {
        const currentText = text.current.value;
        setTextLength(currentText.length);
    }

    useEffect(() => {
        if (loading) {
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
	}, [ loading, textLength ]);

    return (
        <Form>
            <Row>
                <Col xs="11">
                    <Form.Group className="chat-prompt-div form-control">
                        <Form.Control maxLength={maxQueryLength} bsPrefix="chat-prompt-text-area" as="textarea" placeholder={placeholderText} rows={2} ref={text} onInput={onInputDelegate} />
                        <Form.Text bsPrefix="chat-prompt-text-counter form-text" muted>{textLength} / {maxQueryLength}</Form.Text>
                    </Form.Group>
                </Col>
                <Col bsPrefix="chat-prompt-run-col col-1">
                    <Button bsPrefix="chat-prompt-run-button btn" variant={canSubmitQuery ? "primary" : "secondary"} onClick={onClickDelegate} disabled={!canSubmitQuery}>{loading ? "Loading..." : "Run"}</Button>
                </Col>
            </Row>
        </Form>
    );
}