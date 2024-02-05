import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useRef, useState, useEffect } from "react";
import sageClient from "../httpClient";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './ChatPrompt.scss'

export default function ChatPrompt({ query, onQuery }) {
    const text = useRef(query);
    const [loading, setLoading] = useState(false);
    const [textLength, setTextLength] = useState(query ? query.length : 0);
    const [canSubmitQuery, setCanSubmitQuery] = useState(false);

    const maxQueryLength = 2000;
    const placeholderText = `Ask your question here, such as "How did Enron manipulate its financial statements, and what were the consequences?"`;

    const onClickDelegate = (e) => {
        setLoading(true);
        const queryText = text.current.value;
        sageClient.poseQuestionAsync(queryText)
            .then(() => setLoading(false))
            .then(() => onQuery && onQuery({ value: queryText }));
    }

    const onInputDelegate = (e) => {
        const queryText = text.current.value;
        setTextLength(queryText.length);
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