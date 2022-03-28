import React, { useEffect } from 'react';
import "./Welcome.css"
import { Link } from 'react-router-dom';
import Header from '../Navbar/Header';
import { myContext } from '../Context';
import { useContext } from 'react';

export default function Welcome (){

    
    let userObject = localStorage.getItem('profile')

    // useEffect(()=>{
    //     if(!window.location.hash) {
	// 	window.location = window.location + '#loaded';
	// 	window.location.reload();
	// }
    // },[userObject])      

if (userObject){
        userObject = userObject ? JSON.parse(userObject) : []


    return(

        <div className="">
            <Header image= {userObject.photos[0].value} username={userObject.username}/>

            <div className="row welcome-wrapper">
                <div className="col-md-4 col-lg-4 col-sm-12">
                </div>
                <div className="col-md-4 col-lg-4 col-sm-12 ">
                    <div className="welcomebuttons">
                        <div className="welcome-title">Greetings, {userObject.username} 👋  </div>
                        <div className="welcome-desc"></div>
                        <button className="campaign-button"><Link className="text-link" to="/createcampaign"> Create a campaign</Link></button><br></br>
                        <button className="claim-button" disabled> <Link className="text-link" to="/claim"> Claim your nft</Link> </button>
                    </div>
                </div>
                <div className="col-md-4 col-lg-4 col-sm-12 ">
                </div>
            </div>
        </div>
        )
} else {
    return(
        <div className='not-logged-in'>
            You are not logged in correctly.
            Please head <a href='/auth'> here</a> to login with Twitter and access the app!
        </div>
    )
}



}
