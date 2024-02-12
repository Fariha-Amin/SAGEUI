import React from 'react';
import { Row, Col, Form, Offcanvas, Container } from 'react-bootstrap';
import './AdvancedSettingsFlyout.scss'

const AdvancedSettingsFlyout = (props) => {
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

    return (
        <Offcanvas show={props.shouldShow} onHide={props.onClose} placement="end" backdrop="false">
            <Offcanvas.Header closeButton bsPrefix="offcanvas-header advOptHeader">
                <Offcanvas.Title>{advOptTitle}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Container>
                    <Row bsPrefix="row advOptContentRow">
                        <Col>
                            {advOptHeader}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Check
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
            </Offcanvas.Body>
        </Offcanvas>
  );
}

export default AdvancedSettingsFlyout;