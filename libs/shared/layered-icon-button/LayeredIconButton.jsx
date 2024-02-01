import React from 'react';

export default function LayeredIconButton({ onClick, children }) {
    return (
        <button type="button" className='sage-icon-button' onClick={onClick}>
            <span className="fa-layers fa-fw">
                {children}
            </span>
        </button>
    );
}