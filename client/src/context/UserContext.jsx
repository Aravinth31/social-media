import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const UserDetailsContext = createContext();

export function UserDetailsProvider({ children }) {

  const [userDetails, setUserDetails] = useState();
  const [theme,setTheme]=useState();
  const [userSignedIn,setUserSignedIn]=useState();


  useEffect(()=>{
    const authToken = Cookies.get('access_token');
    if(authToken){
      setUserSignedIn(true);
      let currentUser =JSON.parse(localStorage.getItem('youtube-current-user'));
      setUserDetails(currentUser);
      setTheme(currentUser.extraInfo.theme);
    }else{
      setUserSignedIn(false);
      setTheme("light");
    }
  },[])


  return (
    <UserDetailsContext.Provider value={{ userDetails,setUserDetails,theme,setTheme,userSignedIn,setUserSignedIn}}>
      {children}
    </UserDetailsContext.Provider>
  );
}
