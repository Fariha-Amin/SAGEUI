import React from "react";
import ChatItem from "./ChatItem"
import sageClient from "../../../utils/web/HttpClient";
import { useState, useEffect } from "react";

const ChatHistory = (query) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    useEffect(() => {
        setLoadingHistory(true);
        sageClient.getChatHistoryAsync()
            .then(data => setChatHistory(data))
            .then(() => setLoadingHistory(false));
    }, [query]);

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
                {chatHistory.map((chatItem) => <ChatItem key={chatItem.id} model={chatItem} /> )}
            </>);
    }
}

export default ChatHistory;