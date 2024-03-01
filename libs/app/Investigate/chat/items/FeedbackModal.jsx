import './FeedbackModal.scss';
import React from 'react';
import { useState, useRef } from "react";
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import IconButton from '_shared/icon-button/IconButton';
import sageClient from "_investigate/httpClient";




const FeedbackModal = (props) => {
    const [textLength, setTextLength] = useState(0);
    const text = useRef("");
    const helpText = "If you are not satisfied with the response, please let us know. For more optimal results, please be specific when forming your questions. The default investigation prompt is a guide on how to format questions to the LLM.";
    const maxTextLength = 400;
    const placeholderText = `Enter your feedback for this question & answer here.`;
    const textCounter = <small className='feedback-modal__text-counter'>{textLength} / {maxTextLength}</small>
    const maxTextError = <small className='feedback-modal__max-text-error'>You have exceeded the max character limit.</small>
    const headerContent = <div className="flex align-items-center">
                                <b>Report Bad Response</b>
                                <IconButton className="sage-icon-superscript" icon="circle-question" title={helpText} titlePlacement="bottom" />
                        </div>

    var counterContent = textCounter;

    const onInputDelegate = (e) => {
        const currentText = text.current.value;
        setTextLength(currentText.length);
    }

    return(
        <Dialog header={headerContent} visible={props.shouldShow} className='feedback-modal__dialog' onHide={() => props.onClose(false)}>
            <InputTextarea 
                maxLength={maxTextLength}
                className='feedback-modal__text-area'
                placeholder={placeholderText}
                ref={text}
                onInput={onInputDelegate}
                rows={2} 
            />
            <div>
                {textLength === maxTextLength ? maxTextError : textCounter}
            </div>
            <div className='feedback-modal__buttons'>
                <Button label="Save" raised size="small" />
                &nbsp;
                <Button label="Cancel" raised outlined size="small" severity="secondary" onClick={() => props.onClose(false) } />
                
                
            </div>
        </Dialog>
    );
}

export default FeedbackModal;