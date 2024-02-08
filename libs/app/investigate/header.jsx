import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Button, Row, FormLabel } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import { useSelector, useDispatch } from 'react-redux'
import { setCount } from "./Reducers/docCounterSlice";
import Links from "../../shared/links";
import Counter from '../../shared/counter/Counter';
import IconButton from '../../shared/icon-button/IconButton';
import styled from 'styled-components';
import client from './httpClient'


const Bold = styled.div`
    font-weight:bold;
`;

const Header = () => {
    useEffect(() => {
        client.getDocumentCountAsync().then(data => dispatch(setCount(data)));
    }, [])
    const docCount = useSelector((state) => state.docCounter.value);
    const dispatch = useDispatch();

    return(
    <>
        <Row>
            <Stack direction="horizontal" gap={3}>
                <div>
                    <FormLabel><Bold>neXgenAI Investigate </Bold></FormLabel>
                    <IconButton className="sage-icon-superscript" icon="circle-question" />
                </div>
                <div className="ms-auto">
                    <Counter label='Total Documents ' count={docCount} />
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




