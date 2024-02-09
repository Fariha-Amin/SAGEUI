import 'bootstrap/dist/css/bootstrap.min.css';
import './Actions.scss';
import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Icon from '../../../../shared/icon/Icon';
import IconButton from '../../../../shared/icon-button/IconButton';
import LayeredIconButton from '../../../../shared/layered-icon-button/LayeredIconButton';

export default function Actions({ model, onFavorite, onSearch, onMagic, onDocument, onComment, onDelete }) {
    return (
        <Stack direction="horizontal" className='sage-chat-history__item-actions'>
            <IconButton icon="fa-regular fa-star" className="item-actions_favorite" onClick={onFavorite} />
            <IconButton icon="magnifying-glass" className="item-actions_search" onClick={onSearch} />
            <IconButton icon="wand-magic-sparkles" className="item-actions_magic" onClick={onMagic} />
            <LayeredIconButton className="item-actions_document" onClick={onDocument}>
                <Icon icon="fa-regular fa-file-lines" />
                <Icon icon="circle" transform="shrink-6 down-5 right-5" />
                <Icon icon="plus" transform="shrink-7 down-5 right-5" inverse />
            </LayeredIconButton>
            <IconButton icon="fa-regular fa-comments" className="item-actions_comment" onClick={onComment} />
            <IconButton icon="fa-regular fa-trash-can" className="item-actions_delete" onClick={onDelete} />
        </Stack>
    );
}