import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Api from '../pages/Common/Api';

export const UserDetailsContext = createContext();

export function UserDetailsProvider({ children }) {

  const [userDetails, setUserDetails] = useState();
  const [theme,setTheme]=useState();
  const [userSignedIn,setUserSignedIn]=useState();


  useEffect(()=>{
    const authToken = Cookies.get('access_token');
    if(authToken){
      Api.get('api/user/check-token-validity', { withCredentials: true }).then((res)=>{
        setUserSignedIn(true);
        let currentUser =JSON.parse(localStorage.getItem('youtube-current-user'));
        setUserDetails(currentUser);
        setTheme(currentUser.extraInfo.theme);
      })
      .catch((err)=>{
        setUserDetails(null);
        setUserSignedIn(false);
        setTheme("light");
        localStorage.removeItem('youtube-current-user');    
      });
    }else{
      setUserDetails(null);
      setUserSignedIn(false);
      setTheme("light");
      localStorage.removeItem('youtube-current-user');    
    }
  },[])


  return (
    <UserDetailsContext.Provider value={{ userDetails,setUserDetails,theme,setTheme,userSignedIn,setUserSignedIn}}>
      {children}
    </UserDetailsContext.Provider>
  );
}
