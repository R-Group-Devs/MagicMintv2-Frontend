import React, { useState, useContext, useEffect } from 'react';
import "./CreateCampaign.css"
import Header from '../Navbar/Header';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { createClient } from 'urql'
import axios from 'axios';
import { myContext } from '../Context';


const shellGraphRinkebyURL = 'https://api.thegraph.com/subgraphs/name/r-group-devs/shell-rinkeby'
const query = `
    query {
        collections(first: 5) {
            id
            name
            symbol
            address
            canonicalOwner {
            id 
            address
            }
            canonicalEngine {
            id
            address
            name
            }
            address
        }
}`

function Campaign(){

    let userObject = localStorage.getItem('profile')

    function addHours(date, hours) {
        const newDate = new Date(date);
        newDate.setHours(newDate.getHours() + hours);
        return newDate;
    }

    // form for creating campaign
    const [userNFTPrototype, setUserNFTPrototype] = useState(null);
    const [twitterPostURL, setTwitterPostURL] = useState('');
    const [campaignName, setCampaignName] = useState('');
    const [campaignFormIsValid, setCampaignFormIsValid] = useState(false)
    const [numberOfNFTs, setNumberOfNFTs] = useState('');
    const [collection, setCollection] = useState('');
    const [countOldReshares, setCountOldReshares] = useState(true);
    const [countOldLikes, setCountOldLikes] = useState(false);
    const [campaignBase, setCampaignBase] = useState('likes');
    const [campaignNFTID, setCampaignNftID] = useState('');
    const [endDate, setEndDate] = useState(null);
    const [campaignFormError, setCampaignFormError] = useState(false)
    const [buttonCreateCampaignIsDisabled, setButtonCreateCampaignIsDisabled] = useState('true')
    const [buttonCreateNFTIsDisabled, setButtonCreateNFTIsDisabled] = useState('true')

    //Graph data
    const [graphCollections, setGraphCollection] = useState(null)

    //create campaign success message
    const [successFormModal, setSuccessFormModal] = useState(false);

    // form for creating nft
    const [createNFTModal, setCreateNFTModal] = useState(false);
    const [NFTName, setNFTName] = useState(null)
    const [NFTDesc, setNFTDesc] = useState(null)
    const [NFTFile, setNFTFile] = useState(null)

    let isDisabled = 'disabled'

    //error messages
    let collections = null
    const [numberOfNFTsError, setNumberOfNFTsError] = useState()
    const [campaignNameError, setCampaignNameError] = useState('');
    const [twitterPostURLError, setTwitterPostURLError] = useState('');

    const [optionItems, setOptionItems] = useState('');

    const client = createClient({
        url: shellGraphRinkebyURL
    })

    // querying the graph for collection data
    useEffect( async ()=>{
        const graphdata = await client.query(query).toPromise()
        collections = graphdata.data.collections.map((collection) =>(
            <option key={collection.address} value={collection.address}>{collection.name} - {collection.symbol}</option>
        ))
        console.log(graphdata.data.collections)
        setGraphCollection(collections)
    },[])

    //getting created NFTS
    useEffect(async () =>{
        const protopypess = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/campaign/getNFTPrototype/${userObject.username}`)
        setUserNFTPrototype(protopypess)
        setCampaignNftID(protopypess.data[0].file)
        let items = protopypess.data.map((prototype)  =>
            <option key={prototype.file} value={prototype.file}>{prototype.name}</option>    
        );
        setOptionItems(items)
    },[])

    const onOpenModal = (e) => {
        e.preventDefault();
        setCreateNFTModal(true);
    }
    const onOpenSuccessCampaign = (e) => {
        e.preventDefault();
        setSuccessFormModal(true);
    }
    const onCloseSuccessCampaignModal = () =>{
        setSuccessFormModal(false);
        window.location.href = "/profile"
    } 



    const createNFT = async (e) => {
        e.preventDefault()
        const formData = new FormData();

        const extension = NFTFile.type.split('/')[1];  

        formData.append('image', NFTFile, 'filename.'+ extension);

        formData.append("creator", userObject.username)
        formData.append("file", NFTFile)
        formData.append("name", NFTName)
        formData.append("description", NFTDesc)


        const config = {
            headers: { 'content-type': 'multipart/form-data' }
           }

        axios({
            url:`${process.env.REACT_APP_BACKEND_URL}/api/campaign/createNFT`,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: "application/json",
                type: "formData"
            },
            data: formData
        }).then((res) => {
            alert("NFT created successfully")

            setTimeout(() => {
                window.location.href =  "/createcampaign"
            }, 2000);


        })

    }

    const createCamapignSubmit =  async (e) => {
        e.preventDefault()
        
        const content = {
            campaignCreator: userObject.username,
            twitterPostURL: twitterPostURL,
            campaignName: campaignName,
            campaignNFTID: campaignNFTID,
            numberOfNFTs: numberOfNFTs,
            campaignBase: campaignBase,
            includeResharesBeforeCreation: countOldReshares,
            includeLikesBeforeCreation: countOldLikes,
            endDate: endDate ? endDate : addHours(Date.now(),1)
        }

        if(campaignFormIsValid){
            console.log(content)

        }else {
            setCampaignFormError("Fill in the correct fields")
        }
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/campaign/create`, content)
        if(response.status == 200){
            //campaign successfully created creation successful modal ->  display it under profile
            onOpenSuccessCampaign(e)
        }
    }
    
    const onCloseModal = () => setCreateNFTModal(false);

    if (userObject){
        userObject = userObject ? JSON.parse(userObject) : []
        return(
            <div>
    
            <Header image= {userObject.photos[0].value} username={userObject.username}/>
            <div className='wrapper'>
                <div className='cc-title'>
                    Create a campaign
                </div>
                <div className="form-modal ">
                    <form className="form-box">
                        <div className="form-group">
                            <label htmlFor="twitterHandle">Twitter Handle</label>
                            <input type="text" className="form-control" id="twitterHandle" aria-describedby="twitterHandleDesc" value={userObject.username} disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="postID">Twitter Post URL</label>
                            <input type="text" className="form-control"
                                id="postID" 
                                aria-describedby="twitterHandleDesc" 
                                onChange={(e) => {
                                    const splitable = e.target.value
                                    const splitID = splitable.split('/');
                                    setTwitterPostURL(splitID[5]);
    
                                    let expression =/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                                    let regex = new RegExp(expression);
                                    if(e.target.value.match(regex) && e.target.value.length != 0){
                                        setCampaignFormIsValid(true)
                                        setTwitterPostURLError("")
                                        setButtonCreateCampaignIsDisabled('')
                                    }else{
                                        setTwitterPostURLError("Please enter valid URL")
                                        setCampaignFormIsValid(false)
                                        setButtonCreateCampaignIsDisabled('true')
    
    
                                    }
    
    
                                }}/>
                            <small  className="form-text  text-danger"> {twitterPostURLError}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="campaignName">Campaign Name</label>
                            <input type="text" 
                            className="form-control"
                            aria-describedby="campaignName"
                            value={campaignName}
                            onChange={(e) => {
                                setCampaignName(e.target.value)
                                if(e.target.value.length >15 || e.target.value.length == 0){
                                    setCampaignNameError("Campaign name mustn't be longer then 15 characters")
                                    setCampaignFormIsValid(false)
                                    setButtonCreateCampaignIsDisabled('')
    
                                }else{
                                    setCampaignFormIsValid(true)
                                    setCampaignNameError()
                                    setButtonCreateCampaignIsDisabled('true')
    
    
                                }
                            }} />
                            <small  className="form-text text-danger">{campaignNameError}</small>
    
                        </div>
                        <div className="baseCampaign">
                            <div className="campaign-base-text">Campaign Base</div>
    
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" 
                                    type="radio" 
                                    name="inlineRadioOptions" 
                                    id="inlineRadio1"
                                    value="likes" 
                                    checked="checked"
                                    onChange={(e)=>{
                                        setCampaignBase(e.target.value) 
                                    }}
                                
                                />
                                <label className="form-check-label" htmlFor="inlineRadio1">Likes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions" 
                                    id="inlineRadio2" 
                                    value="reshares"
                                    onChange={(e)=>{
                                        setCampaignBase(e.target.value) 
                                    }}
                                />
                                
                                <label className="form-check-label" htmlFor="inlineRadio2">Reshares</label>
                            </div>
                        </div>
    
                        <div>
                            Choose collection    
                        </div>
                        <div className="form-group">
                        <select className="form-select form-select-md mb-3"
                            onChange={(e) =>{
                                setCollection(e.target.value)
                        }}>
                            {graphCollections}
                        </select>
    
                        </div>
                        <div>
                            Campaign NFT    
                        </div>
                        <small id="" className="form-text text-muted"><button  onClick={onOpenModal} className="add-nft-button">+</button> Add NFT</small>
    
                        <div className="form-group">
                        <select className="form-select form-select-md mb-3"
                            value ={campaignNFTID}
                            onChange={(e) =>{
                                //get nfts where creator is the logged in creator/
                                // the value is the actual id, when clicked store nft ID for the campaign
                                setCampaignNftID(e.target.value)
                                console.log("just target", e.target)
                                console.log("value of changed",e.target.value)
                            }}
                        >
                            {/* <option value="1" selected="selected">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option> */}
                            {optionItems}
                        </select>
    
                        </div>
                        {/* <img src={{/> */}
    
    
                        <div className="form-group">
                            <label htmlFor="numberNFTs">Number of NFTs</label>
                            <input type="text" className="form-control" id="numberNFTs" 
                                aria-describedby="twitterHandleDesc" 
                                value={numberOfNFTs} 
                                onChange={(e) => {
                                    setNumberOfNFTs(e.target.value)
                                    let expressionOnlyNumber = /^\d+$/;
    
                                    let regexOnlyNumber = new RegExp(expressionOnlyNumber);
    
                                    if(e.target.value > 1000  ){
                                        setCampaignFormIsValid(false)
                                        setNumberOfNFTsError("You exceed the number of NFTs! Please enter less than 1000 NFTs")
                                        setButtonCreateCampaignIsDisabled('true')
    
                                    }else if(!e.target.value.match(regexOnlyNumber)){
                                        setNumberOfNFTsError("Please include only numbers")
                                        setButtonCreateCampaignIsDisabled('true')
                                        setCampaignFormIsValid(false)
    
    
                                    }else if(e.target.value == null || e.target.value == 0){
                                        setNumberOfNFTsError("Don't leave the number of NFTs blank")
                                        setButtonCreateCampaignIsDisabled('true')
                                        setCampaignFormIsValid(false)
    
                                    } else{
                                        setCampaignFormIsValid(true)
                                        setNumberOfNFTsError("")
                                        setButtonCreateCampaignIsDisabled('')
                                    }
    
                                }
                                }/>
                                <small  className="form-text  text-danger"> {numberOfNFTsError}</small>
    
                                
                        </div>
    
                        { campaignBase.includes('reshares')
                        ?
                        <div className="form-check">
                        <input className="form-check-input" 
                            type="checkbox" 
                            onChange={(e) => {
                                setCountOldReshares(e.target.checked)
                                console.log(e.target.checked)
                            }}
                            />
                        <label className="form-check-label" >
                            Count old Reshares
                        </label>
                    </div>
                    :           
                    <div className="form-check">
                    <input className="form-check-input" 
                        type="checkbox" 
                        id="count"
                        onChange={(e) => {
                            setCountOldLikes(e.target.checked)
                            console.log(e.target.checked)
                            }}/>
                    <label className="form-check-label" >
                        Count old Likes
                    </label>
                    </div>
                }
                
            
                        <div className="form-group">
                            <label>Campaign Ends in</label>
    
                            <select className="form-select form-select-md mb-3"
                                onChange={(e) =>{
                                    if(e.target.value == 1){
    
                                        setEndDate(addHours(Date.now(),1))
                                        console.log(endDate)
    
                                    }else if(e.target.value == 2){
    
                                        setEndDate(addHours(Date.now(),12))
                                        console.log(endDate)
    
                                    }else if(e.target.value == 3){
                                        setEndDate(addHours(Date.now(),24))
                                        console.log(endDate)
    
                                    }else if(e.target.value == 4){
                                        setEndDate(addHours(Date.now(),168))
                                        console.log(endDate)
                                    }
                                    else{
    
                                    }
                                    console.log(e.target.value)
                                }}>
                                <option value="1">1 hour</option>
                                <option value="2">12 hours</option>
                                <option value="3">1 day</option>
                                <option value="4">1 week</option>
    
                            </select>
                        </div>  
                        <div className='cc-button-div'>
                        <button type="submit" onClick={createCamapignSubmit} className="btn btn-primary cc-btn" disabled={buttonCreateCampaignIsDisabled}>Create Campaign</button>
                        </div>
                    </form>
                </div>
    
                <Modal open={createNFTModal} onClose={onCloseModal} center>
                    <h3>Create NFT</h3>
                    <div className="form-group">
                        <label htmlFor="NFTimage">Choose File</label>
                        <input type="file" 
                        style={{display:"none"}}
                        className="form-control-file" 
                        id="NFTimage" 
                        onChange={(e)=>{
                            console.log(e.target.files[0])
                            setNFTFile(e.target.files[0])
                            if(e.target.files[0] != null){
    
                            }
                            if(e.target.files[0] != null && NFTName!=null && NFTDesc!=null){
                                console.log("aha")
                                setButtonCreateNFTIsDisabled("")
                            }
    
                        }}
                        
                        />
                        {NFTFile ? NFTFile.name : ""}
                    </div>
                    <div className="form-group">
                        <label htmlFor="NFTname">Name</label>
                        <input type="text" 
                            className="form-control"
                            id="NFTname"
                            onChange={(e)=>{
                                console.log(e.target.value)
                                setNFTName(e.target.value)
        
                                if(NFTFile!= null && NFTName!=null && NFTDesc!=null){
                                    console.log("aha")
                                    setButtonCreateNFTIsDisabled("")
                                }
                            }}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="NFTdescription">Description</label>
                        <input type="text" 
                            className="form-control"
                            id="NFTdescription" 
                            onChange={(e)=>{
                                console.log(e.target.value)
                                setNFTDesc(e.target.value)
    
                                if(NFTFile!= null && NFTName!=null && NFTDesc!=null){
                                    console.log("aha")
                                    setButtonCreateNFTIsDisabled("")
                                }
                            }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={createNFT} disabled={buttonCreateNFTIsDisabled}>Create NFT</button>
    
                </Modal>
    
                <Modal open={successFormModal} onClose={onCloseSuccessCampaignModal} center>
                            <div>
                                🎉 
                                Success
                                🎉 
                                <div>
                                    You just created a campaign, check it out and manage your campaign  <a href="/profile">here </a>
                                </div>
    
                            </div>
                </Modal>
                </div>
            </div>
        )

    } else {
        return(
            <div className='not-logged-in'>
                You are not logged in correctly.
                Please head <a href='/auth'> here</a> to login with Twitter and access the app!
            </div>
        )
    }
   
}


export default Campaign;