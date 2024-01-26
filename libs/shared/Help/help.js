import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const Help = (props) => (
    <a href={props.link}><FontAwesomeIcon icon={faCircleQuestion} /></a>
);

export default Help;