import 'bootstrap/dist/css/bootstrap.min.css'
import "../../sage.scss";
import './App.css';
import React from "react";
import { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ChatPrompt from "_investigate/chat/ChatPrompt";
import ChatHistory from "_investigate/chat/ChatHistory";
import Header from '_investigate/Header';

import { useSelector, useDispatch } from 'react-redux'
import { setCount } from '../../libs/app/investigate/Reducers/docCounterSlice';
import client from '../../libs/app/investigate/httpClient';

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
            <Row className='sage-investigate-header'>
                <Col>
                    <Header docCount={docCount} />
                </Col>
            </Row>
            <Row className='sage-investigate-body'>
                <Col>
                    <ChatHistory 
                        queryId={queryId} 
                        onHistoryLoading={onHistoryLoadingDelegate} 
                        onHistoryLoaded={onHistoryLoadedDelegate}
                        onInvestigationLoading={onInvestigationLoadingDelegate}
                        onAnswerLoaded={onAnswerLoadedDelegate}
                        docCount={docCount}
                        />
                </Col>
            </Row>
            <Row className='sage-investigate-footer'>
                <Col>
                    <ChatPrompt loading={loading} onQuery={onQueryDelegate} docCount={docCount} />
                </Col>
            </Row>
        </div>
    );
};

export default App;