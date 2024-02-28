import './ChatPrompt.scss'
import React from 'react';
import { useRef, useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import IconButton from '_shared/icon-button/IconButton';
import sageClient from "_investigate/httpClient";
import AdvancedSettingsFlyout from '_investigate/AdvancedSettingsFlyout';

const advOptHelpText = "This is also a help text";

export default function ChatPrompt({ loading, onQuery, docCount }) {
    const text = useRef("");
    const [querying, setQuerying] = useState(false);
    const [textLength, setTextLength] = useState(0);
    const [canSubmitQuery, setCanSubmitQuery] = useState(false);
    const [showAdvOptModal, setShowAdvOptModal] = useState(false);

    const maxQueryLength = 2000;
    const placeholderText = `Ask your question here, such as "How did Enron manipulate its financial statements, and what were the consequences?"`;

    const handleAdvOptShow = () => { setShowAdvOptModal(true) };
    const handleAdvOptClose = () => { setShowAdvOptModal(false) };

    const onClickDelegate = async (e) => {
        setQuerying(true);
        const currentText = text.current.value;
        let queryId = await sageClient.poseQuestionAsync(currentText, "Default");
        setQuerying(false);
        onQuery && onQuery({ id: queryId, value: currentText });
    }

    const onInputDelegate = (e) => {
        const currentText = text.current.value;
        setTextLength(currentText.length);
    }

    useEffect(() => {
        if (docCount === 0) {
            setCanSubmitQuery(false);
        }
        else if (loading) {
            setCanSubmitQuery(false);
        }
        else if (querying) {
            setCanSubmitQuery(false);
        }
        else if (textLength === 0) {
            setCanSubmitQuery(false);
        }
        else if (textLength > maxQueryLength) {
            setCanSubmitQuery(false);
        }
        else {
            setCanSubmitQuery(true);
        }
    }, [loading, querying, textLength]);

    return (
        <>
            <div className="grid">
                <div className="col">
                    <div className="flex justify-content-end flex-wrap">
                        <Button className="chat-prompt-advanced-options" link onClick={handleAdvOptShow}>Advanced Options</Button>
                        <IconButton className="sage-icon-superscript" icon="circle-question" title={advOptHelpText} data-test-id="advance-options-link-help" />
                    </div>
                </div>
                <div className="col-1">

                </div>
            </div>
            <div className="grid">
                <div className="col">
                    <div className="chat-prompt-div">
                        <InputTextarea
                            maxLength={maxQueryLength}
                            className="chat-prompt-text-area"
                            placeholder={placeholderText}
                            rows={2}
                            ref={text}
                            onInput={onInputDelegate}
                        />
                        <small className="chat-prompt-text-counter">
                            {textLength} / {maxQueryLength}
                        </small>
                    </div>
                </div>
                <div className="col-1 chat-prompt-run-col">
                    <Button
                        className="chat-prompt-run-button"
                        severity={canSubmitQuery ? "primary" : "secondary"}
                        onClick={onClickDelegate}
                        disabled={!canSubmitQuery}
                        loading={querying}
                        label="Run">
                        
                    </Button>
                </div>
            </div>

            <AdvancedSettingsFlyout shouldShow={showAdvOptModal} onClose={handleAdvOptClose} />
        </>
    );
}