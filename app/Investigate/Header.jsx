import React from 'react'
import { Col, Navbar, FormLabel, Button, Form, Row } from 'react-bootstrap';
import DocCounter from '../../libs/shared/DocCounter/docCounter';
import IconButton from '../../libs/shared/icon-button/IconButton';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => (
    <Navbar>
        <Col>
            <Col>
                <FormLabel>neXgenAI Investigate </FormLabel>
                <IconButton icon="circle-question" />
            </Col>
        </Col>
        <Col>
            <Row>
                <Col>
                    <DocCounter label='Documents: ' count='250000'/>
                </Col>
                <Col>
                    <Button>Manage Document Population</Button>
                </Col>
            </Row>
        </Col>
    </Navbar>
)

export default Header;




