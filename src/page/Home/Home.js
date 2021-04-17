import React, {useState, useEffect} from "react";
import "./Home.scss";
import BasicLayout from "../../layout/BasicLayout/BasicLayout";
import { Button, Spinner } from "react-bootstrap";

import { getTweetsFollowersApi } from "../../api/tweet";
import ListTweets from "../../components/ListTweets";

export default function Home(props) {
  const {setRefreshCheckLogin} = props;
  const [tweets, setTweets] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingTweets, setLoadingTweets] = useState(false);

  useEffect(() => {
    getTweetsFollowersApi(page).then(response=>{
      console.log(response);
      //setTweets(formatModel(response));
      if(!tweets && response){
        setTweets(formatModel(response));
      }else{
        if(!response){
          setLoadingTweets(0);
        }else{
          const data = formatModel(response);
          setTweets([...tweets, ...data]);
          setLoadingTweets(false);
        }
      }
    }).catch(()=>{});
  }, [page]);

  const moreData = () =>{
    console.log("Cargando ..");
    setLoadingTweets(true);
    setPage(page+1);
  }

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="home__title">
        <h2>Inicio</h2>
      </div>
      {tweets && <ListTweets tweets={tweets}/>}
      <Button onClick={moreData} className="load-more">
        {!loadingTweets ? (
          loadingTweets!==0  ? ("Obtener mas tweets") : ("No hay mas tweets")
        ) : (
          <Spinner 
          as="span"
          amnimation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
          />
        )} 
      </Button>
    </BasicLayout>
  );
}

function formatModel(tweets) {
  const tweetsTemp = [];
  const tweet = {
    _id: "",
    userId:"",
    mensaje:"",
    fecha:""
  }

  tweets.forEach(tweet => {
    console.log("aca form each: ", tweet);

    tweetsTemp.push({
      _id: tweet._id,
      userId: tweet.userRelationId,
      mensaje:tweet.Tweet.mensaje,
      fecha: tweet.Tweet.fecha
    })
  });
  console.log("array temp: ", tweetsTemp);
  return tweetsTemp;
}