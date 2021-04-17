import React, {useState} from 'react';
import "./LeftMenu.scss";
import { Button } from "react-bootstrap";
import { Link} from "react-router-dom";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faPowerOff, faUser} from "@fortawesome/free-solid-svg-icons";

import TweetModal from "../modal/TweetModal";
import {logoutApi} from "../../api/auth";
import useAuth from "../../hooks/useAuth";

import LogoWhite from "../../assets/png/logo-white.png";



export default function LeftMenu(props) {
    const {setRefreshCheckLogin} = props;
    const user = useAuth();

    const [showModal, setShowModal] = useState(false);

    
    console.log("aca es leftmenu: ", props);
    const logout = ()=>{
        logoutApi();
        setRefreshCheckLogin(true);
    }

    return (
        <div className="left-menu">
            <img className="logo" src={LogoWhite} alt="Twittor"/>
        <Link to="/"> <FontAwesomeIcon icon={faHome}/>Inicio </Link>
        <Link to="/users">  <FontAwesomeIcon icon={faUsers}/> Usuarios </Link>
        <Link to={`/${user?._id}`}>  <FontAwesomeIcon icon={faUser}/> Perfil </Link>
        <Link to="" onClick={logout}>  <FontAwesomeIcon icon={faPowerOff}/> Cerrar sesion </Link>
        
        <Button onClick={()=>setShowModal(true)}>Twitoar</Button>
        
        <TweetModal show={showModal} setShow={setShowModal}/>
        </div>
    )
}
