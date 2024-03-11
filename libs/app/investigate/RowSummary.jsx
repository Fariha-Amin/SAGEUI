import React from 'react';
import { useEffect, useState } from 'react';
import { Skeleton } from 'primereact/skeleton';
import styled from 'styled-components';
import client from './httpClient';

const FullWidthDiv = styled.div`
    width: 100%;
`;

export default function RowSummary({ documentId }) {
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!documentId) { return; }
        setIsLoading(true);

        async function getSummary(documentId) {
            const summary = await client.getSummaryAsync(documentId);
            setSummary(summary);
            setIsLoading(false);
        }
        getSummary(documentId);
    }, [documentId]);

    let renderSummary = () => {
        if (isLoading) {
            return (
                <FullWidthDiv>
                    <Skeleton width="100%" className="mb-2"></Skeleton>
                    <Skeleton width="100%" className="mb-2"></Skeleton>
                    <Skeleton width="100%" className="mb-2"></Skeleton>
                    <Skeleton width="100%" className="mb-2"></Skeleton>
                </FullWidthDiv>);
        }
        else {
            return (<p>{summary}</p>);
        }
    };

    return (
        <>
            {renderSummary()}
        </>
    );
};