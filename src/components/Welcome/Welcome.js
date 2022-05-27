import React, { useEffect } from 'react';
import './Welcome.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Navbar/Header';
import { myContext } from '../Context';
import { useContext } from 'react';

export default function Welcome() {
  const userObject = useContext(myContext);
  const navigate = useNavigate();
  if (userObject) {
    return (
      <div className=''>
        <Header
          image={userObject.twitterProvider.photo}
          username={userObject.twitterProvider.username}
        />

        <div className='row welcome-wrapper'>
          <div className='col-md-4 col-lg-4 col-sm-12'></div>
          <div className='col-md-4 col-lg-4 col-sm-12 '>
            <div className='welcomebuttons'>
              <div className='welcome-title'>
                Greetings, {userObject?.username} 👋{' '}
              </div>
              <div className='welcome-desc'></div>
              <button
                className='campaign-button'
                onClick={() => navigate('/createcampaign')}
              >
                Create a campaign
              </button>
              <br></br>
              <button
                className='claim-button'
                onClick={() => navigate('/claim')}
              >
                Claim your nft
              </button>
            </div>
          </div>
          <div className='col-md-4 col-lg-4 col-sm-12 '></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='not-logged-in'>
        You are not logged in correctly. Please head <a href='/auth'> here</a>{' '}
        to login with Twitter and access the app!
      </div>
    );
  }
}
