import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Offcanvas, Container, Stack, Button } from 'react-bootstrap';
import './AdvancedSettingsFlyout.scss'
import IconButton from '_shared/icon-button/IconButton';
import client from './httpClient';

const AdvancedSettingsFlyout = (props) => {
    const [advOptDefaultText, setAdvOptDefaultText] = useState("");

    useEffect(() => { 
        async function foo() {
            let prompt = await client.getDefaultPromptText();
            setAdvOptDefaultText(prompt);
        }
        foo();
    }, []);

    const advOptTitle = "Advanced Options";
    const advOptHeader = "This default investigative prompt will be used to provide instructions to the LLM on how to answer questions about the documents in your population.";
    const advOptDefaultPrompt = "Default Prompt";
    const helpTextTitle="This is help text";
    const helpTextDefaultPrompt="This is also help text";
    
    return (
        <Offcanvas show={props.shouldShow} onHide={props.onClose} placement="end" backdrop="false">
            <Offcanvas.Header bsPrefix="offcanvas-header advopt-header">
                <Stack direction="horizontal">
                    <Offcanvas.Title><b>{advOptTitle}</b></Offcanvas.Title>
                    <IconButton className="sage-icon-superscript" icon="circle-question" title={helpTextTitle} titlePlacement="bottom" />
                </Stack>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Container bsPrefix="container advopt-body">
                    <Row bsPrefix="row advopt-content-row">
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
                                        <IconButton className="sage-icon-superscript" icon="circle-question" title={helpTextDefaultPrompt} />
                                    </Form.Check.Label>
                                    <div className="advopt-option">
                                        {advOptDefaultText}
                                    </div>
                                </Form.Check>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <Button bsPrefix = "btn btn-primary advopt-close-button" onClick={props.onClose}>Close</Button>
            </Offcanvas.Body>
        </Offcanvas>
  );
}

export default AdvancedSettingsFlyout;