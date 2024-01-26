import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Help from '../../libs/shared/Help/help'
import { Dropdown, DropdownButton, FormLabel } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import ChatPrompt from "../../libs/shared/chat/ChatPrompt"
import ChatItem from "../../libs/shared/chat/ChatItem"

const App = () => (
    <div className="sage-investigate">
        <Row className='sage-investigate-header'>
            <FormLabel>neXgenAI Investigate </FormLabel>
            <Help link='#/help'></Help>
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
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