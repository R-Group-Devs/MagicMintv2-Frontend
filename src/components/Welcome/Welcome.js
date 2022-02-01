import React, { useEffect } from 'react';
import "./Welcome.css"
import { Link } from 'react-router-dom';
import Header from '../Navbar/Header';
import { myContext } from '../Context';
import { useContext } from 'react';

export default function Welcome (){
    const userObject = useContext(myContext)

    // useEffect(() => {

    //     console.log("welcome" , userObject)
    //     console.log("img" , userObject.photos[0].value)
    // },[])



if (userObject){
    return(

        <div>
            <Header image= {userObject.photos[0].value} username={userObject.username}/>
        
            <div className="row">
            <div className="col-md-4 col-lg-4 col-sm-4">
            </div>
            <div className="col-md-4 col-lg-4 col-sm-4 ">
                <div className="welcomebuttons">
                    <div className="welcome-title">Welcome {userObject.username} </div>
                    <div className="welcome-desc"></div>
                    <button className="campaign-button"><Link className="text-link" to="/createcampaign"> Create a campaign</Link></button><br></br>
                    <button className="claim-button" disabled> <Link className="text-link" to="/claim"> Claim your nft</Link>Claim </button>
        
        
                </div>
                </div>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-4 ">
            </div>
        
        </div>
        )
} else {
    return(
        <div>
            you are not logged in
        </div>
    )
}



}
