import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ChatPrompt from "../../libs/app/investigate/chat/ChatPrompt"
import ChatHistory from "../../libs/app/investigate/chat/ChatHistory"
import Header from '../../libs/app/investigate/Header'

const App = () => {
    const [query, setQuery] = useState("");

    return (
        <div className="sage-investigate">
            <Row className='sage-investigate-header'>
                <Col>
                    <Header />
                </Col>
            </Row>
            <Row className='sage-investigate-body'>
                <Col>
                    <ChatHistory query={query} />
                </Col>
            </Row>
            <Row className='sage-investigate-footer'>
                <Col>
                    <ChatPrompt query={query} onQuery={(e) => setQuery(e.value)} />
                </Col>
            </Row>
        </div>
    );
};

export default App;