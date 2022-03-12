import React, { useEffect } from "react";
import "./ClaimableNFT.css"
import { Link } from 'react-router-dom'
import axios from "axios";



export default function ClaimableNFT(props){

    console.log(props._id)

    const ipfsLink = `https://ipfs.io/ipfs/${props.ipfsUri}`


    useEffect(()=>{


    })

    let claimNFT = async function(){
        console.log(props._id)
        const claimAction = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/claim/claimSingleNFT/${props._id}` )
        
        console.log("claimaction", claimAction)
    }   


    return(
        <div>
            <div className="card claimableNFT">
                    <div className="card-img-top"  alt="">
                        <img src={ipfsLink} style={{width:"100%", height:"100%"}}></img>
                    </div>
                    <div className="card-body">
                            <div className="title-earning">
                                <Link to="/singlenft"className="text-link">
                                    {props.name}
                                </Link>
 
                            </div>
                        <div className="button-claim-area">
                            <button className="button-claim" onClick={claimNFT}>Claim</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}