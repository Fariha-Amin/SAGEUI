import 'bootstrap/dist/css/bootstrap.min.css'
import "../../sage.scss";
import './App.css';
import React from "react";
import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ChatPrompt from "../../libs/app/investigate/chat/ChatPrompt";
import ChatHistory from "../../libs/app/investigate/chat/ChatHistory";
import Header from '../../libs/app/investigate/Header';

const App = () => {
    const [queryId, setQueryId] = useState(0);

    return (
        <div className="sage-investigate">
            <Row className='sage-investigate-header'>
                <Col>
                    <Header />
                </Col>
            </Row>
            <Row className='sage-investigate-body'>
                <Col>
                    <ChatHistory queryId={queryId} />
                </Col>
            </Row>
            <Row className='sage-investigate-footer'>
                <Col>
                    <ChatPrompt onQuery={(e) => setQueryId(e.id)} />
                </Col>
            </Row>
        </div>
    );
};

export default App;