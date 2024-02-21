import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "_root/sage.scss";
import './App.css';
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import ChatPrompt from "_investigate/chat/ChatPrompt";
import ChatHistory from "_investigate/chat/ChatHistory";
import Header from '_investigate/Header';
import { setCount } from '_investigate/Reducers/docCounterSlice';
import client from '_investigate/httpClient';

const App = () => {
    useEffect(() => {
        client.getDocumentCountAsync().then(data => dispatch(setCount(data)));
    }, [])
    const docCount = useSelector((state) => state.docCounter.value);
    const dispatch = useDispatch();

    const [queryId, setQueryId] = useState(0);
    const [loading, setLoading] = useState(false);

    function onQueryDelegate(e) {
        setQueryId(e.id);
        setLoading(true);
    };

    function onHistoryLoadingDelegate(e) {
        setLoading(true);
    };

    function onHistoryLoadedDelegate(e) {
        setLoading(false);
    };

    function onInvestigationLoadingDelegate(e) {
        setLoading(true);
    };

    function onAnswerLoadedDelegate(e) {
        setLoading(false);
    };

    return (
        <div className="sage-investigate">
            <div className='grid sage-investigate__header'>
                <div className="col">
                    <Header docCount={docCount} />
                </div>
            </div>
            <div className='grid sage-investigate__body'>
                <div className="col">
                    <ChatHistory 
                        queryId={queryId} 
                        onHistoryLoading={onHistoryLoadingDelegate} 
                        onHistoryLoaded={onHistoryLoadedDelegate}
                        onInvestigationLoading={onInvestigationLoadingDelegate}
                        onAnswerLoaded={onAnswerLoadedDelegate}
                        docCount={docCount}
                        />
                </div>
            </div>
            <div className='grid sage-investigate__footer'>
                <div className="col">
                    <ChatPrompt loading={loading} onQuery={onQueryDelegate} docCount={docCount} />
                </div>
            </div>
        </div>
    );
};

export default App;