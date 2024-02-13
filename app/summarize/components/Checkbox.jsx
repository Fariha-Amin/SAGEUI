import React from 'react';

const Checkbox = (row) => {
    if (row.isChecked) {
        return (
            <input type='checkbox' checked />
        )
    }
    return (
        <input type='checkbox' />
    );
}

export { Checkbox };