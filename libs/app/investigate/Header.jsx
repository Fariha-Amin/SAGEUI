import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Button, Row, FormLabel } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Links from "../../shared/links";
import Counter from '../../shared/counter/Counter';
import styled from 'styled-components';
import IconButton from '../../shared/icon-button/IconButton'

const Bold = styled.div`
    font-weight:bold;
`;

const helpText = "This is help text";

const Header = (docCount) => {
    return(
    <>
        <Row>
            <Stack direction="horizontal" gap={3}>
                <div>
                    <FormLabel><Bold>neXgenAI Investigate </Bold></FormLabel>
                    <IconButton className="sage-icon-superscript" icon="circle-question" tooltip={helpText} tooltipId="header-title-help" />
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




