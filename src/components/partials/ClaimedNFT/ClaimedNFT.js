import React from "react";
import "./ClaimedNFT.css"
import { Link } from 'react-router-dom'



export default function ClaimedNFT(){


    return(
        <div>
            <div className="card">
                    <div className="card-img-top"  alt=""></div>
                    <div className="card-body">
                            <div className="title-earning">
                                <Link to="/singlenft"className="text-link">
                                    Spherical Harmony
                                </Link>
 
                            </div>
                        <div className="button-claim">
                        </div>
                    </div>
                </div>
        </div>
    )
}