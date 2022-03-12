import react from "react";
import "./Nav.css";
import { Link , Redirect }  from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import speshiepp from '../../assets/images/speshiepp.png'
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap"


function Header(props){
    
  const navPadding ={
    marginLeft: "10px",
    marginRight: "10px"
  }
    return(
        <div>
            <nav class="navbar navbar-expand-md navbar-light"  style={{margin:"0% 2% 1% 2%"}}>
                <a class="navbar-brand " href="#">
                  <Link className="nav-link" to="/welcome">
                      <span className="left-content branding">
                        MagicMint
                      </span>
                  </Link>
                </a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarsExample04">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                      <Link className="nav-link" to="/createcampaign">
                          <span >Campaign </span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link className="nav-link" to="/claim">
                        <span>Claim</span>
                      </Link>
                    </li>
                    <li class="nav-item">
                    <a className="nav-link" href="https://playgrounds.wtf/" target={"_blank"}>
                      <span>Playgrounds</span>
                    </a>
                    </li>

                  </ul>
                  <ul class="navbar-nav ml-auto" style={{marginRight: "0", marginLeft: "auto"}}>
                    <li class="nav-item greetings">
                      {/* <span className="nav-item  ">
                            {props.username}  
                      </span> */}
                      <button className="connect-button ">
                        Connect
                      </button>
                    </li>
                    <li>
                      <Link to="/profile" className="text-link">
                        <img src={props.image} className="profile"/>
                      </Link>
                    </li>
                  </ul>

                </div>
           </nav>




            
        </div>
    )
}


export default Header;