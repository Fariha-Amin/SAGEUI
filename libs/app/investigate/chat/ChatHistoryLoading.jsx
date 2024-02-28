import './ChatHistoryLoading.scss';
import React from "react";
import { ProgressSpinner } from 'primereact/progressspinner';

const ChatHistoryLoading = () => {
    return (
        <div className="sage-chat-history__loader">
            <h2>Loading...</h2>
            <ProgressSpinner aria-label="Loading" style={{width: '64px', height: '64px'}} />
        </div>
    );
}

export default ChatHistoryLoading;