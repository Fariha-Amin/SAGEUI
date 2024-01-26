import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function ChatPrompt() {
    const placeholderText = `Ask your question here, such as "How did Enron manipulate its financial statements, and what were the consequences?"`;
    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" placeholder={placeholderText} rows={3} />
                    </Form.Group>
                </Col>
                <Col xs="auto">
                    <Button variant="secondary">Run</Button>
                </Col>
            </Row>
        </Form>
    );
}