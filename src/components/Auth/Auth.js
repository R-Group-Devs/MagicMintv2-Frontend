import React, { useState, useEffect, useContext } from 'react';
import { myContext } from '../Context';
import './Auth.css';
import '../../fonts.css';
import twitterLogo from '../../assets/images/Twitter.png';
import axios from 'axios';
import queryString from 'query-string';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const {user} = useContext(myContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [status, setStatus] = useState();
  const [url, setUrl] = useState();

  function loginButtonMouseOver(e) {
    e.target.style.fontSize = '22px';
  }
  function loginButtonMouseLeave(e) {
    e.target.style.fontSize = '20px';
  }
  const login = () => {
    window.location.href = process.env.REACT_APP_AUTH_TWITTER;
  };
  
  useEffect(() => {
    if(user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div>
      <div className='centeredBox'>
        <div className='title'>MagicMint</div>
        <div className='description'>
          Login with twitter and start doing magic. Create your own campaign and
          giveaway NFTs or claim an NFT from a campaign you just retweeted.
        </div>
        <button
          className='loginButton'
          onClick={login}
          onMouseOver={loginButtonMouseOver}
          onMouseLeave={loginButtonMouseLeave}
        >
          <img className='image' src={twitterLogo} />
          Authorize with Twitter
        </button>
      </div>
    </div>
  );
}

export default Auth;
