import React from 'react';
import { Button } from 'primereact/button';
import styled from 'styled-components';
import Links from "_shared/links";
import Counter from '_shared/counter/Counter';
import IconButton from '_shared/icon-button/IconButton'

const H2 = styled.h2`
    display: inline-block;
    margin: 0px;
`;

const helpText = "This is help text";

const Header = (docCount) => {
    return (
        <>
            <div className="grid">
                <div className="col">
                    <div className="flex flex-wrap justify-content-between">
                        <div className="flex align-items-center">
                            <H2>neXgenAI Investigate</H2>
                            <IconButton className="sage-icon-superscript" icon="circle-question" title={helpText} titlePlacement="bottom" />
                        </div>
                        <div className="flex align-items-center">
                            <Counter label='Total Documents ' count={docCount.docCount} />
                            &nbsp;
                            &nbsp;
                            <Button label="Manage Document Population" severity="info" size="small" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid">
                <div className="col">
                    <span>
                        Enter a question to start your investigation process. For guidance on using the neXgenAI features in Sightline, please refer to the <a href={Links.GenAiFaq}>FAQ</a>.
                    </span>
                </div>
            </div>
        </>
    )
}

export default Header;
