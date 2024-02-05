import React from "react";
import ChatHistoryItem from "./ChatHistoryItem";
import ChatHistoryLoader from "./ChatHistoryLoader";
import ChatHistoryPlaceholder from "./ChatHistoryPlaceholder";
import sageClient from "../httpClient";
import { useState, useEffect } from "react";

const ChatHistory = ({ 
    queryId, 
    onHistoryLoading, 
    onHistoryLoaded, 
    onInvestigationLoading, 
    onInvestigationLoaded, 
    onAnswerLoading, 
    onAnswerLoaded }) => {
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [chatHistory, setChatHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    // Get chat history on load
    useEffect(() => {
        onHistoryLoading && onHistoryLoading();
        setLoadingHistory(true);
        sageClient.getInvestigationsAsync()
            .then(data => setChatHistory(data))
            .then(() => setLoadingHistory(false))
            .then(() => setIsInitialLoad(false))
            .then(() => onHistoryLoaded && onHistoryLoaded());
    }, []);

    // Ask question and get answer on query
    useEffect(() => {
        if (isInitialLoad) { return; }

        async function foo() {
            // Get the investigation object for this question
            onInvestigationLoading && onInvestigationLoading({ queryId });
            let investigation = await sageClient.getInvestigationByQuestionAsync(queryId);
            setChatHistory(oldArray => [...oldArray, investigation]);
            onInvestigationLoaded && onInvestigationLoaded({ investigation });

            // Get the answer for this question and update the model
            onAnswerLoading && onAnswerLoading({ queryId });
            let response = await sageClient.getAnswerByQuestionAsync(queryId);
            investigation.response = response;
            setChatHistory(oldArray => [...oldArray]);
            onAnswerLoaded && onAnswerLoaded({ response });
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