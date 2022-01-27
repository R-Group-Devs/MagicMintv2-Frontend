import React from 'react';
import "./Profile.css"
import { Link } from 'react-router-dom';
import ClaimableNFT from '../partials/ClaimableNFT/ClaimableNFT';
import ClaimedNFT from '../partials/ClaimedNFT/ClaimedNFT';

export default function Profile (){


    return(
            <div>
                <div className="col-md-3 col-lg-3 left-profile">
                <Link className="text-link" to="/">
                            <div className="logo-profile profile-logo-text">
                                Magic Mint
                            </div>
                        </Link>
                    <div className="profile-nav">
                        <div><a>My profile</a></div>
                        <div><a>Claimable NFTs</a></div>
                        <div><a>My campaigns</a></div>
                        <div><a href="/mint">Create campaign</a></div>
                        <div><a href="/marketplace">← BACK TO CONTENT</a></div>
                    </div>                
                </div>
                <div className="col-md-9 col-lg-9 overview right-profile" >
                    <div className="my-subscriptions">
                        <div className="overview">
                            <div className="profile-section-title ">My profile</div>

                        </div>
                        <div className="active-listings">
                            <div className="profile-section-title">Claimable NFTs</div>
                            <div className="profile-section-desc">Get your reward!</div>
                        </div>
                        <div className="row" >
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
        
                        </div>
                        <div className="active-listings">
                            <div className="profile-section-title">Claimed NFTs</div>
                            <div className="profile-section-desc"></div>
                        </div>
                        <div className="row" >
                            <div className="col-md-3 col-lg-3">
                                <ClaimedNFT/>
                            </div>
                            <div className="col-md-3 col-lg-3">
                                <ClaimedNFT/>
                            </div>
                            <div className="col-md-3 col-lg-3">
                                <ClaimedNFT/>
                            </div>
                            <div className="col-md-2 col-lg-2">
                                <ClaimedNFT/>
                            </div>
                        </div>
                        <div className="see-more-subscribers">See More ..</div>


                    </div>

                    <div className="patronage-nfts">
                        <div className="profile-section-title">My campaigns</div>
                        <div className="profile-section-desc">Manage</div>
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
                        <div className="row patronage-table-row">
                            <div className="col-lg-2 col-md-2">
                            MagicMint
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
                        <div className="row patronage-table-row">
                            <div className="col-lg-2 col-md-2">
                            HyperVibes
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
                        <div className="row patronage-table-row">
                            <div className="col-lg-2 col-md-2">
                            Shell
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

                        <div className="see-more-subscribers">See More ..</div>
                    </div>

                   
                </div>

            </div>
    )
}