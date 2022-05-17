import react, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './ClaimPage.css';
import Header from '../Navbar/Header';
import ClaimableNFT from '../partials/ClaimableNFT/ClaimableNFT';
import MMEngineABI from '../../shell/abis/MMEngine.json';
import { Contract, ethers } from 'ethers';
import { myContext } from '../Context';

function ClaimPage() {
  const userObject = useContext(myContext);

  const MMEngineAddress = '0xBEA58ad6d477Ac598E68D8E6aC23E19F43288F06';

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  console.log('Add', signer._address);

  const MMEngine = new ethers.Contract(
    MMEngineAddress,
    MMEngineABI.abi,
    signer
  );
  console.log('mmengine', MMEngine);

  useEffect(async () => {
    const contractName = await MMEngine.name();
  }, []);

  const [claimsNFT, setClaimsNFT] = useState(null);

  const checkClaims = async function () {
    const allCampaignsTwitterPost = await axios.get(
      `/api/claim/getAllClaimsByUser/${userObject.username}`
    );
    if (allCampaignsTwitterPost.data == 'none') {
      console.log(allCampaignsTwitterPost);
    } else {
      window.location.reload();
    }
  };

  console.log(window.ethereum);

  if (window.ethereum) {
    if (window.ethereum.isMetaMask) {
      console.log('metamask');
    }
  } else {
    console.log('install metamask please');
  }

  useEffect(async () => {
    if (!userObject) return;
    const allClaims = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/claim/getClaims/${userObject.username}`
    );
    setClaimsNFT(null);
    console.log('claimsdata', allClaims.data);

    const claimable = allClaims.data.map((claim) => (
      <div className='col-md-3 col-lg-3' key={claim._id}>
        {/* //campaign name
                //nft name*/}

        {/* 
                when opening for details
                //campaign name
                //campaign creator
                //nft name
                //nft desc
                //nft number = campaign mint number */}
        <ClaimableNFT
          ipfsUri={claim.ipfsUri}
          name={claim.name}
          _id={claim._id}
          engine={MMEngine}
          signer={signer}
        ></ClaimableNFT>
      </div>
    ));
    setClaimsNFT(claimable);
  }, [userObject]);

  if (userObject) {
    return (
      <div>
        <Header
          image={userObject.twitterPhoto}
          username={userObject.username}
        />

        <div className='row button-row'>
          <div className='col-md-4 col-lg-4 col-sm-12'></div>
          <div className='col-md-4 col-lg-4 col-sm-12 check-claims-div'>
            <button onClick={checkClaims} className='check-claims-button'>
              Check for new claims
            </button>
          </div>
          <div className='col-md-4 col-lg-4 col-sm-12'></div>
        </div>
        <div className='row'>
          <div className='container row claims-container'>
            {claimsNFT ? (
              <div className='row'>{claimsNFT}</div>
            ) : (
              <div className='no-claims-message'>
                No NFTS
                <div>Check out active listings and get your claim</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='not-logged-in'>
        You are not logged in correctly. Please head <a href='/auth'> here</a>{' '}
        to login with Twitter and access the app!
      </div>
    );
  }
}

export default ClaimPage;
