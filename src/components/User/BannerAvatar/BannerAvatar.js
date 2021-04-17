import React, {useState, useEffect} from 'react';
import {Button} from "react-bootstrap";
import ConfigModal from "../../modal/ConfigModal";
import EditUserForm from "../../User/EditUserForm";
import { checkFollowApi, followUserApi, unFollowUserApi } from "../../../api/follow";

import {API_HOST} from "../../../utils/constant";    
import "./BannerAvatar.scss";
import  AvatarNoFound from "../../../assets/jpeg/avatar-default.jpeg";

export default function BannerAvatar(props) {
    const {user, loggedUser} = props;
    const bannerUrl = user?.banner ? `${API_HOST}/obtenerBanner?id=${user.id}` : null;
    const avatarUrl = user?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : AvatarNoFound;

    const [showModal, setShowModal] = useState(false);
    const [following, setFollowing] = useState(null);
    const [reloadFollow, setReloadFollow] = useState(false);

    console.log("aca banner: ", bannerUrl);
    console.log("aca es avatar: ", avatarUrl);
    console.log("aca logger_id y user", user);
    console.log("aca es logger", loggedUser);

    useEffect(() => {
        if(user){
            checkFollowApi(user?.id).then(response=>{
                if(response?.status){
                    setFollowing(true);
                }else{
                    setFollowing(false);
                }
                console.log("aca es efectBannerAvatar :", response );
            });
        }
        setReloadFollow(false);
    }, [user, reloadFollow]);

    const onFollow = () =>{
        followUserApi(user.id).then(()=>{
            setReloadFollow(true);
            console.log("TODO OK en follow");
        })
    };

    const unFollow = () =>{
        unFollowUserApi(user.id).then(()=>{
            setReloadFollow(true);
        })
    }

    return (
        <div 
        className="banner-avatar" 
        style={{backgroundImage: `url('${bannerUrl}')`}}
        >
            <div 
            className="avatar" 
            style={{backgroundImage: `url('${avatarUrl}')`}}
            />
            {user && (
                <div className="options">
                    {loggedUser._id === user.id && (
            <Button onClick={() => setShowModal(true)}>Editar perfil</Button>
            )}
            {loggedUser._id!==user.id && (
                following!==null && (
                    (following ? (<Button onClick={unFollow} className="unfollow"> <span>Siguiendo</span></Button>) : <button onClick={onFollow}>Seguir</button>)
                    
                )
            )}
            </div>
            )}

            <ConfigModal show={showModal} setShow={setShowModal} title={"Editar Perfil"}>
                <EditUserForm user={user} setShowModal={setShowModal}/>
            </ConfigModal>
        </div>
    );
}
