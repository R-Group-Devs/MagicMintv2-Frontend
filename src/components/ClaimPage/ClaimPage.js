import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './ClaimPage.css';
import Header from '../Navbar/Header';
import ClaimableNFT from '../partials/ClaimableNFT/ClaimableNFT';
import MMEngineABI from '../../shell/abis/MMEngine.json';
import { Contract, ethers } from 'ethers';
import { myContext } from '../Context';

const MMEngineAddress = '0xBEA58ad6d477Ac598E68D8E6aC23E19F43288F06';

function ClaimPage() {
  const { user } = useContext(myContext);
  const [MMEngine, setMMEngine] = useState(null);
  const [signer, setSigner] = useState(null);
  const [claimsNFT, setClaimsNFT] = useState([]);

  useEffect(() => {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _signer = provider.getSigner();

    const _MMEngine = new ethers.Contract(
      MMEngineAddress,
      MMEngineABI.abi,
      _signer
    );

    setMMEngine(_MMEngine);
    setSigner(_signer);
  }, [window.ethereum]);

  const checkClaims = async () => {
    const checkClaims = await axios.get(`/api/claim/getAllClaimsByUser`);
    const allClaims = await axios.get('/api/claim/getClaims');
    setClaimsNFT(allClaims.data);
  };

  if (window.ethereum) {
    if (window.ethereum.isMetaMask) {
      console.log('metamask');
    }
  } else {
    console.log('install metamask please');
  }

  useEffect(async () => {
    if (!user) return;
    const allClaims = await axios.get('/api/claim/getClaims');
    // console.log('claimsdata', allClaims.data);
    setClaimsNFT(allClaims.data);
  }, [user]);

  return (
    <div>
      <Header image={user.provider.photo} username={user.provider.username} />

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
          {claimsNFT.length !== 0 ? (
            <div className='row'>
              {claimsNFT.map((claim) => (
                <div className='col-md-3 col-lg-3' key={claim._id}>
                  <ClaimableNFT
                    ipfsUri={claim.ipfsUri}
                    name={claim.originNFT.name}
                    _id={claim._id}
                    engine={MMEngine}
                    signer={signer}
                  ></ClaimableNFT>
                </div>
              ))}
            </div>
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
}

export default ClaimPage;
