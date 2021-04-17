import React, { useState, useEffect, Component, Fragment } from 'react';
import BasicLayout from "../../layout/BasicLayout";
import {Spinner, ButtonGroup, Button} from "react-bootstrap";
import {withRouter} from "react-router-dom";

import queryString from "query-string";
import ListUsers from "../../components/ListUsers";
import { getFollowsApi } from "../../api/follow";
import {isEmpty} from "lodash";
import {useDebouncedCallback} from "use-debounce";

import "./Users.scss";

function Users(props) {
    console.log("aca es Users props: ", props);

    const {setRefreshCheckLogin, location, history} = props;
    
    const [users, setUsers] = useState(null);

    const params = useUsersQuery(location);

    const [typeUser, setTypeUser] = useState(params.type || "follow");
    
    const [btnLoading, setBtnLoading] = useState(false);

    const onSearch = useDebouncedCallback((value) => {
        setUsers(null);
        history.push({
          search: queryString.stringify({ ...params, search: value, page: 1 }),
        });
      }, 200);

    useEffect(() => {
        getFollowsApi(queryString.stringify(params))
            .then(response=>{
                console.log("aca es getFollowsApi respons: ", response);
                
                if(params.page == 1){
                    if(isEmpty(response)){
                        setUsers([]);
                    }else{
                        setUsers(response);
                    }
                }else{
                    if(!response){
                        setBtnLoading(0);
                    }else{
                        setUsers([...users, ...response]);
                        setBtnLoading(false);
                    }
                }
            })
            .catch(()=>{
                setUsers([]);
            })
    }, [location]);

    const onChangeType = (type)=>{
        setUsers(null);

        if(type==="new"){
            setTypeUser("new");
        }
        else{
            setTypeUser("follow");
        }

        history.push({
            search: queryString.stringify({tipo: type, page:1, search:""})
        });
    }

    const moreData = ()=>{
        setBtnLoading(true);
        const newPage = parseInt(params.page) +1;
        console.log("ac aes pagina: ", newPage);
        history.push({
            search:queryString.stringify({...params, page : newPage})
        });
    }

    return (
        <BasicLayout className="users" title="Usuarios" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="users__title">
                <h2>Usuarios</h2>
                <input 
                    type="text" 
                    placeholder="Busca a un usuario"
                    onChange={(e)=>onSearch(e.target.value)}
                />
            </div>
            <ButtonGroup className="users__options">
                <Button 
                    className={typeUser==="follow" && "active"}
                    onClick={()=>onChangeType("follow")}
                >
                    Siguiendo
                </Button>
                <Button 
                    className={typeUser==="new" && "active"}
                    onClick={()=>onChangeType("new")}
                    >Nuevos
                </Button>


            </ButtonGroup>
            {!users?(
                <div className="users__loading">
                    <Spinner animation="border" variant="info" />
                    Buscando Usuarios
                </div>

            ) : (
            <Fragment>
                <ListUsers users={users}/>

                <Button onClick={moreData} className="load-more">
                {!btnLoading ? (
                    btnLoading!==0 && "Cargar mas usuarios" 
                ) : (
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                )}
                </Button>
            </Fragment>
            )}
        </BasicLayout>
    )
}

function useUsersQuery(location) {
    const {page=1, tipo="follow", search} = queryString.parse(location.search);

    return {page, tipo, search};
}

export default withRouter(Users);
