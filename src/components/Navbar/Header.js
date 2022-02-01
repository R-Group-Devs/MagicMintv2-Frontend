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
            <div className="landing navigation">
                <div className="row">
                    <div className="col-md-4 col-lg-4">
                        <Link className="text-link" to="/welcome">
                            <div className="left-content">
                              ✨ 
                               MagicMint
                              
                            </div>
                        </Link>
                    </div>
                    
                    <div className="col-md-4 col-lg-4 mid-content">
                      <Link className="text-link" to="/createcampaign"><span className="nav-item">Create Campaign</span></Link>
                      <Link className="text-link" to="/claim"><span className="nav-item">Claim</span></Link>
                      <Link className="text-link" to=""><span className="nav-item">Playgrounds</span></Link>
                    </div>
                    <div className="col-md-4 col-lg-4 right-content">
                    <span className="search nav-item">
                        Hey, {props.username}  
                    </span>
                    {/* twitter user pp */}
                    <Link to="/profile" className="text-link">
                      <img src={props.image} className="profile"/>
                    </Link>

                    </div>


                    </div>
            </div>




            
        </div>
    )
}


export default Header;