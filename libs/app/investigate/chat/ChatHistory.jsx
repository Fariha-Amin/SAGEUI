import React from "react";
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
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

    const toast = useRef(null);
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
        getInvestigation();
    }, [queryId]);

    async function getInvestigation(personalId) {
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
        let response;
        if (personalId) {
            // Individual Prompt
            response = await sageClient.getAnswerByPersonName(personalId, queryId);
        }
        else {
            // Default Prompt
            response = await sageClient.getAnswerByQuestionAsync(queryId);
        }
        investigation.response = response;
        setChatHistory(oldArray => oldArray);
        onAnswerLoaded && onAnswerLoaded({ response });
    };

    const onQueryChatHistoryDelegate = (e) => {
        queryId = e.id;
        getInvestigation(e.personalId);
    };

    const onDeleteClickDelegate = async (e) => {
        // Reload the investigations
        let investigations = await sageClient.getInvestigationsAsync();
        setChatHistory(reduceArray(investigations, 25));
        
        // Show toast message
        toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Your question has been successfully deleted from the page.",
            life: 5000
        });
    }

    if (loadingHistory) {
        // Loading history from API
        return <ChatHistoryLoading />
    }

    let content = null;
    if (!chatHistory || chatHistory.length <= 0) {
        // No history yet
        content = <ChatHistoryPlaceholder docCount={docCount} />
    }
    else {
        content = (
            <>
                {chatHistory.map((chatItem) => (
                    <ChatItem
                        key={chatItem.id}
                        model={chatItem}
                        onQuery={onQueryChatHistoryDelegate}
                        onDeleteClick={onDeleteClickDelegate} />)
                )}
                {loadingItem ? <ChatItemLoading /> : null}
                <div id="sage-chat-history__bottom"></div>
            </>);
    }

    return (
        <>
            {content}
            <Toast ref={toast} position="bottom-right" />
        </>);
}

export default ChatHistory;