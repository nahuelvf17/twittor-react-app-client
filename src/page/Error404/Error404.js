import React from 'react';
import {Link} from "react-router-dom";
import "./Error404.scss";
import Error404Image from "../../assets/jpeg/bhuo-404.jpeg";
import Logo from "../../assets/png/logo.png";

export default function Error404() {
    return (
        <div className="error404">
            <img src={Logo} alt="Twittor"/>
            <img src={Error404Image} alt="Error 404"/>
            <Link to="/">Volver al inicio</Link> 
        </div>
    )
}
