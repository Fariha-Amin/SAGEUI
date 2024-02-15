import 'bootstrap/dist/css/bootstrap.min.css';
import './Actions.scss';
import React from 'react';
import { useState } from "react";
import Stack from 'react-bootstrap/Stack';
import Icon from '_shared/icon/Icon';
import IconButton from '_shared/icon-button/IconButton';
import LayeredIconButton from '_shared/layered-icon-button/LayeredIconButton';

export default function Actions({ model, onFavoriteClick, onNoteClick, onReportIssueClick, onDeleteClick }) {
    const [isFavorite, setIsFavorite] = useState(model.isFavorite);

    const favoriteCss = isFavorite ? "item-actions_favorite_active" : "";
    const favoriteIcon = isFavorite ? "fa-solid fa-star" : "fa-regular fa-star";

    const onFavoriteClickDelegate = async (e) => {
        setIsFavorite(!isFavorite);
        onFavoriteClick && onFavoriteClick(e);
    }

    return (
        <Stack direction="horizontal" className='sage-chat-history__item-actions'>

            {/* Favorite */}
            <IconButton icon={favoriteIcon} className={`item-actions_favorite ${favoriteCss}`} title="Favorite" onClick={onFavoriteClickDelegate} />

            {/* Notes */}
            <LayeredIconButton className="item-actions_document" onClick={onNoteClick}>
                <Icon icon="fa-regular fa-file-lines" />
                <Icon icon="circle" transform="shrink-6 down-5 right-5" />
                <Icon icon="plus" transform="shrink-7 down-5 right-5" inverse />
            </LayeredIconButton>

            {/* Bad Response */}
            <IconButton icon="fa-regular fa-comments" className="item-actions_comment" onClick={onReportIssueClick} />

            {/* Delete */}
            <IconButton icon="fa-regular fa-trash-can" className="item-actions_delete" onClick={onDeleteClick} />

        </Stack>
    );
}