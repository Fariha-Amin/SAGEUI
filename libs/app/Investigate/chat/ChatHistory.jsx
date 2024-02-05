import React from "react";
import ChatHistoryItem from "./ChatHistoryItem";
import ChatHistoryLoader from "./ChatHistoryLoader";
import ChatHistoryPlaceholder from "./ChatHistoryPlaceholder";
import sageClient from "../httpClient";
import { useState, useEffect } from "react";

const ChatHistory = ({ queryId }) => {
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [chatHistory, setChatHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    // Get chat history on load
    useEffect(() => {
        setLoadingHistory(true);
        sageClient.getInvestigationsAsync()
            .then(data => setChatHistory(data))
            .then(() => setLoadingHistory(false))
            .then(() => setIsInitialLoad(false));
    }, []);

    // Ask question and get answer on query
    useEffect(() => {
        if (isInitialLoad) { return; }

        async function foo() {
            // Get the investigation object for this question
            let investigation = await sageClient.getInvestigationByQuestionAsync(queryId);
            setChatHistory(oldArray => [...oldArray, investigation]);

            // Get the answer for this question and update the model
            let response = await sageClient.getAnswerByQuestionAsync(queryId);
            investigation.response = response;
            setChatHistory(oldArray => [...oldArray]);
        };
        foo();

    }, [queryId]);

    if (loadingHistory) {
        // Loading history from API
        return <ChatHistoryLoader />
    }

    if (!chatHistory || chatHistory.length <= 0) {
        // No history yet
        return <ChatHistoryPlaceholder />
    }
    else {
        return (
            <>
                {chatHistory.map((chatItem) => <ChatHistoryItem key={chatItem.id} model={chatItem} />)}
            </>);
    }
}

export default ChatHistory;