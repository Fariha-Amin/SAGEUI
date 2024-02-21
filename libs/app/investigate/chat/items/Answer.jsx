import './Answer.scss';
import React from 'react';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Skeleton } from 'primereact/skeleton';
import styled from 'styled-components';
import parse from 'html-react-parser';

const FullWidthDiv = styled.div`
    width: 100%;
`;

export default function Answer({ model }) {
    let renderAnswer = () => {
        if (model.response.isInProgress) {
            return (
                <FullWidthDiv>
                    <Skeleton width="100%" className="mb-2"></Skeleton>
                    <Skeleton width="50%" className="mb-2"></Skeleton>
                    <Skeleton width="75%" className="mb-2"></Skeleton>
                    <Skeleton width="25%" className="mb-2"></Skeleton>
                </FullWidthDiv>);
        }
        else if (!model.response.result.isSuccess) {
            return model.response.result.failureReason;
        }
        else {
            // Format the output to include links
            let answer = model.response.answer;
            for (let docId of model.response.documentIds) {
                answer = answer.replaceAll(docId, `<a href="#">${docId}</a>`);
            }
            return parse(`<span>${answer}</span>`);
        }
    };

    return (
        <Card className='sage-chat-history__item-answer'>
            <div className="flex align-content-center gap-2">
                <div className="flex flex-none align-items-start">
                    <Chip label={`A${model.id}`} />
                </div>
                <div className="flex flex-grow-1 align-items-center">
                    {renderAnswer()}
                </div>
            </div>
        </Card>
    );
}