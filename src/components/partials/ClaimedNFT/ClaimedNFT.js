import React from "react";
import "./ClaimedNFT.css"
import { Link } from 'react-router-dom'



export default function ClaimedNFT(props){
    const ipfsLink = `https://ipfs.io/ipfs/${props.ipfsUri}`


    return(
        <div>
            <div className="card">
                    <div className="card-img-top"  alt="">
                    <img src={ipfsLink} style={{width:"100%", height:"100%"}}></img>

                    </div>
                    <div className="card-body">
                            <div className="title-earning">
                                <Link to="/singlenft"className="text-link">
                                        {props.name}
                                </Link>
 
                            </div>

                    </div>
                </div>
        </div>
    )
}