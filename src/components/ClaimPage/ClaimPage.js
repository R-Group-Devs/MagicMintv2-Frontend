import react, { useEffect, useState } from "react";
import axios from "axios";
import "./ClaimPage.css"
import Header from '../Navbar/Header';
import ClaimableNFT from '../partials/ClaimableNFT/ClaimableNFT'

function ClaimPage(){
    
    let userObject = localStorage.getItem('profile')
    userObject = userObject ? JSON.parse(userObject) : []

    const [claimsNFT, setClaimsNFT] =useState(null);

    const checkClaims = async function(){
        const allCampaignsTwitterPost = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/claim/getAllClaimsByUser/${userObject.username}` )
    }

    console.log(window.ethereum)

    if(window.ethereum){
        if(window.ethereum.isMetaMask){
            console.log("metamask")
        }
    }else{
        console.log("install metamask please")
    }

    useEffect( async ()=>{

        const allClaims = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/claim/getClaims/${userObject.username}` )
        setClaimsNFT(null)
        console.log("claimsdata",allClaims.data)

        const claimable = allClaims.data.map((claim)=>(

            <div className="col-md-3 col-lg-3" key={claim._id}>
                {/* //campaign name
                //nft name*/}
        
                {/* 
                when opening for details
                //campaign name
                //campaign creator
                //nft name
                //nft desc
                //nft number = campaign mint number */}
                <ClaimableNFT ipfsUri={claim.ipfsUri}  name={claim.name} _id={claim._id} ></ClaimableNFT>
            </div>

        ))
        setClaimsNFT(claimable)

    },[])


    return(
        <div>

        <Header image= {userObject.photos[0].value} username={userObject.username}/>

        <div className="row button-row" >
            <div className="col-md-4 col-lg-4 col-sm-12">

            </div>
            <div className="col-md-4 col-lg-4 col-sm-12 check-claims-div">
            
            <button onClick={checkClaims} className="check-claims-button">
                Check for new claims
                </button>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12">
            
            </div>

        </div>
        <div className="row">
            <div className="container row claims-container">

                {claimsNFT
                    ?<div className="row">{claimsNFT}</div>
                    :  <div className="no-claims-message">
                            No NFTS
                            <div>
                                Check out active listings and get your claim
                            </div>
                        </div>
                }
            </div>
        </div>

        </div>
    )
}


export default ClaimPage;