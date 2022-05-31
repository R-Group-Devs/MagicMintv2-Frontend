import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import ClaimableNFT from '../partials/ClaimableNFT/ClaimableNFT';
import ClaimedNFT from '../partials/ClaimedNFT/ClaimedNFT';
import Header from '../Navbar/Header';
import axios from 'axios';
import { myContext } from '../Context';
import moment from 'moment';

export default function Profile() {
  const {user} = useContext(myContext);

  const [allCampaigns, setAllCampaigns] = useState([]);
  const [claimedNFTS, setClaimedNFTs] = useState([]);

  useEffect(async () => {
    if (!user) return;
    //get all campaigns the user has
    const claimsData = await axios.get(
      `/api/claim/getClaimedNFTs`
    );

    setClaimedNFTs(claimsData.data);
  }, [user]);

  useEffect(async () => {
    // /campaign/all/:handle
    if (!user) return;
    const campaigns = await axios.get('/api/campaign/myCampaigns');
    setAllCampaigns(campaigns.data);
  }, [user]);

    return (
      <div className='row'>
        <div className='col-md-3 col-lg-3 left-profile'>
          <Link className='text-link' to='/welcome'>
            <div className='logo-profile profile-logo-text'>Magic Mint</div>
          </Link>
          <div className='profile-nav'>
            <div>
              <Link to='/profile'>My profile</Link>
            </div>
            <div>
              <Link to='/claim'>Claimable NFTs</Link>
            </div>
            <div>
              <Link
                to='/profile
                        '
              >
                My campaigns
              </Link>
            </div>
            <div>
              <Link to='/createcampaign'>Create campaign</Link>
            </div>
            {/* <div><button className="button-logout">Logout</button></div> */}
            <div>
              <Link to='/'>← Back to start</Link>
            </div>
          </div>
        </div>
        <div className='col-md-8 col-lg-8 overview right-profile'>
          <div className='my-subscriptions'>
            <div className='overview row'>
              <div className='profile-section-title col-md-2 col-lg-2'>
                My profile
              </div>
              <div className='col-md-9 col-lg-9'></div>
              <div className='profile-section-image col-md-1 col-lg-1'>
                <img src={user.twitterProvider.photo} className='profile' />
              </div>
            </div>
            <div className='active-listings'>
              <div className='profile-section-title'>Claimable NFTs</div>
              <div className='profile-section-desc'>
                Get your reward! - <Link to='/claim'>Claim</Link>
              </div>
            </div>

            <div className='active-listings'>
              <div className='profile-section-title'>Claimed NFTs</div>
              <div className='profile-section-desc'></div>

              <div className='row'>
                {claimedNFTS.length !== 0 ? 
                  claimedNFTS.map((claim) => (
                  <div className='col-md-3 col-lg-3' key={claim._id}>
                    <ClaimedNFT
                      ipfsUri={claim.ipfsUri}
                      name={claim.originNFT.name}
                      _id={claim._id}
                    ></ClaimedNFT>
                  </div>
                ))
                :
                <h6 style={{
                  textAlign: 'center'
                }}>You haven't claimed any NFT</h6>
              }
              </div>
            </div>
          </div>

          <div className='patronage-nfts'>
            <div className='profile-section-title'>My campaigns</div>
            <div className='row patronage-table-nav mb-1'>
              <div className='col-lg-2 col-md-2'>Name</div>
              <div className='col-lg-3 col-md-3'>Start Date</div>
              <div className='col-lg-3 col-md-3'>End Date</div>
              <div className='col-lg-2 col-md-2'>Likes</div>
              <div className='col-lg-2 col-md-2'>Reshares</div>
            </div>

            {allCampaigns.map((campaign) => (
              <div key={campaign._id} className='mb-2'>
                <div className='row patronage-table-row'>
                  <div className='col-lg-2 col-md-2'>
                    {campaign.campaignName}
                  </div>
                  <div className='col-lg-3 col-md-3'>
                    {
                      moment(campaign.startDate).format('DD/MM/yyyy - HH:mm')
                    }
                  </div>
                  <div className='col-lg-3 col-md-3'>{moment(campaign.endDate).format('DD/MM/yyyy - HH:mm')}</div>
                  <div className='col-lg-2 col-md-2'>
                    {campaign.campaignBase === 'likes'
                      ? campaign.likes.length
                      : '--||--'}
                  </div>
                  <div className='col-lg-2 col-md-2'>
                    {campaign.campaignBase === 'reshares'
                      ? campaign.reshares.length
                      : '--||--'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
