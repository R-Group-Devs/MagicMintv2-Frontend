import React, { useEffect } from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";
import Header from "../Navbar/Header";
import { myContext } from "../Context";
import { useContext } from "react";

export default function Welcome() {
  let userObject = localStorage.getItem("profile");

  // useEffect(()=>{
  //     if(!window.location.hash) {
  // 	window.location = window.location + '#loaded';
  // 	window.location.reload();
  // }
  // },[userObject])

  if (userObject) {
    userObject = userObject ? JSON.parse(userObject) : [];

    return (
      <div className="welcome">
        <Header
          image={userObject.photos[0].value}
          username={userObject.username}
        />

        <div className="welcome-wrapper row">
          <div className="col-md-4 col-lg-4 col-sm-12"></div>
          <div className="col-md-4 col-lg-4 col-sm-12 ">
            <div className="welcomebuttons">
              <div className="welcome-title">
                Greetings, {userObject.username} 👋{" "}
              </div>
              <div className="welcome-desc"></div>
              <Link className="text-link" to="/createcampaign">
                <button className="campaign-button"> Create a campaign</button>
                <br></br>
              </Link>
              <Link className="text-link" to="/claim">
                <button className="claim-button"> Claim your nft </button>
              </Link>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-sm-12 "></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="not-logged-in">
        You are not logged in correctly. Please head <a href="/auth"> here</a>{" "}
        to login with Twitter and access the app!
      </div>
    );
  }
}
