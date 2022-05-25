import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
export const myContext = createContext(null);

const normalizeUser = (user) => ({
  createdNFT: user.createdNFT,
  profileCreated: user.profileCreated,
  twitterId: user.twitterProvider.id,
  twitterPhoto: user.twitterProvider.photo,
  username:  user.twitterProvider.username,
});

export default function Context(props) {
  const [userObject, setUserObject] = useState();

  useEffect(() => {
    axios
      .get(`/getuser`)
      .then((res) => {
        if (res.data) {
          setUserObject(normalizeUser(res.data.user));
        }
      })
      .catch((err) => console.log({ err }));
  }, []);

  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  );
}
