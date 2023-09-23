import Api from '../pages/Common/Api';
import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const UserDetailsContext = createContext();

export function UserDetailsProvider({ children }) {
  const [userDetails, setUserDetails] = useState();

  const [theme,setTheme]=useState();

  const [userSignedIn,setUserSignedIn]=useState();


  useEffect(()=>{
    // let userId=localStorage.getItem('userId');
    const authToken = Cookies.get('access_token');
    authToken ? setUserSignedIn(true): setUserSignedIn(false);

    // const user = {
    //   "name":"aravinth",
    //   "password":"12345"
    // }
    // Api.post("/api/user/signin", user).then((res)=>{
    //   console.log("user sigin in response : " + JSON.stringify(res.data));
    //   console.log("user sigin in response headers: " + JSON.stringify(res));
    // })
    // Api.get("/api/user/find/64a69d55b7797ca606b31e79").then((res)=>{
    //   console.log("userDetails " + JSON.stringify(res.data.user.extraInfo.theme));
    //   if(res.data.user.extraInfo.theme){
    //     setTheme(res.data.user.extraInfo.theme)
    //   }
    //   // setTheme("dark")
    //   setUserDetails(res.data)
    // });
  },[])


  return (
    <UserDetailsContext.Provider value={{ userDetails,setUserDetails,theme,setTheme,userSignedIn,setUserSignedIn}}>
      {children}
    </UserDetailsContext.Provider>
  );
}
