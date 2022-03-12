import React, { useEffect, useState } from 'react';
import "./Profile.css"
import { Link } from 'react-router-dom';
import ClaimableNFT from '../partials/ClaimableNFT/ClaimableNFT';
import ClaimedNFT from '../partials/ClaimedNFT/ClaimedNFT';
import Header from '../Navbar/Header';
import axios from 'axios';

export default function Profile (){

    let userObject = localStorage.getItem('profile')
    userObject = userObject ? JSON.parse(userObject) : []

    const [allCampaigns, setAllCampaigns] = useState(null)
    const [allCampaignsManage, setAllCampaignsManage] = useState(null)
    const [claimed, setClaimed] = useState()



    useEffect( async ()=>{

        //get all campaigns the user has
        const claimedNFTS = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/claim/getClaimedNFTs/${userObject.username}` )
        console.log("claimed",claimedNFTS.data)

        const claimsData = claimedNFTS.data.map((claim)=>(

            <div className="col-md-3 col-lg-3" key={claim._id}>

                {/* //campaign name
                //nft name
                //ipfsUri */}

                {/* 
                when opening for details
                //campaign name
                //campaign creator
                //nft name
                //nft desc
                //nft number = campaign mint number */}

                <ClaimedNFT ipfsUri={claim.ipfsUri}  name={claim.name} _id={claim._id} ></ClaimedNFT>
            </div>
        ))

        setClaimed(claimsData)

        // /campaign/all/:handle
        const campaigns = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/campaign/all/${userObject.username}` )
        console.log(campaigns.data)
        setAllCampaigns(campaigns)

        let campaignManage = campaigns.data.map((campaign)=>(
            <div key={campaign._id}>
                <div className="row patronage-table-row">
                    <div className="col-lg-2 col-md-2">
                        {campaign.campaignName}
                    </div>
                    <div className="col-lg-2 col-md-2">
                        01/02/2022
                    </div>
                    <div className="col-lg-2 col-md-2">
                        01/03/2022
                    </div>
                    <div className="col-lg-2 col-md-2">
                        100
                    </div>
                    <div className="col-lg-2 col-md-2">
                        50
                    </div>

                </div>
            </div>
        ))
        setAllCampaignsManage(campaignManage)
        console.log(allCampaignsManage)
        
        //get all NFTS the user has yet to claim
        // get all nfts that are claimed

    },[])


    return(
            <div className='row'>

                <div className="col-md-3 col-lg-3 left-profile">
                <Link className="text-link" to="/welcome">
                            <div className="logo-profile profile-logo-text">
                                Magic Mint
                            </div>
                        </Link>
                    <div className="profile-nav">
                        <div><a href="/profile">My profile</a></div>
                        <div><a href="/profile">Claimable NFTs</a></div>
                        <div><a href="/profile
                        ">My campaigns</a></div>
                        <div><a href="/createcampaign">Create campaign</a></div>
                    {/* <div><button className="button-logout">Logout</button></div> */}
                        <div><a href="/welcome">← Back to start</a></div>
                    </div>                
                </div>
                <div className="col-md-8 col-lg-8 overview right-profile" >
                    <div className="my-subscriptions">
                        <div className="overview row">
                            <div className="profile-section-title col-md-2 col-lg-2" >My profile</div>
                            <div className="col-md-9 col-lg-9"></div>
                            <div className="profile-section-image col-md-1 col-lg-1"><img src={userObject.photos[0].value} className="profile"/></div>
                        </div>
                        <div className="active-listings">
                            <div className="profile-section-title">Claimable NFTs</div>
                            <div className="profile-section-desc">Get your reward! - <a href="/claim">Claim</a></div>
                        </div>
                        {/* <div className="row" >
                            <div className="col-md-3 col-lg-3">
                                <ClaimableNFT/>
                            </div>
                            <div className="col-md-3 col-lg-3">
                                <ClaimableNFT/>
                            </div>
                            <div className="col-md-3 col-lg-3">
                                <ClaimableNFT/>
                            </div>
                            <div className="col-md-2 col-lg-2">
                                <ClaimableNFT/>
                            </div>
                            <div className="see-more-subscribers">See More ..</div>
        
                        </div> */}
                        <div className="active-listings">
                            <div className="profile-section-title">Claimed NFTs</div>
                            <div className="profile-section-desc"></div>
                   
                        <div className="row" >
                            {claimed}
                        </div>
                        <div className="see-more-subscribers">See More ..</div>
                        </div>

                    </div>

                    <div className="patronage-nfts">
                        <div className="profile-section-title">My campaigns</div>
                        <div className="row patronage-table-nav">
                            <div className="col-lg-2 col-md-2">
                                 Name
                            </div>
                            <div className="col-lg-2 col-md-2">
                                Start Date
                            </div>
                            <div className="col-lg-2 col-md-2">
                                End Date
                            </div>
                            <div className="col-lg-2 col-md-2">
                                Likes
                            </div>
                            <div className="col-lg-2 col-md-2">
                                Reshares
                            </div>
                        </div>

                        {allCampaignsManage}

                        <div className="see-more-subscribers">See More ..</div>
                    </div>

                   
                </div>

            </div>
    )
}