import './FeedbackModal.scss';
import React from 'react';
import { useState, useEffect, useRef } from "react";
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import IconButton from '_shared/icon-button/IconButton';

const FeedbackModal = (props) => {
    const [text, setText] = useState('');
    const [textLength, setTextLength] = useState(0);

    useEffect(() => {
        var initialText = props.feedback;
        setText(initialText);
        setTextLength(initialText.length);
    },[props.feedback]);

    const helpText = "If you are not satisfied with the response, please let us know. For more optimal results, please be specific when forming your questions. The default investigation prompt is a guide on how to format questions to the LLM.";
    const maxTextLength = 400;
    const placeholderText = `Enter your feedback for this question & answer here.`;
    const textCounter = <small className='feedback-modal__text-counter'>{textLength} / {maxTextLength}</small>
    const maxTextError = <small className='feedback-modal__text-counter feedback-modal__max-text-error'>You have exceeded the max character limit.</small>
    const headerContent = <div className="flex align-items-center feedback-modal__header">
                                <b>Report Bad Response</b>
                                <IconButton className="sage-icon-superscript" icon="circle-question" title={helpText} titlePlacement="bottom" />
                        </div>

    
    const onInputDelegate = (e) =>{
        const newText = e.target.value
        setText(newText); 
        setTextLength(newText.length);
    }


    return(
        <Dialog header={headerContent} visible={props.shouldShow} className='feedback-modal__dialog' onHide={() => props.onClose(false)}>
            <InputTextarea 
                maxLength={maxTextLength}
                className='feedback-modal__text-area'
                placeholder={placeholderText}
                onChange={(e) => onInputDelegate(e)}
                rows={2} 
                value={text}
            />
            <div>
                {textLength === maxTextLength ? maxTextError : textCounter}
            </div>
            <div className='feedback-modal__buttons'>
                <Button className='feedback-modal__save' label="Save" raised size="small" onClick={() => props.onSave(text) } disabled={textLength > 0 ? false : true} />
                &nbsp;
                <Button className='feedback-modal__cancel' label="Cancel" raised outlined size="small" severity="secondary" onClick={() => props.onClose(false) } />
            </div>
        </Dialog>
    );
}

export default FeedbackModal;