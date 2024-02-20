import React from 'react';
import { Button } from 'primereact/button';
import styled from 'styled-components';
import Links from "_shared/links";
import Counter from '_shared/counter/Counter';
import IconButton from '_shared/icon-button/IconButton'

const H3 = styled.h3`
    display: inline-block
`;

const helpText = "This is help text";

const Header = (docCount) => {
    return (
        <>
            <div className="grid">
                <div className="col">
                    <div class="flex flex-wrap justify-content-between">
                        <div class="flex align-items-center">
                            <H3>neXgenAI Investigate</H3>
                            <IconButton className="sage-icon-superscript" icon="circle-question" title={helpText} titlePlacement="bottom" />
                        </div>
                        <div class="flex align-items-center">
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
