import React from 'react';
import { Tooltip } from 'primereact/tooltip';

export default function LayeredIconButton({ onClick, children, className, title, titlePlacement }) {
    const css = className ? `sage-icon-button ${className}` : "sage-icon-button";

    let button = (
        <button
            type="button"
            className={css}
            onClick={onClick}
            data-pr-tooltip={title}
            data-pr-position={titlePlacement ?? "top"}>
            <span className="fa-layers fa-fw">
                {children}
            </span>
        </button>
    );
    let iconButton = button;

    if (title) {
        iconButton = (
            <>
                <Tooltip target=".sage-icon-button" />
                {button}
            </>
        );
    }

    return iconButton;
}