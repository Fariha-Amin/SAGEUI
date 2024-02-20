import './Question.scss';
import React from 'react';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import IconButton from '_shared/icon-button/IconButton';

export default function Question({ model }) {
    return (
        <Card className='sage-chat-history__item-question'>
            <div className="flex overflow-hidden">
                <div className="flex flex-none">
                    <Chip label={`Q${model.id}`} />
                </div>
                <div className="flex flex-grow-1">
                    {model.query.question}
                </div>
                <div className="flex flex-none">
                    {`${model.query.prompt.type} Prompt`}
                    {" "}
                    <a href="#">25 Relevant Docs</a>
                    {" "}
                    <IconButton icon="circle-question" />
                </div>
            </div>
        </Card>
    );
}