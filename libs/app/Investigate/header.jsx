import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Row, FormLabel } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Links from "../../shared/links";
import DocCounter from '../../shared/doc-counter/DocCounter';
import IconButton from '../../shared/icon-button/IconButton';
import styled from 'styled-components';

const Bold = styled.div`
    font-weight:bold;
`;

const Header = () => (
    <>
        <Row>
            <Stack direction="horizontal" gap={3}>
                <div>
                    <FormLabel><Bold>neXgenAI Investigate </Bold></FormLabel>
                    <IconButton cssClass="sage-icon-superscript" icon="circle-question" />
                </div>
                <div className="ms-auto">
                    <DocCounter label='Total Documents ' />
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

export default Header;




