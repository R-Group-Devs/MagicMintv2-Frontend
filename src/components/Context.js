import axios from "axios";
import React, { createContext, useEffect, useState } from "react";




export const myContext = createContext({});

export default function Context(props){

    const [userObject, setUserObject] = useState();

    console.log(process.env.REACT_APP_BACKEND_URL)

    useEffect (() =>{ 
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/getuser`,{ withCredentials: true}).then(res => {
            console.log(res)
            if (res.data){
                console.log(res)
                setUserObject(res.data)
                localStorage.setItem('profile', JSON.stringify(res.data))
            }
        })
    },[])

    return(
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}