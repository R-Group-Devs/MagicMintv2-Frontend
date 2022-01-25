import React from 'react';
import "./Profile.css"
import { Link } from 'react-router-dom';

export default function Profile (){


    return(
        <div>
            <div className="row">
                <div className="col-md-3 col-lg-3 left-profile">
                <Link className="text-link" to="/">
                            <div className="logo-profile profile-logo-text">
                                Magic Mint
                            </div>
                        </Link>
                    <div className="profile-nav">
                        <div><a>Your Subscriptions</a></div>
                        <div><a>Active Subscription</a></div>
                        <div><a>Subscription History</a></div>
                        <div><a>USERS OVERVIEw</a></div>
                        <div><a>YOUR SUBSCRIBERS</a></div>
                        <div><a href="/mint">Create Subscription</a></div>
                        <div><a href="/marketplace">← BACK TO CONTENT</a></div>
                    </div>                
                </div>
                <div className="col-md-9 col-lg-9 overview right-profile" >

                    <div className="my-subscriptions">
                        <div className="overview">
                            <div className="profile-section-title ">Overview</div>
                            <div className="profile-section-desc">Manage subscriptions</div>
                            <div className="row collect-row">
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="current-patronage">
                                        <div className="price-desc">Monthly payment</div>
                                        <div className="price-dollars">$ 3.200</div>
                                        <div className="price-eth">1 ETH</div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="active-listings">
                            <div className="profile-section-title">Active Subscriptions</div>
                            <div className="profile-section-desc">What are u enjoying at the moment</div>
                            <div className="row active-listing-nft">
                                <div className="col-md-4 col-lg-4">
                                </div>
                                <div className="col-md-8 col-lg-8">
                                    <div className="listed-nft-desc">
                                        <div className="active-subscription-desc">
                                        All leaks in one.
                                        Access premium community content, investment opportunities and exclusive discord chan.
                                        </div>
                                    </div>
                                    <div className="row manage-funds-buttons">
                                        <button className="col-md-5 col-lg-5 deposit-subscription-button">
                                                DEPOSIT
                                        </button>
                                        <button className="col-md-5 col-lg-5 cancel-subscription-button">
                                                CANCEL

                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row active-listing-nft">
                                <div className="col-md-4 col-lg-4">
                                </div>
                                <div className="col-md-8 col-lg-8">
                                    <div className="listed-nft-desc">
                                        <div className="active-subscription-desc">
                                        Watch Breaking Bad
                                        </div>
                                    </div>
                                    <div className="row  manage-funds-buttons">
                                        <button className="col-md-5 col-lg-5 deposit-subscription-button">
                                            DEPOSIT
                                        </button>
                                        <button className="col-md-5 col-lg-5 cancel-subscription-button">
                                            CANCEL 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="radical-nfts">
                            <div className="profile-section-title">Subscription History</div>
                            <div className="profile-section-desc">Consume the way you want.</div>
                            <div className="row patronage-table-nav">
                                <div className="col-lg-4 col-md-4">
                                        Name
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                        Starting Date
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                        Ending Date
                                    </div>
                            </div>

                            <div className="row patronage-table-row">
                                <div className="col-lg-4 col-md-4">
                                    <span className="small-image"></span>
                                    Spotify Premium
                                </div>
                                <div className="col-lg-2 col-md-2">
                                </div>
                                <div className="col-lg-2 col-md-2">
                                </div>
                                <div className="col-lg-2 col-md-2">
                                    <span className="starting-date">15.06.21</span>
                                </div>
                                <div className="col-lg-2 col-md-2">
                                <span className="ending-date">02.08.21</span>
                                </div>
                            </div>

                            <div className="row patronage-table-row">
                                <div className="col-lg-4 col-md-4">
                                    <span className="small-image"></span>
                                    Spotify Family
                                </div>
                                <div className="col-lg-2 col-md-2">
                                </div>
                                <div className="col-lg-2 col-md-2">
                                </div>
                                <div className="col-lg-2 col-md-2">
                                    <span className="starting-date">03.01.21</span>
                                </div>
                                <div className="col-lg-2 col-md-2">
                                    <span className="ending-date">09.06.21</span>
                                </div>
                            </div>

                            <div className="row patronage-table-row">
                                <div className="col-lg-4 col-md-4">
                                    <span className="small-image"></span>
                                    Gabriel Haines
                                </div>
                                <div className="col-lg-2 col-md-2">
                                </div>
                                <div className="col-lg-2 col-md-2">
                                </div>
                                <div className="col-lg-2 col-md-2">
                                    <span className="starting-date">12.04.21</span>
                                </div>
                                <div className="col-lg-2 col-md-2">
                                    <span className="ending-date">20.04.21</span>
                                </div>
                            </div>

                            <div className="row patronage-table-row">
                                <div className="col-lg-4 col-md-4">
                                    <span className="small-image"></span>
                                    Netflix
                                </div>
                                <div className="col-lg-2 col-md-2">
                                </div>
                                <div className="col-lg-2 col-md-2">
                                </div>
                                <div className="col-lg-2 col-md-2">
                                    <span className="starting-date">15.06.21</span>
                                </div>
                                <div className="col-lg-2 col-md-2">
                                    <span className="ending-date">25.07.21</span>
                                </div>
                            </div>

                            <div className="row patronage-table-row">
                                <div className="col-lg-4 col-md-4">
                                    <span className="small-image"></span>
                                    Hulu
                                </div>
                                <div className="col-lg-2 col-md-2">
                                </div>
                                <div className="col-lg-2 col-md-2">
                                </div>
                                <div className="col-lg-2 col-md-2">
                                    <span className="starting-date">13.02.21</span>
                                </div>
                                <div className="col-lg-2 col-md-2">
                                    <span className="ending-date">13.03.21</span>
                                </div>
                            </div>
                                                    <div className="see-more-subscribers">See More ..</div>

         
                    </div>


                    </div>

                    <div className="my-users">
                        <div className="my-users-text">My Users</div>
                    </div>
                    <div className="row collect-row">
                            <div className="col-md-9 col-lg-9 col-sm-12">
                                <div className="current-patronage">
                                    <div className="price-desc">Total Revenue Generated</div>
                                    <div className="price-dollars">$ 3.200</div>
                                    <div className="price-eth">1 ETH</div>

                                </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                                <button className="collect-patronage">
                                    Collect
                                </button>

                            </div>
                        </div>
                        <div className="row patronages-row" >
                            <div className="col-md-6 col-lg-6 box">
                                <div className="total-patronage">
                                    <div className="price-desc">  Monthly Revenue Generated</div>
                                    <div className="price-dollars">$ 5.200</div>
                                    <div className="price-eth">2.1 ETH</div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 box">
                                <div className="deposit-patronage">
                                    <div className="price-desc">Number of Subscribers</div>
                                    <div className="price-dollars">$ 0</div>
                                    <div className="price-eth">0 ETH</div>
                                </div>
                            </div>

                        </div>


                    

                    <div className="patronage-nfts">
                        <div className="profile-section-title">My subscribers</div>
                        <div className="profile-section-desc">Manage community</div>
                        <div className="row patronage-table-nav">
                            <div className="col-lg-2 col-md-2">
                                Subscriber Name
                            </div>
                            <div className="col-lg-4 col-md-4">
                                
                            </div>
                            <div className="col-lg-3 col-md-3">
                                CONSECUTIVE DAYS
                            </div>
                            <div className="col-lg-3 col-md-3">
                                CONTENT
                            </div>
                        </div>
                        <div className="row patronage-table-row">
                            <div className="col-lg-2 col-md-2">
                                <span className="small-image"></span>
                                    velkoskis.eth
                            </div>
                            <div className="col-lg-4 col-md-4">
                            </div>
                            <div className="col-lg-3 col-md-3">
                                56
                            </div>
                            <div className="col-lg-3 col-md-3">
                                Spotify Premium
                            </div>
                        </div>
                        <div className="row patronage-table-row">
                            <div className="col-lg-2 col-md-2">
                                <span className="small-image"></span>
                                    eric.eth
                            </div>
                            <div className="col-lg-4 col-md-4">
                            </div>
                            <div className="col-lg-3 col-md-3">
                                60
                            </div>
                            <div className="col-lg-3 col-md-3">
                            Spotify Premium
                            </div>
                        </div>
                        <div className="row patronage-table-row">
                            <div className="col-lg-2 col-md-2">
                                <span className="small-image"></span>
                                    kalis.eth
                            </div>
                            <div className="col-lg-4 col-md-4">
                            </div>
                            <div className="col-lg-3 col-md-3">
                                23
                            </div>
                            <div className="col-lg-3 col-md-3">
                            Spotify Premium
                            </div>
                        </div>
                        <div className="row patronage-table-row">
                            <div className="col-lg-2 col-md-2">
                                <span className="small-image"></span>
                                    trcx.eth
                            </div>
                            <div className="col-lg-4 col-md-4">
                            </div>
                            <div className="col-lg-3 col-md-3">
                                25
                            </div>
                            <div className="col-lg-3 col-md-3">
                            Spotify Premium
                            </div>
                        </div>

                        <div className="see-more-subscribers">See More ..</div>
                    </div>

                   
                </div>

            </div>
        </div>
    )
}