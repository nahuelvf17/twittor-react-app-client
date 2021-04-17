import React from 'react';
import {Modal, ModalTitle} from "react-bootstrap";
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { Close } from "../../../utils/Icons";
import "./ConfigModal.scss";

export default function ConfigModal(props) {
    const {show, setShow, title, children} = props;

    return (
        <Modal 
        className="config-modal" 
        show={show} 
        onHide={()=>setShow(false)}
        centered
        size="lg"
        >
            <ModalHeader>
                <ModalTitle>
                    <Close onClick={()=>setShow(false)} />
                    <h2>{title}</h2>
                </ModalTitle>
            </ModalHeader>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}
