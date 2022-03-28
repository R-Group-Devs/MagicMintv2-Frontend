import react from "react";
import "./Nav.css";
import { Link , Redirect }  from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import speshiepp from '../../assets/images/speshiepp.png'
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap"
import { ethers } from "ethers";
import { BigNumber, BigNumberish } from 'ethers';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


function Header(props){
    
  const [walletError, setWalletError] = useState(false)
  const [walletConnected, setWalletConnected] =  useState(false)
  const [activeAddress, setActiveAddress] = useState(null)
  const activeAddressLocal = localStorage.getItem('activeAddressLocal')
  const provider = localStorage.getItem('provider')

  console.log(activeAddressLocal)
  const [successFormModal, setSuccessFormModal] = useState(false);

  const onCloseSuccessCampaignModal = () =>{
    setSuccessFormModal(false);
} 
 const truncateHex = (hex) => {
  const bn = BigNumber.from(hex);
  const s = bn.toHexString();
  const first = s.slice(0, 2 + 4)
  const last = s.slice(-4)
  const concat = first + '....'+ last;
  return concat;
};

  const connectWalletEvent = () =>{
      if(window.ethereum){
        window.ethereum.request({method: 'eth_requestAccounts'}).then(
          result =>{
              setWalletConnected(true)
              setActiveAddress(result[0])
              console.log("hhh")
              localStorage.setItem("activeAddressLocal",result[0])
          }
        )
      }else{
        setSuccessFormModal(true)
        setWalletError(true)
      }
  }

  useEffect(()=>{
    if(window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      localStorage.setItem("provider", provider)
      // const address = await provider._getAddress();
      const address = localStorage.getItem('activeAddressLocal')
      console.log(address)
    }

  },[])



  useState(async ()=>{

    console.log("provider")
    const balance = await provider.getBalance("0x559441FEf78b7E27b66db69C11e5B3827e1aea96")
    console.log(ethers.utils.formatEther(balance))

  },[provider])


  const navPadding ={
    marginLeft: "10px",
    marginRight: "10px"
  }
  
    return(
        <div>
            <nav className="navbar navbar-expand-md navbar-light"  style={{margin:"0% 2% 1% 2%"}}>
                <a className="navbar-brand " href="#">
                  <Link className="nav-link" to="/welcome">
                      <span className="left-content branding">
                        MagicMint
                      </span>
                  </Link>
                </a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample04">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/createcampaign">
                          <span >Campaign </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/claim">
                        <span>Claim</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="https://playgrounds.wtf/" target={"_blank"}>
                      <span>Playgrounds</span>
                    </a>
                    </li>

                  </ul>
                  <ul className="navbar-nav ml-auto" style={{marginRight: "0", marginLeft: "auto"}}>
                    <li className="nav-item greetings">
                      {/* <span className="nav-item  ">
                            {props.username}  
                      </span> */}

                      {activeAddressLocal
                      ? <button className="connect-button" onClick={connectWalletEvent}>
                          {truncateHex(activeAddressLocal).replace('0x', '')}
                         </button>
                      :  <button className="connect-button" onClick={connectWalletEvent}>
                        Connect
                      </button>
                      }
          
                    </li>
                    <li>
                      <Link to="/profile" className="text-link">
                        <img src={props.image} className="profile"/>
                      </Link>
                    </li>
                  </ul>

                </div>
           </nav>



           <Modal open={successFormModal} onClose={onCloseSuccessCampaignModal} center>
              <div>
                    Unable to find Blockchain provider
                  <div>
                      To use the App please and claim NFT please install Metamask <a href="/https://metamask.io/download/">here </a>
                  </div>

              </div>
            </Modal>
            
        </div>
    )
}


export default Header;