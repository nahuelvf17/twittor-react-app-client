import React, {useState} from 'react';
import { Modal, Form, Button, ModalTitle, FormControl} from "react-bootstrap";
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import {toast} from "react-toastify";

import classNames from "classnames";
import {Close} from "../../../utils/Icons";
import {addTweetApi} from "../../../api/tweet";

import "./TweetModal.scss";
import { MaxLength } from 'buffer';

export default function TweetModal(props) {
    const { show, setShow } = props;    

    const [message, setMessage] = useState("");

    const maxLength = 280;

    const onSubmit = e=> {
        e.preventDefault();

        if(message.length>0 && message.length<=maxLength){
            addTweetApi(message)
            .then(response=>{
              if(response?.code>=200 && response?.code<300){
                    toast.success(response.message);
                    setShow(false);
                  window.location.reload();
              }  
            })
            .catch(()=>{
                toast.error("Error al enviar el Tweet, intentlo mas tarde");
            })
        }
        console.log("enviando tweet: ", message);
    }
    return (
        <Modal
        className="tweet-modal"
        show={show}
        onHide={()=>setShow(false)}
        centered
        size="lg"
        >
            <ModalHeader>
                <ModalTitle>
                    <Close onClick={()=>setShow(false)}/>
                </ModalTitle>
            </ModalHeader>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <FormControl 
                    as="textarea"
                    rows="10"
                    placeholder="Que esta pasando?"
                    onChange={e=>setMessage(e.target.value)}
                    />
                    <span className={classNames("count", {error: message.length > maxLength})}>
                        {message.length}
                        </span>
                    <Button 
                    type="submit"
                    disabled={message.length>maxLength || message.length<1}
                    >Twittoar</Button>
                </Form>
            </Modal.Body>
        </Modal>

    )
}
