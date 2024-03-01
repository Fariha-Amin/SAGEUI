import './Item.scss';
import React from 'react';
import { useState } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import IconButton from '_shared/icon-button/IconButton';
import Actions from './Actions';
import Answer from './Answer';
import Question from './Question';
import sageClient from "_investigate/httpClient";
import RelatedDocumentsFlyout from "_investigate/RelatedDocumentsFlyout";

const expandedHeaderCss = "item-header_expanded";
const collapsedHeaderCss = "item-header_collapsed";

function formatDate(datetime) {
    const d = new Date(datetime);
    const locale = "en-us";

    // Produces the format: 12 February 2024
    const dOptions = { month: 'long' };
    const month = d.toLocaleDateString(locale, dOptions);
    const date = `${d.getDate()} ${month} ${d.getFullYear()}`;

    // Produces the format: 09:54 AM
    const tOptions = { hour: "2-digit", minute: "2-digit" };
    const time = d.toLocaleTimeString(locale, tOptions)

    return `${date} - ${time}`;
}


export default function Item({ model, onQuery }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemHeaderCss, setItemHeaderCss] = useState(expandedHeaderCss);
    const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
    const onQueryItemDelegate = async (e) => {
        onQuery && onQuery({ id: e.id, value: e.value, personalId: e.personalId });
    };

    const onFavoriteClickDelegate = async (e) => {
        model.isFavorite = !model.isFavorite;
        await sageClient.updateInvestigation(model);
    }

    const onNoteClickkDelegate = async (e) => {
        // Show note UI
        // To do
        model.hasNote = !model.hasNote;
        await sageClient.updateInvestigation(model);
    }

    const onFeedbackClickDelegate = async (e) => {
        // Show feedback UI
        // To do
        model.hasFeedback = !model.hasFeedback;
        await sageClient.updateInvestigation(model);
    }

    const onDeleteClickDelegate = async (e) => {
        model.isDeleted = !model.isDeleted;
        await sageClient.updateInvestigation(model);
    }

    const onRelevantDocsClickedDelegate = (e) => {
        setIsFlyoutVisible(true);
    }

    const onCloseDelegate = (e) => {
        setIsFlyoutVisible(false);
    }

    const onAccordionClickDelegate = async (e) => {
        if (activeIndex === 0) {
            setItemHeaderCss(collapsedHeaderCss);
            setActiveIndex(1);
        }
        else {
            setItemHeaderCss(expandedHeaderCss);
            setActiveIndex(0);
        }
    }

    return (
        <>
            <div className='sage-chat-history__item' data-id={model.id}>
                <div className={`sage-chat-history__item-header ${itemHeaderCss}`}>
                    <div className="flex flex-wrap align-items-center justify-content-end gap-1">
                        <Actions
                            model={model}
                            onFavoriteClick={onFavoriteClickDelegate}
                            onNoteClick={onNoteClickkDelegate}
                            onFeedbackClick={onFeedbackClickDelegate}
                            onDeleteClick={onDeleteClickDelegate}
                        />
                        <IconButton icon={activeIndex === 0 ? "chevron-down" : "chevron-up"} onClick={onAccordionClickDelegate} />
                    </div>
                </div>
                <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <AccordionTab>
                        <div className='sage-chat-history__item-body'>
                            <Question model={model} onRelevantDocsClicked={onRelevantDocsClickedDelegate} />
                            <Answer model={model} onQuery={onQueryItemDelegate} />
                            <div className='sage-chat-history__item-timestamp'>
                                {formatDate(model.datetime)}
                            </div>
                        </div>
                    </AccordionTab>
                </Accordion>
            </div>

            <RelatedDocumentsFlyout visible={isFlyoutVisible} onClose={onCloseDelegate} />
        </>
    );
}