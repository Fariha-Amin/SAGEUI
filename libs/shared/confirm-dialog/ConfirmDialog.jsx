import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export default function ConfirmDialog({
    visible = false,
    message = "Are you sure you want to proceed?",
    header = "Confirm",
    onAccept,
    acceptLoading,
    onReject,
    rejectLoading,
    onClose }) {

    const onOkClickDelegate = (e) => {
        onAccept && onAccept(e);
    };

    const onCancelClickDelegate = (e) => {
        onReject && onReject(e);
    };

    const onHideDelegate = (e) => {
        onClose && onClose(e);
    };

    const footer = (
        <div>
            <Button label="Cancel" onClick={onCancelClickDelegate} loading={rejectLoading} severity="secondary" outlined/>
            <Button label="Ok" onClick={onOkClickDelegate} loading={acceptLoading} autoFocus />
        </div>
    );

    return (
        <Dialog visible={visible} onHide={onHideDelegate} header={header} footer={footer}>
            <p>{message}</p>
        </Dialog>);
};