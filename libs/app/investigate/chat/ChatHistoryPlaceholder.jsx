import './ChatHistoryPlaceholder.scss';
import React from 'react';
import { Card } from 'primereact/card';

export default function ChatHistoryPlaceholder({ docCount }) {
    let placeholder = (model) => {
        return (
            <div className='sage-chat-history__placeholder'>
                <div className="grid">
                    <div className="col"></div>
                    <div className="col">
                        <Card title={model.title}>
                            <p>
                                {model.body}
                            </p>
                        </Card>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    };

    let model = {
        title: "Your results will appear in this space.",
        body: "You can then investigate into the questions and answers generated from documents in population."
    };
    
    if (!docCount || docCount <= 0) {
        model = {
            title: "There are currently no documents in your Investigate Population.",
            body: `Please add documents using the "Manage Population" button above. Once added, you can ask questions about the documents in your Investigate Population and take action on the responses provided by the Generative AI model.`
        };  
    }

    return placeholder(model);
}