import React from "react";
import Help from '../../libs/shared/Help/help'
import { Dropdown, DropdownButton, FormLabel } from "react-bootstrap";

const App = () => (
    <div id="mainContainer">
        <FormLabel>neXgenAI Investigate </FormLabel>
        <Help link='#/help'></Help>
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
    </div>
);

export default App;