import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row } from 'react-bootstrap'
import React from "react";
import { useState } from "react";
import ChatPrompt from "../../libs/app/investigate/chat/ChatPrompt"
import ChatHistory from "../../libs/app/investigate/chat/ChatHistory"
import Header from '../../libs/app/investigate/Header'

const App = () => {
    const [query, setQuery] = useState("");

    return (
        <div className="sage-investigate">
            <Row className='sage-investigate-header'>
                <Header />
            </Row>
            <Row className='sage-investigate-body'>
                <ChatHistory query={query} />
            </Row>
            <Row className='sage-investigate-footer'>
                <ChatPrompt query={query} onQuery={(e) => setQuery(e.value)} />
            </Row>
        </div>
    );
};

export default App;