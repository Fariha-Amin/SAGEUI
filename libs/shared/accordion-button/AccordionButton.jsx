import React from 'react';
import IconButton from '_shared/icon-button/IconButton';
import { useContext } from 'react';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

export default function ContextAwareToggle({ children, eventKey, callback }) {
    // https://react-bootstrap.github.io/docs/components/accordion#custom-toggle-with-expansion-awareness
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <IconButton icon={isCurrentEventKey ? "chevron-down" : "chevron-up"} onClick={decoratedOnClick} />
    );
}