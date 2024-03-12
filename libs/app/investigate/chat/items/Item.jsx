import './Item.scss';
import React from 'react';
import { useState, useRef } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import FeedbackModal from './FeedbackModal';
import IconButton from '_shared/icon-button/IconButton';
import ConfirmDialog from '_shared/confirm-dialog/ConfirmDialog';
import Actions from './Actions';
import Answer from './Answer';
import Question from './Question';
import Note from './Note';
import sageClient from "_investigate/httpClient";
import RelatedDocumentsFlyout from "_investigate/RelatedDocumentsFlyout";
import { Toast } from 'primereact/toast';

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

export default function Item({ model, onQuery, onDeleteClick }) {
    const toast = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemHeaderCss, setItemHeaderCss] = useState(expandedHeaderCss);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showNotes, setShowNotes] = useState(false);  
    const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
    const [flyoutInvestigationId, setFlyoutInvestigationId] = useState(null);
    const [flyoutDocumentId, setFlyoutDocumentId] = useState(null);
    const feedback = model.response.feedback;
  

    model.hasFeedback = (model.response.feedback != "");
    model.hasNote = (model.response.note != "");

    const onQueryItemDelegate = async (e) => {
        onQuery && onQuery({ id: e.id, value: e.value, personalId: e.personalId });
    };

    const onFavoriteClickDelegate = async (e) => {
        model.isFavorite = !model.isFavorite;
        await sageClient.updateInvestigation(model);
    }

    const onNoteClickDelegate = async (e) => {
        setShowNotes(prev => !prev);
        model.hasNote = !model.hasNote;
    }

    const onNoteSaveDelegate = async (e) => {
        model.hasNote = (e != "");
        model.response.note = e;
        await sageClient.updateInvestigation(model);
        
        // Show toast message
        toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Your note has been saved.",
            life: 5000
        });
    }

    const onFeedbackClickDelegate = async (e) => {
        setShowFeedback(true);
    }

    const onFeedbackSaveDelegate = async (e) => {
        setShowFeedback(false);
        model.hasFeedback = (e != "");
        model.response.feedback = e;
        await sageClient.updateInvestigation(model);
    }

    const onDeleteClickDelegate = async (e) => {
        // Show delete confirmation modal
        setIsDeleteModalVisible(true);
    }

    const deleteDialogOptions = {
        visible: isDeleteModalVisible,
        header: "Delete",
        message: "Deleting this Q&A block will remove it from the page, however the results will still be available to view in the Investigation History report.",
        acceptLoading: isDeleting,
        onAccept: async (e) => {
            // Delete
            setIsDeleting(true);
            model.isDeleted = true;
            await sageClient.updateInvestigation(model);
            onDeleteClick && onDeleteClick({ e, investigationId: model.id });
        },
        onReject: () => {
            // Hide modal
            setIsDeleteModalVisible(false);
        },
        onClose: () => {
            // Hide modal
            setIsDeleteModalVisible(false);
        }
    };

    const onRelevantDocsClickedDelegate = (e) => {
        setFlyoutInvestigationId(model.id);
        setIsFlyoutVisible(true);
    }

    const onCloseDelegate = (e) => {
        setIsFlyoutVisible(false);
    }

    const onDocumentClickDelegate = (e) => {
        setFlyoutInvestigationId(model.id);
        setFlyoutDocumentId(e);
        setIsFlyoutVisible(true);
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

    const note = model.response.note;

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
                            <Question model={model} onRelevantDocsClicked={onRelevantDocsClickedDelegate} />
                            <Answer model={model} onQuery={onQueryItemDelegate} onDocumentClick={onDocumentClickDelegate} />
                            {showNotes && <Note 
                                note={note}
                                onCancel={() => setShowNotes(false)}
                                onSave={onNoteSaveDelegate}
                                />}
                            <div className='sage-chat-history__item-timestamp'>
                                {formatDate(model.datetime)}
                            </div>
                        </div>
                        <Toast ref={toast} position="bottom-right" />
                    </AccordionTab>
                </Accordion>
            </div>

            <FeedbackModal feedback={feedback} shouldShow={showFeedback} onClose={setShowFeedback} onSave={onFeedbackSaveDelegate} />
            <ConfirmDialog {...deleteDialogOptions} />
            <RelatedDocumentsFlyout visible={isFlyoutVisible} onClose={onCloseDelegate} investigationId={flyoutInvestigationId} documentId={flyoutDocumentId} />
        </>
    );
}