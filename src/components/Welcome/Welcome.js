import React, { useEffect } from 'react';
import './Welcome.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Navbar/Header';
import { myContext } from '../Context';
import { useContext } from 'react';

export default function Welcome() {
  const {user} = useContext(myContext);
  const navigate = useNavigate();

    return (
      <div className=''>
        <Header
          image={user.twitterProvider.photo}
          username={user.twitterProvider.username}
        />

        <div className='row welcome-wrapper'>
          <div className='col-md-4 col-lg-4 col-sm-12'></div>
          <div className='col-md-4 col-lg-4 col-sm-12 '>
            <div className='welcomebuttons'>
              <div className='welcome-title'>
                Greetings, {user.twitterProvider.username} 👋{' '}
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
}
