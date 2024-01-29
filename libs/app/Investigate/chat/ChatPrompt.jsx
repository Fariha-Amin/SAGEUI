import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useRef, useState, useEffect } from "react";
import sageClient from "../../../utils/web/HttpClient";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
                <Col>
                    <Form.Group>
                        <Form.Control as="textarea" placeholder={placeholderText} rows={3} ref={text} onInput={onInputDelegate} />
                        <Form.Text muted>{textLength} / {maxQueryLength}</Form.Text>
                    </Form.Group>
                </Col>
                <Col xs="auto">
                    <Button variant="secondary" onClick={onClickDelegate} disabled={!canSubmitQuery}>{loading ? "Loading..." : "Run"}</Button>
                </Col>
            </Row>
        </Form>
    );
}