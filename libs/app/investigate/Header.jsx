import React from 'react';
import { Button, Row, FormLabel } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import styled from 'styled-components';
import Links from "_shared/links";
import Counter from '_shared/counter/Counter';
import IconButton from '_shared/icon-button/IconButton'

const H3 = styled.h3`
    display: inline-block
`;

const helpText = "This is help text";

const Header = (docCount) => {
    return(
    <>
        <Row>
            <Stack direction="horizontal" gap={3}>
                <div>
                    <H3>neXgenAI Investigate</H3>
                    <IconButton className="sage-icon-superscript" icon="circle-question" title={helpText} titlePlacement="bottom" />
                </div>
                <div className="ms-auto">
                    <Counter label='Total Documents ' count={docCount.docCount} />
                </div>
                <div>
                    <Button>Manage Document Population</Button>
                </div>
            </Stack>
        </Row>
        <Row>
            <p>
                Enter a question to start your investigation process. For guidance on using the neXgenAI features in Sightline, please refer to the <a href={Links.GenAiFaq}>FAQ</a>.
            </p>
        </Row>
    </>
    )
}

export default Header;
