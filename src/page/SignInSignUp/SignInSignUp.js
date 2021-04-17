import React, { Fragment, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

import SignUpForm from "../../components/SignUpForm"
import SignInForm from "../../components/SignInForm"
import BasicModal from "../../components/modal/BasicModal";
import LogoTwittor from "../../assets/png/logo.png";
import LogoWhiteTwittor from "../../assets/png/logo-white.png";
import "./SignInSignUp.scss";

export default function SignInSignUp(props) {

  console.log("singingup props:", props);

  const {setRefreshCheckLogin} = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  
  const openModal = content=>{
    setShowModal(true);
    setContentModal(content);
  }
  
  return(
  <Fragment>
      <Container className="signin-signup" fluid>
        <Row>
          <LeftComponent />
          <RigthComponent 
          openModal={openModal} 
          setShowModal={setShowModal}
          setRefreshCheckLogin={setRefreshCheckLogin}/>
        </Row>
      </Container>
      <BasicModal show={showModal} setShow={setShowModal}>
      {contentModal}
      </BasicModal>
    </Fragment>
  );
}

function LeftComponent() {
  return (
    <Col className="signin-signup__left" xs={6}>
      <img src={LogoTwittor} alt="Twittor" />
      <div>
        <h2>
          <FontAwesomeIcon icon={faSearch} />
          Sigue lo que te interesa.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Enterate de que esta hablando la gente.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faComment} />
          Unite a la conversacion.
        </h2>
      </div>
    </Col>
  );
}

function RigthComponent(props ) {
  const {openModal, setShowModal, setRefreshCheckLogin} = props;
  return (
    <Col className="signin-signup__right" xs={6}>
      <div>
        <img src={LogoWhiteTwittor} alt="Twittor" />
        <h2>Mira lo que esta pasando en el mundo en este momento</h2>
        <h3>Unite a Twittor hoy mismo.</h3>
        <Button 
          variant="primary"
          onClick={()=>openModal(<SignUpForm setShowModal={setShowModal}/>)}
          > Registrate </Button>
        <Button 
        variant="outline-primary"
        onClick={()=>openModal(<SignInForm setRefreshCheckLogin={setRefreshCheckLogin}/>)}
        >Iniciar Sesion</Button>
      </div>
    </Col>
  );
}
