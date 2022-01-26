import react from "react";
import "./Nav.css";
import { Link , Redirect }  from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import speshiepp from '../../assets/images/speshiepp.png'
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap"


function Header(){
    
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
                      <Link className="text-link" to="/profile"><span className="nav-item">Create Campaign</span></Link>
                      <Link className="text-link" to="/profile"><span className="nav-item">Claim</span></Link>
                      <Link className="text-link" to=""><span className="nav-item">Playgrounds</span></Link>
                    </div>
                    <div className="col-md-4 col-lg-4 right-content">
                    <Link className="text-link" to="/search">
                    <span className="search nav-item">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5.5" cy="5" r="4.5" stroke="#282828" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2715 12.5L8 8.27523L8.72845 7.5L13 11.7248L12.2715 12.5Z" fill="#282828"/>
                    </svg>
                        Search
                    </span>
                    </Link>
                    {/* twitter user pp */}
                    <Link to="/profile" className="text-link">
                      <img src={speshiepp} className="profile"/>
                    </Link>

                    </div>


                    </div>
            </div>




            
        </div>
    )
}


export default Header;