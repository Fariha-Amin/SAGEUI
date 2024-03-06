import './Actions.scss';
import React from 'react';
import { useState } from "react";
import Icon from '_shared/icon/Icon';
import IconButton from '_shared/icon-button/IconButton';
import LayeredIconButton from '_shared/layered-icon-button/LayeredIconButton';

export default function Actions({ model, onFavoriteClick, onNoteClick, onFeedbackClick, onDeleteClick }) {
    const [isFavorite, setIsFavorite] = useState(model.isFavorite);
    const [hasNote, setHasNote] = useState(model.hasNote);
    const [isDeleted, setIsDeleted] = useState(model.isDeleted);

    // Favorite
    const favoriteCss = isFavorite ? "item-actions_favorite_active" : "";
    const favoriteIcon = isFavorite ? "fa-solid fa-star" : "fa-regular fa-star";
    const onFavoriteClickDelegate = (e) => {
        setIsFavorite(!isFavorite);
        onFavoriteClick && onFavoriteClick(e);
    }

    // Notes
    const notesCss = hasNote ? "item-actions_notes_active" : "";
    const onNoteClickDelegate = (e) => {
        setHasNote(!hasNote);
        onNoteClick && onNoteClick(e);
    }

    // Bad Response
    const feedbackCss = model.hasFeedback ? "item-actions_feedback_active" : "";
    const onFeedbackClickDelegate = (e) => {
        onFeedbackClick && onFeedbackClick(e);
    }

    // Delete
    const onDeleteClickDelegate = (e) => {
        setIsDeleted(!isDeleted);
        onDeleteClick && onDeleteClick(e);
    }

    return (
        <div className="sage-chat-history__item-actions flex flex-wrap gap-1">

            {/* Favorite */}
            <IconButton icon={favoriteIcon} className={`item-actions_favorite ${favoriteCss}`} title="Favorite" onClick={onFavoriteClickDelegate} />

            {/* Notes */}
            <LayeredIconButton className={`item-actions_notes ${notesCss}`} title="Add notes" onClick={onNoteClickDelegate}>
                <Icon icon="fa-regular fa-file-lines" />
                <Icon icon="circle" transform="shrink-6 down-5 right-5" />
                <Icon icon="plus" transform="shrink-7 down-5 right-5" inverse />
            </LayeredIconButton>

            {/* Bad Response */}
            <IconButton icon="fa-regular fa-comments" className={`item-actions_feedback ${feedbackCss}`} title="Report a bad response" onClick={onFeedbackClickDelegate} />

            {/* Delete */}
            <IconButton icon="fa-regular fa-trash-can" className="item-actions_delete" title="Delete from page" onClick={onDeleteClickDelegate} />

        </div>
    );
}