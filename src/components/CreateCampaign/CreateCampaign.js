import React, { useState, useContext, useEffect, useRef, useMemo } from 'react';
import './CreateCampaign.css';
import Header from '../Navbar/Header';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { createClient } from 'urql';
import axios from 'axios';
import { myContext } from '../Context';
import { useNavigate } from 'react-router-dom';
import TweetsCards from './TweetsCards';
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';
import DateTimePicker from 'react-datetime-picker';

const shellGraphRinkebyURL =
  'https://api.thegraph.com/subgraphs/name/r-group-devs/shell-rinkeby';
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
}`;

function Campaign() {
  const userObject = useContext(myContext);
  const navigate = useNavigate();
  function addHours(date, hours) {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    return newDate;
  }
  const nftFileRef = useRef(null);
  // form for creating campaign
  const [userNFTPrototype, setUserNFTPrototype] = useState([]);
  const [twitterPost, setTwitterPost] = useState({
    id: null,
    url: '',
  });
  const [campaignName, setCampaignName] = useState('');
  const [campaignFormIsValid, setCampaignFormIsValid] = useState(false);
  const [numberOfNFTs, setNumberOfNFTs] = useState('');
  const [countOldReshares, setCountOldReshares] = useState(true);
  const [countOldLikes, setCountOldLikes] = useState(true);
  const [campaignBase, setCampaignBase] = useState('likes');
  const [campaignNFTID, setCampaignNftID] = useState('');
  const [endDate, setEndDate] = useState(
    new Date(new Date().setHours(new Date().getHours() + 1))
  );
  const [campaignFormError, setCampaignFormError] = useState(false);
  const [buttonCreateCampaignIsDisabled, setButtonCreateCampaignIsDisabled] =
    useState('true');
  const [buttonCreateNFTIsDisabled, setButtonCreateNFTIsDisabled] =
    useState(true);

  //Graph data
  const [graphCollection, setGraphCollection] = useState([]);
  const [collectionAddress, setCollectionAddress] = useState('');

  //create campaign success message
  const [successFormModal, setSuccessFormModal] = useState(false);

  // form for creating nft
  const [createNFTModal, setCreateNFTModal] = useState(false);
  const [selectTweetModal, setSelectTweetModal] = useState(false);
  const [NFTName, setNFTName] = useState('');
  const [NFTDesc, setNFTDesc] = useState('');
  const [NFTFile, setNFTFile] = useState(null);

  let isDisabled = 'disabled';

  //error messages
  let collections = null;
  const [numberOfNFTsError, setNumberOfNFTsError] = useState();
  const [campaignNameError, setCampaignNameError] = useState('');
  const [twitterPostURLError, setTwitterPostURLError] = useState('');

  const client = createClient({
    url: shellGraphRinkebyURL,
  });

  // querying the graph for collection data
  useEffect(async () => {
    const graphdata = await client.query(query).toPromise();
    setGraphCollection(graphdata?.data?.collections ?? []);
  }, []);

  //getting created NFTS
  useEffect(async () => {
    if (!userObject) return;
    const prototypess = await axios.get(
      `/api/campaign/getNFTPrototype/${userObject.username}`
    );
    setUserNFTPrototype(prototypess?.data ?? []);
  }, [userObject]);

  const [myTweets, setMyTweets] = useState(
    {
      areLoading: true,
      tweets: [],
    },
    []
  );
  useEffect(() => {
    axios
      .get('/getMyTweets')
      .then((res) => {
        setMyTweets({
          areLoading: false,
          tweets: res.data,
        });
      })
      .catch((err) => {
        setMyTweets({
          areLoading: false,
          tweets: [],
        });
      });
  }, []);

  const onOpenModal = (e) => {
    e.preventDefault();
    setCreateNFTModal(true);
  };
  const onOpenSuccessCampaign = (e) => {
    e.preventDefault();
    setSuccessFormModal(true);
  };
  const onCloseSuccessCampaignModal = () => {
    setSuccessFormModal(false);
    navigate('/profile');
  };

  const createNFT = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('file', NFTFile);
    formData.append('name', NFTName);
    formData.append('description', NFTDesc);
    
    axios.post('/api/campaign/createNFT', formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        type: 'formData',
      }
    }, ).then((res) => {
      alert('NFT created successfully');
      setCreateNFTModal(false);
      setUserNFTPrototype((prevState) => [...prevState, res.data]);
    }).catch((err) => console.log(err))
  };
  console.log(endDate);
  const createCamapignSubmit = async (e) => {
    e.preventDefault();

    const content = {
      twitterPostID: twitterPost.id,
      campaignName: campaignName,
      campaignNFTID: campaignNFTID,
      collectionAddress: collectionAddress,
      numberOfNFTs: numberOfNFTs,
      campaignBase: campaignBase,
      includeResharesBeforeCreation: countOldReshares,
      includeLikesBeforeCreation: countOldLikes,
      endDate: endDate,
    };

    if (campaignFormIsValid) {
      console.log(content);
    } else {
      setCampaignFormError('Fill in the correct fields');
    }
    const response = await axios.post(`/api/campaign/create`, content);
    if (response.status == 200) {
      //campaign successfully created creation successful modal ->  display it under profile
      onOpenSuccessCampaign(e);
    }
  };

  const onCloseModal = () => setCreateNFTModal(false);

  const onTweetCardClick = (tweetId, tweetUrl) => {
    setTwitterPost({
      id: tweetId,
      url: tweetUrl,
    });
    setSelectTweetModal(false);
  };

  const nftImage = useMemo(() => {
    if(!NFTFile) return null;
    return URL.createObjectURL(NFTFile);
  }, [NFTFile]);

  if (userObject) {
    return (
      <div>
        <Header
          image={userObject.twitterPhoto}
          username={userObject.username}
        />
        <div className='wrapper'>
          <div className='cc-title'>Create a campaign</div>
          <div className='form-modal '>
            <form className='form-box'>
              <div className='form-group' style={{ marginBottom: '40px' }}>
                <label htmlFor='twitterHandle'>Twitter Handle</label>
                <input
                  type='text'
                  className='form-control'
                  id='twitterHandle'
                  aria-describedby='twitterHandleDesc'
                  value={userObject.username}
                  disabled
                />
              </div>
              <div
                className=''
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '20px',
                }}
              >
                <button
                  className='open-tweets-btn'
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectTweetModal(true);
                  }}
                >
                  Select Tweet
                </button>
                <small className='form-text text-danger'>
                  {' '}
                  {twitterPostURLError}
                </small>
                {twitterPost.id && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <span>Selected tweet:</span>{' '}
                    <a
                      href={twitterPost.url}
                      style={{ textDecoration: 'none' }}
                      target='_blank'
                    >
                      <b>{twitterPost.url}</b>
                    </a>
                  </div>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='campaignName'>Campaign Name</label>
                <input
                  type='text'
                  className='form-control'
                  aria-describedby='campaignName'
                  value={campaignName}
                  onChange={(e) => {
                    setCampaignName(e.target.value);
                    if (
                      e.target.value.length > 15 ||
                      e.target.value.length == 0
                    ) {
                      setCampaignNameError(
                        "Campaign name mustn't be longer then 15 characters"
                      );
                      setCampaignFormIsValid(false);
                      setButtonCreateCampaignIsDisabled('');
                    } else {
                      setCampaignFormIsValid(true);
                      setCampaignNameError();
                      setButtonCreateCampaignIsDisabled('true');
                    }
                  }}
                />
                <small className='form-text text-danger'>
                  {campaignNameError}
                </small>
              </div>
              <div className='baseCampaign'>
                <div className='campaign-base-text'>Campaign Base</div>

                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='inlineRadioOptions'
                    id='inlineRadio1'
                    value='likes'
                    checked={campaignBase === 'likes'}
                    onChange={(e) => {
                      setCampaignBase(e.target.value);
                    }}
                  />
                  <label className='form-check-label' htmlFor='inlineRadio1'>
                    Likes
                  </label>
                </div>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='inlineRadioOptions'
                    id='inlineRadio2'
                    value='reshares'
                    checked={campaignBase === 'reshares'}
                    onChange={(e) => {
                      setCampaignBase(e.target.value);
                    }}
                  />

                  <label className='form-check-label' htmlFor='inlineRadio2'>
                    Reshares
                  </label>
                </div>
              </div>
              <div>
                <div>Choose collection</div>
                <div className='form-group'>
                  <select
                    className='form-select form-select-md mb-3'
                    value={collectionAddress}
                    onChange={(e) => {
                      setCollectionAddress(e.target.value);
                    }}
                  >
                    <option value=''>
                      None
                    </option>
                    {graphCollection.map((collection) => (
                      <option
                        key={collection.address}
                        value={collection.address}
                      >
                        {collection.name} - {collection.symbol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>Campaign NFT</div>
              <small id='' className='form-text text-muted'>
                <button onClick={onOpenModal} className='add-nft-button'>
                  +
                </button>{' '}
                Add NFT
              </small>

              <div className='form-group'>
                <select
                  className='form-select form-select-md mb-3'
                  value={campaignNFTID}
                  onChange={(e) => {
                    //get nfts where creator is the logged in creator/
                    // the value is the actual id, when clicked store nft ID for the campaign
                    setCampaignNftID(e.target.value);
                  }}
                >
                  <option value=''>None</option>
                  {userNFTPrototype.map((prototype) => (
                    <option key={prototype._id} value={prototype._id}>
                      {prototype.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* <img src={{/> */}

              <div className='form-group'>
                <label htmlFor='numberNFTs'>Number of NFTs</label>
                <input
                  type='number'
                  className='form-control'
                  id='numberNFTs'
                  aria-describedby='twitterHandleDesc'
                  value={numberOfNFTs}
                  onChange={(e) => {
                    setNumberOfNFTs(e.target.value);
                    const newVal = parseInt(e.target.value);
                    if (isNaN(newVal) || newVal === 0) {
                      setNumberOfNFTsError(
                        "Don't leave the number of NFTs blank"
                      );
                      setButtonCreateCampaignIsDisabled('true');
                      setCampaignFormIsValid(false);
                    } else if (newVal > 1000) {
                      setCampaignFormIsValid(false);
                      setNumberOfNFTsError(
                        'You exceed the number of NFTs! Please enter less than 1000 NFTs'
                      );
                      setButtonCreateCampaignIsDisabled('true');
                    } else {
                      setCampaignFormIsValid(true);
                      setNumberOfNFTsError('');
                      setButtonCreateCampaignIsDisabled('');
                    }
                  }}
                />
                <small className='form-text  text-danger'>
                  {' '}
                  {numberOfNFTsError}
                </small>
              </div>

              {campaignBase.includes('reshares') ? (
                <div className='form-check count-old'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    checked={countOldReshares}
                    onChange={(e) => {
                      setCountOldReshares(e.target.checked);
                    }}
                  />
                  <label className='form-check-label'>Count old Reshares</label>
                </div>
              ) : (
                <div className='form-check count-old'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='count'
                    checked={countOldLikes}
                    onChange={(e) => {
                      setCountOldLikes(e.target.checked);
                    }}
                  />
                  <label className='form-check-label'>Count old Likes</label>
                </div>
              )}

              <div className='form-group'>
                <label>Campaign Ends on</label>
                <br></br>
                <DateTimePicker value={endDate} onChange={setEndDate} />
              </div>
              <div className='cc-button-div'>
                <button
                  type='submit'
                  onClick={createCamapignSubmit}
                  className='btn btn-primary cc-btn'
                  disabled={buttonCreateCampaignIsDisabled}
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>

          <Modal open={createNFTModal} onClose={onCloseModal} center>
            <h3 className='mb-3'>Create NFT</h3>
            <div className='createNft'>
              <div className='createNft-left'>
                <input
                  type='file'
                  id='file'
                  name='imageName'
                  ref={nftFileRef}
                  className='nft-input'
                  onChange={(e) => {
                    const newFile = e.target.files[0];
                    if (newFile) {
                      setNFTFile(newFile);
                      if (NFTName !== '' && NFTDesc !== '') {
                        setButtonCreateNFTIsDisabled(false);
                      }
                    } else {
                      setButtonCreateNFTIsDisabled(true);
                    }
                  }}
                  accept='.png,.jpg,.jpeg'
                />
                <div
                  className='createNft-image-placeholder'
                  onClick={() => nftFileRef?.current?.click()}
                >
                  {NFTFile ? (
                    <img className='createNft-image' src={nftImage} />
                  ) : (
                    <AddIcon className='icon-add' />
                  )}
                </div>
              </div>
              <div className='createNft-right'>
                <div className='form-group'>
                  <label htmlFor='NFTname'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id='NFTname'
                    value={NFTName}
                    onChange={(e) => {
                      const newVal = e.target.value;
                      setNFTName(newVal);

                      if (NFTFile !== null && newVal !== '' && NFTDesc !== '') {
                        setButtonCreateNFTIsDisabled(false);
                      } else {
                        setButtonCreateNFTIsDisabled(true);
                      }
                    }}
                  />
                </div>
                <div className='form-group  mb-0'>
                  <label htmlFor='NFTdescription'>Description</label>
                  <textarea
                    type='text'
                    className='form-control nftDescription'
                    id='NFTdescription'
                    value={NFTDesc}
                    onChange={(e) => {
                      const newVal = e.target.value;
                      setNFTDesc(newVal);
                      if (NFTFile !== null && NFTName !== '' && newVal !== '') {
                        setButtonCreateNFTIsDisabled(false);
                      } else {
                        setButtonCreateNFTIsDisabled(true);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-lg mt-4 createNft-button '
              onClick={createNFT}
              disabled={buttonCreateNFTIsDisabled}
            >
              Create NFT
            </button>
          </Modal>

          <Modal
            open={successFormModal}
            onClose={onCloseSuccessCampaignModal}
            center
          >
            <div>
              🎉 Success 🎉
              <div>
                You just created a campaign, check it out and manage your
                campaign <a href='/profile'>here </a>
              </div>
            </div>
          </Modal>
          <Modal
            open={selectTweetModal}
            center
            onClose={() => setSelectTweetModal(false)}
            onOverlayClick={() => setSelectTweetModal(false)}
          >
            <TweetsCards
              tweets={myTweets.tweets}
              onTweetCardClick={onTweetCardClick}
            />
          </Modal>
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

export default Campaign;
