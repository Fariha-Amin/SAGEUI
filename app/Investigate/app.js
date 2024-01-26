import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap'
import React from "react";
import ChatPrompt from "../../libs/shared/chat/ChatPrompt"
import ChatItem from "../../libs/shared/chat/ChatItem"
import Header from "./Header"


const App = () => (
    <div className="sage-investigate">
        <Row className='sage-investigate-header'>
            <Header />
        </Row>
        <Row className='sage-investigate-body'>
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
        </Row>
        <Row className='sage-investigate-footer'>
            <ChatPrompt />
        </Row>
    </div>
);

export default App;