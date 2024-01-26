import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useRef, useState } from "react";
import sageClient from "../../utils/web/HttpClient";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function ChatPrompt({ query, onQuery }) {
    const text = useRef(query);
    const [loading, setLoading] = useState(false);

    const placeholderText = `Ask your question here, such as "How did Enron manipulate its financial statements, and what were the consequences?"`;

    const onClickDelegate = (e) => {
        setLoading(true);
        const queryText = text.current.value;
        sageClient.poseQuestionAsync(queryText)
            .then(() => setLoading(false))
            .then(() => onQuery && onQuery({ value: queryText }));
    }

    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Control as="textarea" placeholder={placeholderText} rows={3} ref={text} />
                    </Form.Group>
                </Col>
                <Col xs="auto">
                    <Button variant="secondary" onClick={onClickDelegate}>{loading ? "Loading..." : "Run"}</Button>
                </Col>
            </Row>
        </Form>
    );
}