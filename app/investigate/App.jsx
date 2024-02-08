import 'bootstrap/dist/css/bootstrap.min.css'
import "../../sage.scss";
import './App.css';
import React from "react";
import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ChatPrompt from "../../libs/app/investigate/chat/ChatPrompt";
import ChatHistory from "../../libs/app/investigate/chat/ChatHistory";
import Header from '../../libs/app/investigate/Header';

const App = () => {
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
                    <Header />
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
                        />
                </Col>
            </Row>
            <Row className='sage-investigate-footer'>
                <Col>
                    <ChatPrompt loading={loading} onQuery={onQueryDelegate} />
                </Col>
            </Row>
        </div>
    );
};

export default App;