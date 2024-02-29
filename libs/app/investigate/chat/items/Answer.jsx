import './Answer.scss';
import React from 'react';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Skeleton } from 'primereact/skeleton';
import styled from 'styled-components';
import parse from 'html-react-parser';
import sageClient from "_investigate/httpClient";

const FullWidthDiv = styled.div`
    width: 100%;
`;

export default function Answer({ model, onQuery }) {
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
            for(let personName of model.response.personNames)
            {
                answer = answer.replaceAll(personName, `<button> ${personName}</button>`);
            }
            return parse(`<span>${answer}</span>`, {
                replace: (domNode) => 
                   {
                        if (domNode.name === "button") 
                            {
                                return <button className="personName" onClick={onClickAnswerDelegate} value={domNode.children[0].data} >{domNode.children[0].data}</button>;
                            }
                   }
                });
        }
    };
   
    const onClickAnswerDelegate = async (e) => {
        const currentText = `Provide a summary of ${e.target.value}.`;
        let queryId = await sageClient.poseQuestionAsync(currentText, "Individual");
        onQuery && onQuery({ id: queryId, value: currentText, personalId: e.target.value });
    }

    return (
        <Card className='sage-chat-history__item-answer'>
            <div className="flex align-content-center gap-2">
                <div className="flex flex-none align-items-start item-answer__chip">
                    <Chip label={`A${model.id}`} />
                </div>
                <div className="flex flex-grow-1 align-items-center item-answer__answer">
                    {renderAnswer()}
                </div>
            </div>
        </Card>
    );
}