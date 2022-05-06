import React, { useState, useEffect } from "react";
import "./Auth.css";
import "../../fonts.css";
import twitterLogo from "../../assets/images/Twitter.png";
import axios from "axios";
import queryString from "query-string";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const apiPath = "https://localhost:3000/api/twitter";

function Auth() {
  console.log(process.env.REACT_APP_AUTH_TWITTER);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [status, setStatus] = useState();
  const [url, setUrl] = useState();

  function loginButtonMouseOver(e) {
    e.target.style.fontSize = "22px";
    console.log(process.env);
  }
  function loginButtonMouseLeave(e) {
    e.target.style.fontSize = "20px";
  }
  const login = () => {
    window.location.href = process.env.REACT_APP_AUTH_TWITTER;

    //   axios.get(process.env.REACT_APP_AUTH_TWITTER, {withCredentials:true})  i
  };
  const logout = () => {
    window.location.href = process.env.REACT_APP_LOGOUT;
  };
  const callback = () => {
    window.location.href = process.REACT_APP_CALLBACK_TWITTER;
  };

  return (
    <div className=" wrapped">
      <div className="centeredBox">
        <div className="title">Welcome to MagicMint</div>
        <div className="description">
          Create your own campaign or claim an NFT.
        </div>
        <button
          className="loginButton"
          onClick={login}
          onMouseOver={loginButtonMouseOver}
          onMouseLeave={loginButtonMouseLeave}
        >
          <img className="image" src={twitterLogo} />
          Authorize with Twitter
        </button>
      </div>
    </div>
  );
}

export default Auth;
