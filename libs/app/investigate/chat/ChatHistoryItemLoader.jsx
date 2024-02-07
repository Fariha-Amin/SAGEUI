import './ChatHistoryItem.scss';
import './ChatHistoryItemLoader.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

export default function ChatHistoryItemLoader() {
    return (
        <Card className='sage-chat-history__item'>
            <Card.Header className='sage-chat-history__item-header'>

            </Card.Header>
            <Card.Body className='sage-chat-history__item-body'>
                <div className='sage-chat-history__item-loader'>
                    <h2>Loading...</h2>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </Card.Body>
        </Card>
    );
}