import './Question.scss';
import React from 'react';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Button } from 'primereact/button';
import IconButton from '_shared/icon-button/IconButton';

export default function Question({ model, onRelevantDocsClicked }) {
    
    return (
        <Card className='sage-chat-history__item-question'>
            <div className="flex align-content-center gap-2">
                <div className="flex flex-none align-items-start">
                    <Chip label={`Q${model.id}`} />
                </div>
                <div className="flex flex-grow-1 align-items-center">
                    {model.query.question}
                </div>
                <div className="flex flex-none align-items-start">
                    {`${model.query.prompt.type} Prompt`}
                </div>
                <div className="flex flex-none align-items-start">
                    <Button label="25 Relevant Docs" link onClick={() => onRelevantDocsClicked && onRelevantDocsClicked()} />
                    &nbsp;
                    <IconButton icon="circle-question" className="sage-icon-superscript" />
                </div>
            </div>
        </Card>
    );
}