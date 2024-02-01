import React from 'react';

export default function LayeredIconButton({ onClick, children, className }) {
    const css = className ? `sage-icon-button ${className}` : "sage-icon-button";
    return (
        <button type="button" className={css} onClick={onClick}>
            <span className="fa-layers fa-fw">
                {children}
            </span>
        </button>
    );
}