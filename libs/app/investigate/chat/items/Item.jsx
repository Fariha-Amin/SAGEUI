import './Item.scss';
import React from 'react';
import { useState } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import IconButton from '_shared/icon-button/IconButton';
import ConfirmDialog from '_shared/confirm-dialog/ConfirmDialog';
import Actions from './Actions';
import Answer from './Answer';
import Question from './Question';
import sageClient from "_investigate/httpClient";

const expandedHeaderCss = "item-header_expanded";
const collapsedHeaderCss = "item-header_collapsed";
const deleteMessage = "Deleting this Q&A block will remove it from the page, however the results will still be available to view in the Investigation History report.";

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

export default function Item({ model, onQuery, onDeleteClick }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemHeaderCss, setItemHeaderCss] = useState(expandedHeaderCss);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const onQueryItemDelegate = async (e) => {
        onQuery && onQuery({ id: e.id, value: e.value, personalId: e.personalId });
    };

    const onFavoriteClickDelegate = async (e) => {
        model.isFavorite = !model.isFavorite;
        await sageClient.updateInvestigation(model);
    }

    const onNoteClickDelegate = async (e) => {
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
        // Show delete confirmation modal
        setDeleteModalVisible(true);
    }

    const onAcceptDelegate = async (e) => {
        // Affirmative - Do delete
        setIsDeleting(true);
        model.isDeleted = !model.isDeleted;
        await sageClient.updateInvestigation(model);
        onDeleteClick && onDeleteClick({ e, investigationId: model.id });
        setIsDeleting(false);
    };

    const onRejectDelegate = (e) => {
        // Negative - Do not delete. Hide modal.
        setDeleteModalVisible(false);
    };

    const onCloseDelegate = (e) => {
        // Negative - Do not delete. Hide modal.
        setDeleteModalVisible(false);
    };

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
                            onNoteClick={onNoteClickDelegate}
                            onFeedbackClick={onFeedbackClickDelegate}
                            onDeleteClick={onDeleteClickDelegate}
                        />
                        <IconButton icon={activeIndex === 0 ? "chevron-down" : "chevron-up"} onClick={onAccordionClickDelegate} />
                    </div>
                </div>
                <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <AccordionTab>
                        <div className='sage-chat-history__item-body'>
                            <Question model={model} />
                            <Answer model={model} onQuery={onQueryItemDelegate} />
                            <div className='sage-chat-history__item-timestamp'>
                                {formatDate(model.datetime)}
                            </div>
                        </div>
                    </AccordionTab>
                </Accordion>
            </div>

            <ConfirmDialog
                visible={deleteModalVisible}
                header="Delete"
                message={deleteMessage}
                onAccept={onAcceptDelegate}
                acceptLoading={isDeleting}
                onReject={onRejectDelegate}
                onClose={onCloseDelegate} />
        </>
    );
}