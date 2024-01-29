import './ChatHistoryLoader.css';
import React from "react";
import Spinner from 'react-bootstrap/Spinner';

const ChatHistoryLoader = () => {
    return (
        <div className="sage-chat-history__loader">
            <h2>Loading...</h2>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default ChatHistoryLoader;