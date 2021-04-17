import React, {useState, useEffect} from 'react';
import {Button, Spinner} from "react-bootstrap";
import BasicLayout from "../../layout/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar";
import { withRouter } from "react-router-dom";
import { getUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import {toast} from "react-toastify";
import InfoUser from "../../components/User/InfoUser";
import ListTwees from "../../components/ListTweets/ListTweets";
import { getUserTweetsApi } from "../../api/tweet"

import "./User.scss";

function User(props) {
    console.log("User props: ", props);

    const {match, setRefreshCheckLogin} = props;
    const {params} = match;

    const [user, setUser] = useState(null);
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingTweets, setLoadingTweets] = useState(false);

    const loggedUser = useAuth();

    console.log("Sigo en user: ", user);

    console.log("User auth: ", loggedUser);

    console.log("tweets: ", tweets);

    useEffect(() => {
        getUserApi(params.id)
        .then(response=>{
            setUser(response);
            if(!response) toast.error("El usuario que has visitado no existe");
            console.log("aca leo usuario: ", response);
        }).catch(()=>{
            toast.error("El usuario que has visitado no existe");
        });
    }, [params]);

    useEffect(() => {
        console.log("aca voy a buscar twees");
        getUserTweetsApi(params.id, 1)
            .then(response=>{
                setTweets(response);
            })
            .catch(()=>{
                setTweets([]);
            })
    }, [params]);

    const moreData = ()=>{
        const pageTemp = page +1;
        setLoadingTweets(true);

        getUserTweetsApi(params.id, pageTemp).then(response=>{
            if(!response){
                setLoadingTweets(0);
            }
            else{
                setTweets([...tweets, ...response]); // agrego los nuevos tweets
                setPage(pageTemp);
            }
        });
    }

    return (
        <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="user__title">
                <h2>
                    {user? `${user.nombre} ${user.apellidos}`: "este usario no existe"}</h2>
            </div>
            <BannerAvatar user={user} loggedUser={loggedUser}/>
            <InfoUser user={user}/>
            <div className="user__tweets">
                <h3>Tweets</h3>
                {tweets && <ListTwees tweets={tweets} />}
                <Button onClick={moreData}>
                    {!loadingTweets ? (
                        loadingTweets!==0 && "Obtener mas tweets" 
                    ) : (
                        <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        arian-hidden="true"
                        />
                    )} 
                </Button> 
            </div>
        </BasicLayout>
    )
}

export default withRouter(User);

