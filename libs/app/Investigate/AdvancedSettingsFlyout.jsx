import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Offcanvas, Container, Stack, Button } from 'react-bootstrap';
import './AdvancedSettingsFlyout.scss'
import IconButton from '../../shared/icon-button/IconButton';
import client from './httpClient';

const AdvancedSettingsFlyout = (props) => {
    const[advOptDefaultText, setAdvOptDefaultText] = useState(null);
    useEffect(() => {
        client.getDefaultPromptText().then(data => setAdvOptDefaultText(data));
    }, [])

    const advOptTitle = "Advanced Options";
    const advOptHeader = "This default investigative prompt will be used to provide instructions to the LLM on how to answer questions about the documents in your population.";
    const advOptDefaultPrompt = "Default Prompt";
    
    return (
        <Offcanvas show={props.shouldShow} onHide={props.onClose} placement="end" backdrop="false">
            <Offcanvas.Header bsPrefix="offcanvas-header advOptHeader">
                <Stack direction="horizontal">
                    <Offcanvas.Title><b>{advOptTitle}</b></Offcanvas.Title>
                    <IconButton className="sage-icon-superscript" icon="circle-question" />
                </Stack>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Container bsPrefix="container advOptBody">
                    <Row bsPrefix="row advOptContentRow">
                        <Col>
                            {advOptHeader}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Check type={'radio'} id={`default`}>
                                    <Form.Check.Input type={'radio'} defaultChecked/>
                                    <Form.Check.Label>
                                        <b>{advOptDefaultPrompt}</b>
                                        <IconButton className="sage-icon-superscript" icon="circle-question" />
                                    </Form.Check.Label>
                                    <div className="advOptOption">
                                        {advOptDefaultText}
                                    </div>
                                </Form.Check>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <Button bsPrefix = "btn btn-primary close-button" onClick={props.onClose}>Close</Button>
            </Offcanvas.Body>
        </Offcanvas>
  );
}

export default AdvancedSettingsFlyout;