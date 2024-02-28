import './AdvancedSettingsFlyout.scss'
import React, { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import IconButton from '_shared/icon-button/IconButton';
import styled from 'styled-components';
import client from './httpClient';

const H3 = styled.h3`
    display: inline-block;
`;

const defaultValue = "default";
const radioName = "promptType";

const advOptTitle = "Advanced Options";
const advOptHeader = "This default investigative prompt will be used to provide instructions to the LLM on how to answer questions about the documents in your population.";
const advOptDefaultPrompt = "Default Prompt";
const helpTextTitle = "This is help text";
const helpTextDefaultPrompt = "This is also help text";

const AdvancedSettingsFlyout = (props) => {
    const [selection, setSelection] = useState(defaultValue);
    const [advOptDefaultText, setAdvOptDefaultText] = useState("");

    useEffect(() => {
        async function getAdvOptDefaultText() {
            let prompt = await client.getDefaultPromptText();
            setAdvOptDefaultText(prompt);
        }
        getAdvOptDefaultText();
    }, []);

    const content = ({ closeIconRef, hide }) => {
        return (
            <>
                <div className="sage-flyout__header">
                    <div className="header__title">
                        <H3>{advOptTitle}</H3>
                        <IconButton className="sage-icon-superscript" icon="circle-question" title={helpTextTitle} titlePlacement="bottom" />
                    </div>
                    <div className="header__sub-title">
                        <p>
                            {advOptHeader}
                        </p>
                    </div>
                </div>
                <div className="sage-flyout__body flex flex-grow-1">
                    <div>
                        <div className="body__radio">
                            <RadioButton inputId="defaultPrompt" name={radioName} value={defaultValue} onChange={(e) => setSelection(e.value)} checked={selection === defaultValue} />
                            <label htmlFor="defaultPrompt" className="ml-2">{advOptDefaultPrompt}</label>
                            <IconButton className="sage-icon-superscript" icon="circle-question" title={helpTextDefaultPrompt} />
                        </div>
                        <div className="body__value">
                            {advOptDefaultText}
                        </div>
                    </div>
                </div>
                <div className="sage-flyout__footer flex justify-content-end">
                    <Button className="footer__close-button" ref={closeIconRef} onClick={(e) => hide(e)} label="Close" />
                </div>
            </>
        );
    };

    return (
        <Sidebar
            position="right"
            visible={props.shouldShow}
            onHide={props.onClose}
            className="sage-advanced-options__flyout flex flex-column"
            content={content}></Sidebar>
    );
}

export default AdvancedSettingsFlyout;