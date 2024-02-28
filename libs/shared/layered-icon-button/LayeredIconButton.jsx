import React from 'react';
import { Tooltip } from 'primereact/tooltip';

export default function LayeredIconButton({ onClick, children, className, title, titlePlacement }) {
    const css = className ? `sage-icon-button ${className}` : "sage-icon-button";

    const randomTime = Date.now();
    const randomNumber = Math.floor(Math.random() * 100);
    const tooltipId = `${randomTime}_${randomNumber}`;

    let button = (
        <button
            type="button"
            data-tooltip-id={tooltipId}
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
                <Tooltip target={`[data-tooltip-id="${tooltipId}"]`} />
                {button}
            </>
        );
    }

    return iconButton;
}