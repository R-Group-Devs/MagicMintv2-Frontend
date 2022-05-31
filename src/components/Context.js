import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
export const myContext = createContext(null);

export default function Context(props) {
  const [user, setUser] = useState(null);
  const [isUserLoading, setUserLoading] = useState({
    timeout: true,
    fetch: true
  });

  useEffect(() => {
    axios
      .get(`/getuser`)
      .then((res) => {
        if (res.data) {
          setUser(res.data.user);
        }
      })
      .catch((err) => console.log({ err }))
      .finally(() => setUserLoading((prevState) => ({...prevState, fetch: false})));
      const userLoadingTimeout = setTimeout(() => setUserLoading((prevState) => ({...prevState, timeout: false})), [1200]);
      return () => clearTimeout(userLoadingTimeout);
  }, []);

  return (
    <myContext.Provider value={{ user, setUser,isUserLoading: isUserLoading.timeout || isUserLoading.fetch }}>
      {props.children}
    </myContext.Provider>
  );
}
