import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export default function ConfirmDialog({
    message = "Are you sure you want to proceed?",
    header = "Confirm",
    onAccept,
    acceptLoading,
    acceptButtonLabel = "Ok",
    onReject,
    rejectLoading,
    rejectButtonLabel = "Cancel",
    visible = false,
    onOpen,
    onClose }) {

    const onOkClickDelegate = (e) => {
        onAccept && onAccept(e);
    };

    const onCancelClickDelegate = (e) => {
        onReject && onReject(e);
        console.log("onCancel fired");
    };

    const onHideDelegate = () => {
        onClose && onClose();
    };

    const onShowDelegate = () => {
        onOpen && onOpen();
    };

    const footer = (
        <div className="sage-dialog__footer">
            <Button label={rejectButtonLabel} onClick={onCancelClickDelegate} loading={rejectLoading} severity="secondary" outlined />
            <Button label={acceptButtonLabel} onClick={onOkClickDelegate} loading={acceptLoading} />
        </div>
    );

    return (
        <Dialog
            visible={visible}
            onHide={onHideDelegate}
            onShow={onShowDelegate}
            header={header}
            footer={footer}
            draggable={false}
            className="sage-dialog"
            contentClassName="sage-dialog__content"
            headerClassName="sage-dialog__header">
            <p>{message}</p>
        </Dialog>);
};