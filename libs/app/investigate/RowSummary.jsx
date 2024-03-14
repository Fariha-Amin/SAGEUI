import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import styled from 'styled-components';

const FullWidthDiv = styled.div`
    width: 100%;
`;

export default function RowSummary({ summary, loading }) {
    let renderSummary = () => {
        if (loading) {
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