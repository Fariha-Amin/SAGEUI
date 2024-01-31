import React from 'react';
import { Col, Navbar, Button, Row, FormLabel } from 'react-bootstrap';
import Links from "../../shared/links";
import DocCounter from '../../shared/doc-counter/DocCounter';
import IconButton from '../../shared/icon-button/IconButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const Bold = styled.div`
    font-weight:bold;
`;

const Header = () => (
    <>
        <Row>
            <Col>
                <Col>
                    <FormLabel><Bold>neXgenAI Investigate </Bold></FormLabel>
                    <IconButton icon="circle-question" />
                </Col>
            </Col>
            <Col>
                <Row>
                    <Col>
                        <DocCounter label='Total Documents ' />
                    </Col>
                    <Col>
                        <Button>Manage Document Population</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <p>
                Enter a question to start your investigation process. For guidance on using the neXgenAI features in Sightline, please refer to the <a href={Links.GenAiFaq}>FAQ</a>.
            </p>
        </Row>
    </>
)

export default Header;




