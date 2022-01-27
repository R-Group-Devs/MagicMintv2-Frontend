import React, { useState, useEffect } from "react";
import './Auth.css';
import '../../fonts.css';
import twitterLogo from '../../assets/images/Twitter.png'
import axios from 'axios';
import queryString from 'query-string';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const apiPath = "https://localhost:3000/api/twitter"

function Auth(){


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [status, setStatus] = useState();
    const [url, setUrl] = useState();
    

    function loginButtonMouseOver(e){
        e.target.style.fontSize = "24px"
    }
    function loginButtonMouseLeave(e){
        e.target.style.fontSize = "22px"
    }

    async function login () {

      console.log("clicked");
      const response = await axios({
        url: 'http://localhost:3000/api/twitter/oauth/request_token', 
        method: 'POST'
      });
      
      const { oauth_token } = response.data;
        (async () => {
          
          try {
            //OAuth Step 1

            //Oauth Step 2
            window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
          } catch (error) {
            console.error(error); 
          }
          
        })();
      }
    // const logout = () => {
    //    ( async() => {
    //         try {

    //         } catch{

    //         }
    //     })();
    // }
    // const login = () => {
    //     (async () => {
          
    //       try {
    //         //OAuth Step 1
    //         const response = await axios({
    //           url: `${apiPath}/twitter/oauth/request_token`, 
    //           method: 'POST'
    //         });
            
    //         const { oauth_token } = response.data;
    //         //Oauth Step 2
    //         window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
    //       } catch (error) {
    //         console.error(error); 
    //       }
          
    //     })();
    //   }
      
      const logout = () => {
        (async () => {
          try {
            await axios({
              url: `${apiPath}/twitter/logout`, 
              method: 'POST'
            });
            setIsLoggedIn(false);
          } catch (error) {
            console.error(error); 
          }
        })();
      }
      
      useEffect(() => {
        (async() => {
          
            const {oauth_token, oauth_verifier} = queryString.parse(window.location.search);  
            
            if (oauth_token && oauth_verifier) {
             try {
                //Oauth Step 3
                await axios({
                  url: `${apiPath}/twitter/oauth/access_token`,  
                  method: 'POST',
                  data: {oauth_token, oauth_verifier}
                });
             } catch (error) {
              console.error(error); 
             }
            }
            
            try {
                
              //Authenticated Resource Access
              const {data: {name, profile_image_url_https, status, entities}} = await axios({
                url: `${apiPath}/twitter/users/profile_banner`,
                method: 'GET'
              });
              
              setIsLoggedIn(true);
              setName(name);
              setImageUrl(profile_image_url_https);
              setStatus(status.text);
              setUrl(entities.url.urls[0].expanded_url);
             } catch (error) {
              console.error(error); 
             }
            
          
        })();
      }, []);

    return(

    <div>
        <div className="centeredBox">
            <div className="title">
                ✨ MagicMint ✨ 
            </div>
            <div className="description">
                Login with twitter and start doing magic.
                Create your own campaign and giveaway NFTs or claim an NFT from a campaign you just retweeted.

            </div>
            <button className="loginButton" onClick={login} onMouseOver={loginButtonMouseOver} onMouseLeave={loginButtonMouseLeave}>
                <img className="image" src={twitterLogo}/>Authorize with Twitter
            </button>
        </div>
    </div>
    )

}


export default Auth;