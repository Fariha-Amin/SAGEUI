import './Item.scss';
import './ItemLoading.scss';
import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function ChatHistoryItemLoader() {
    return (
        <div className='sage-chat-history__item item-loading'>
            <div className="sage-chat-history__item-header item-loading__header">

            </div>
            <Accordion activeIndex={0}>
                <AccordionTab>
                    <div className='sage-chat-history__item-body item-loading__body'>
                        <div className='item-loading__loader'>
                            <h2>Loading...</h2>
                            <ProgressSpinner aria-label="Loading" style={{ width: '64px', height: '64px' }} />
                        </div>
                    </div>
                </AccordionTab>
            </Accordion>
        </div>
    );
}