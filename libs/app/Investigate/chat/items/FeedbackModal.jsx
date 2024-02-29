import './Item.scss';
import React from 'react';
import { useState } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import IconButton from '_shared/icon-button/IconButton';
import Actions from './Actions';
import Answer from './Answer';
import Question from './Question';
import sageClient from "_investigate/httpClient";


const FeedbackModal = (props) => {
    return(
        <Dialog header="Report Bad Response" visible={props.shouldShow} style={{ width: '50vw', height: '50vh' }} onHide={() => props.onClose(false)}>
            <InputTextarea rows={2} style={{ width: '46vw', height: '25vh'}}/>
            <div>
                <Button label="Cancel" raised outlined size="small" severity="secondary" onClick={() => props.onClose(false) } />
                &nbsp;
                <Button label="Save" raised size="small" severity="info" />
            </div>
        </Dialog>
    );
}

export default FeedbackModal;