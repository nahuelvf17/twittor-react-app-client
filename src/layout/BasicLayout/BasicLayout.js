import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import LeftMenu from "../../components/LeftMenu";

export default function BasicLayout(props) {
    console.log("basiclayout: ", props);
    const { className, setRefreshCheckLogin, children} = props;

    console.log("props :", props);
    return (
        <Container className={`basic-layout ${className}`}>
            <Row>
                <Col xs={3} className="basic-layout__menu">
                    <LeftMenu setRefreshCheckLogin={setRefreshCheckLogin}/>
                </Col>
                <Col xs={9} className="basic-layout__content">
                    {children}
                </Col>
            </Row>

        </Container>
    )
}
