import React from 'react'
import { Col, Navbar, Button, Row, FormLabel } from 'react-bootstrap';
import DocCounter from '../../libs/shared/DocCounter/docCounter';
import IconButton from '../../libs/shared/icon-button/IconButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const Bold = styled.div`
    font-weight:bold;
`;

const Header = () => (
    <Navbar>
        <Col>
            <Col>
                <FormLabel><Bold>neXgenAI Investigate </Bold></FormLabel>
                <IconButton icon="circle-question" />
            </Col>
        </Col>
        <Col>
            <Row>
                <Col>
                    <DocCounter label='Total Documents: '/>
                </Col>
                <Col>
                    <Button>Manage Document Population</Button>
                </Col>
            </Row>
        </Col>
    </Navbar>
)

export default Header;




