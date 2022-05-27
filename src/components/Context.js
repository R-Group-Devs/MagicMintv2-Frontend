import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
export const myContext = createContext(null);

export default function Context(props) {
  const [userObject, setUserObject] = useState();

  useEffect(() => {
    axios
      .get(`/getuser`)
      .then((res) => {
        if (res.data) {
          setUserObject(res.data.user);
        }
      })
      .catch((err) => console.log({ err }));
  }, []);

  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  );
}
