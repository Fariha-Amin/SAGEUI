import React from "react";
import ChatItem from "./items/Item";
import ChatItemLoading from "./items/ItemLoading";
import ChatHistoryLoading from "./ChatHistoryLoading";
import ChatHistoryPlaceholder from "./ChatHistoryPlaceholder";
import sageClient from "_investigate/httpClient";
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
    onAnswerLoaded,
    docCount }) => {
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [chatHistory, setChatHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [loadingItem, setLoadingItem] = useState(false);
    

    // Get chat history on load
    useEffect(() => {
        onHistoryLoading && onHistoryLoading();
        setLoadingHistory(true);
        
        async function loadInitialInvestigations() {
            let investigations = await sageClient.getInvestigationsAsync();
            setChatHistory(reduceArray(investigations, 25));
            setLoadingHistory(false);
            setIsInitialLoad(false);
            onHistoryLoaded && onHistoryLoaded();
        }
        loadInitialInvestigations();
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
        return <ChatHistoryLoading />
    }

    if (!chatHistory || chatHistory.length <= 0) {
        // No history yet
        return <ChatHistoryPlaceholder docCount={docCount}/>
    }
    else {
        return (
            <>
                {chatHistory.map((chatItem) => <ChatItem key={chatItem.id} model={chatItem} />)}
                {loadingItem ? <ChatItemLoading /> : null}
                <div id="sage-chat-history__bottom"></div>
            </>);
    }
}

export default ChatHistory;