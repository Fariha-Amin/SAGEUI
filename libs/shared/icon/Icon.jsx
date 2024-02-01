import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Styling: https://fontawesome.com/v6/docs/web/use-with/react/style

library.add(far, fas);

export default function Icon({ icon, transform, inverse = false }) {
    return (
        <FontAwesomeIcon icon={icon} transform={transform} inverse={inverse} className='sage-icon' />
    );
}