import React from "react";
import ChatHistoryItem from "./ChatHistoryItem";
import ChatHistoryLoader from "./ChatHistoryLoader";
import ChatHistoryItemLoader from "./ChatHistoryItemLoader";
import ChatHistoryPlaceholder from "./ChatHistoryPlaceholder";
import sageClient from "../httpClient";
import { useState, useEffect } from "react";

function reduceArray(array, maxItemCount) {
    if (array.length > maxItemCount) {
        let startIndex = array.length - maxItemCount;
        startIndex = startIndex < 0 ? 0 : startIndex;
        let endIndex = startIndex + maxItemCount;
        array = array.slice(startIndex, endIndex);
    }
    return array;
}

function scrollToBottomOfChat() {
    let intervalId;

    const scroll = () => {
        const element = document.getElementById("sage-chat-history__bottom");
        if (element) {
            element.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
            clearInterval(intervalId);
        }
    }

    intervalId = setInterval(scroll, 500);
}

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
    const [loadingItem, setLoadingItem] = useState(false);

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

        async function getInvestigation() {
            // Let the user know we are loading the investigation
            setLoadingItem(true);
            scrollToBottomOfChat();

            // Get the investigation
            onInvestigationLoading && onInvestigationLoading({ queryId });
            let investigation = await sageClient.getInvestigationByQuestionAsync(queryId);

            // Show the investigation
            setLoadingItem(false);
            setChatHistory(oldArray => {
                let newArray = [...oldArray, investigation];
                return reduceArray(newArray, 25);
            });
            scrollToBottomOfChat();
            onInvestigationLoaded && onInvestigationLoaded({ investigation });

            // Get the answer for this question and update the model
            onAnswerLoading && onAnswerLoading({ queryId });
            let response = await sageClient.getAnswerByQuestionAsync(queryId);
            investigation.response = response;
            setChatHistory(oldArray => oldArray);
            onAnswerLoaded && onAnswerLoaded({ response });
        };
        getInvestigation();

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
                {loadingItem ? <ChatHistoryItemLoader /> : null}
                <div id="sage-chat-history__bottom"></div>
            </>);
    }
}

export default ChatHistory;