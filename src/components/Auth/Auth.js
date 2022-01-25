import React, { useState, useEffect } from "react";
import './Auth.css';
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
    
    const centeredBox = {
        width:"400px",
        height:"300px",
        textAlign:"center",
        margin: "auto",
        borderRadius: "10px",
        boxShadow: "-9px 4px 56px -13px",
        border: "1px solid #e5e7eb",
        boxSizing: "border-box",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }

    const section = {
        height: "100%"
    }
    const description = {
        padding: "10%",

    }
    const loginButton = {
        backgroundColor: "#7DA2A9",
        borderColor: "white",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "10px"
    }

    const title = {
        fontSize:"28px",
        padding: "15px",
        borderBottom:"1px solid #e5e7eb"
    }
    function loginButtonMouseOver(e){
        e.target.style.fontSize = "18px"
    }
    function loginButtonMouseLeave(e){
        e.target.style.fontSize = "16px"
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

    <div style={section}>
        <div style={centeredBox}>
            <div style={title}>
                Login with twitter
            </div>
            <div style={description}>
                Login with twitter and start doing magic.
                Create your own campaign and giveaway NFTs or claim an NFT from a campaign you just created.

            </div>
            <button style={loginButton} onClick={login} onMouseOver={loginButtonMouseOver} onMouseLeave={loginButtonMouseLeave}>
                Authorize with Twitter
            </button>
        </div>
    </div>
    )

}


export default Auth;