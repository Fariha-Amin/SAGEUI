import 'bootstrap/dist/css/bootstrap.min.css';
import './Question.scss';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import IconButton from '_shared/icon-button/IconButton';

export default function Question({ model }) {
    
    return (
        <Card className='sage-chat-history__item-question'>
            <Card.Body>
                <Row>
                    <Col xs="auto">
                        <Badge bg="warning" text="dark">Q{model.id}</Badge>
                    </Col>
                    <Col>
                        {model.query.question}
                    </Col>
                    {(model.query.prompt.type ==='Individual') 
                        ? <Col className='individual-prompt' xs="auto"> {`${model.query.prompt.type} Prompt`} </Col> 
                        : <Col className='default-prompt' xs="auto"> {`${model.query.prompt.type} Prompt`} 
                                {" "} 
                                <a href="#">25 Relevant Docs</a> 
                                {" "}  
                                <IconButton icon="circle-question" /> </Col> 
                    }
                </Row>
            </Card.Body>
        </Card>
    );
}