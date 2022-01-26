import React from 'react';
import "./Welcome.css"
import { Link } from 'react-router-dom';
import Header from '../Navbar/Header';

export default function Welcome (){

return(

<div>
    <Header/>

    <div className="row">
    <div className="col-md-4 col-lg-4 col-sm-4">
    </div>
    <div className="col-md-4 col-lg-4 col-sm-4 ">
        <div className="welcomebuttons">
            <div className="welcome-title">Welcome to MagicMint ✨ </div>
            <div className="welcome-desc"></div>
            <button className="campaign-button"> Create a campaign</button><br></br>
            <button className="claim-button" disabled> Claim your NFT</button>


        </div>
        </div>
    </div>
    <div className="col-md-4 col-lg-4 col-sm-4 ">
    </div>

</div>
)


}
