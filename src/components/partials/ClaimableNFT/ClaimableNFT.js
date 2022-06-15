import React, { useEffect, useState } from 'react';
import './ClaimableNFT.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ClaimableNFT(props) {
  const ipfsLink = `https://ipfs.io/ipfs/${props.ipfsUri}`;
  const [signerAddress, setSignerAddress] = useState('');

  useEffect(async () => {
    if (!props.signer) return;
    const signerAddr = await props.signer.getAddress();
    setSignerAddress(signerAddr);
  }, [props.signer]);
  // console.log(ipfsUri)

  let claimNFT = async function () {
    const MMEngine = props.engine;
    if (!MMEngine) return;

    const claimMint = await MMEngine.mint(
      '0xdaef03a22c9be9db22eff61dca429f3e582c9c6d',
      signerAddress,
      props.ipfsUri
    );
    console.log('actual mint', claimMint);

    const claimAction = await axios.get(
      `/api/claim/claimSingleNFT/${props._id}`
    );

    if (claimAction.data != 'error') {
      console.log('claimaction', claimAction);
      window.location.href = '/profile';
    }
  };

  return (
    <div>
      <div className='card claimableNFT'>
        <div className='card-img-top' alt=''>
          <img src={ipfsLink} style={{ width: '100%', height: '100%' }}></img>
        </div>
        <div className='card-body'>
          <div className='title-earning'>
            {/* <Link to='/singlenft' className='text-link'> */}
            {props.name}
            {/* </Link> */}
          </div>
          <div className='button-claim-area'>
            <button className='button-claim' onClick={claimNFT}>
              Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
