import './Note.scss'
import React from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { useState, useEffect } from "react";
import { classNames } from "primereact/utils";

const maxQueryLength = 400;
const placeholderText = `Enter a note.`;
const maxNoteLengthWarning = `You have reached the maximum character limit.`;
const noteSaveText= `Your note has been saved.`;

export default function Note({ onCancel, onSave, note }) {
    const [text, setText] = useState('');
    const [textLength, setTextLength] = useState(0);
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        setText(note);
        setTextLength(note.length);
    },[note]);
    
    const [showNoteSaveMsg, setShowNoteSaveMsg] = useState(false);
    
    const onInputDelegate = (e) =>{
        const newText = e.target.value
        setText(newText); 
        setTextLength(newText.length);
        setIsTouched(true);
    }

    return (
            <div className="grid">
                <div className="col">
                    <div className="note-div">
                        <InputTextarea
                            maxLength={maxQueryLength}
                            className="note-text-area"
                            placeholder={placeholderText}
                            rows={2}
                            value={text}
                            onInput={onInputDelegate}
                        />
                        <div>
                            <span className={classNames(textLength === maxQueryLength ? "note-warning-msg ": "note-text-counter" ) }>
                                {textLength} / {maxQueryLength} {' '} 
                                {(textLength === maxQueryLength) && !showNoteSaveMsg ? <span>{maxNoteLengthWarning}</span>: <></>}
                            </span>
                            <span className="note-save-msg">{showNoteSaveMsg ? noteSaveText : ''}</span>
                            
                        </div>
                    </div>
                </div>
                <div className="col-2 note-btn-col"> 
                    <Button
                        className="note-cancel-button"
                        onClick={onCancel}
                        label="Cancel">
                    </Button>
                    <Button
                        className="note-save-button"
                        severity={!isTouched ? "secondary" : "primary" }
                        onClick= {() => { 
                            onSave(text); 
                            setShowNoteSaveMsg(true); 
                            setTimeout(() => {onCancel() }, 1500)  
                        }} 
                        disabled={ !isTouched}
                        label="Save">
                    </Button>
                </div>
            </div>
    );
}