import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row } from 'react-bootstrap'
import React from "react";
import ChatPrompt from "../../libs/shared/chat/ChatPrompt"
import ChatItem from "../../libs/shared/chat/ChatItem"
import HttpClient from "../../libs/utils/web/HttpClient"
import Header from '../../libs/app/Investigate/header'
import { useState, useEffect } from "react"

const sageClient = new HttpClient();

const ChatHistory = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    useEffect(() => {
        setLoadingHistory(true);
        sageClient.getChatHistoryAsync()
            .then(data => setChatHistory(data))
            .then(() => setLoadingHistory(false));
    }, []);

    if (loadingHistory) {
        // Loading history from API
        return <p>Loading...</p>
    }

    if (!chatHistory || chatHistory.length <= 0) {
        // No history yet
        return <p>Placeholder for no history. To do: implement this.</p>
    }
    else {
        return (
            <>
                {() => {for (const chat of chatHistory) {
                    <ChatItem />
                }}}
            </>);
    }
}

const App = () => (
    <div className="sage-investigate">
        <Row className='sage-investigate-header'>
            <Header />
        </Row>
        <Row className='sage-investigate-body'>
            <ChatHistory />
        </Row>
        <Row className='sage-investigate-footer'>
            <ChatPrompt />
        </Row>
    </div>
);

export default App;