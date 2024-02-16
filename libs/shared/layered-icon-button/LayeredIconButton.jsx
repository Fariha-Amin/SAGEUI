import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function LayeredIconButton({ onClick, children, className, title, titlePlacement }) {
    const css = className ? `sage-icon-button ${className}` : "sage-icon-button";

    let button = (
        <button type="button" className={css} onClick={onClick}>
            <span className="fa-layers fa-fw">
                {children}
            </span>
        </button>
    );

    if (title) {
        button = (
            <OverlayTrigger placement={titlePlacement ?? "top"} overlay={<Tooltip>{title}</Tooltip>}>
                {button}
            </OverlayTrigger>
        );
    }

    return (
        button
    );
}