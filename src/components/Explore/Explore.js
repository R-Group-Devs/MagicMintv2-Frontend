import React, { useEffect } from "react";
import "./Explore.css";
import { Link } from "react-router-dom";
import Header from "../Navbar/Header";
import { myContext } from "../Context";
import { useContext } from "react";

export default function Explore() {
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
      <div className="">
        <Header
          image={userObject.photos[0].value}
          username={userObject.username}
        />

        <div className="heading">Coming soon ⏰</div>
        <div className="explore-description">
          Expore, buy and sell NFTs created on this platform.
        </div>
      </div>
    );
  } else {
    return <div>Coming soon</div>;
  }
}
