import React, {useContext, useEffect, useState} from 'react';
import { UserDetailsContext } from '../context/UserContext';
import {useNavigate } from "react-router-dom";
import Api from '../pages/Common/Api';
import VideoCards from '../pages/VideoCards';

const HomePage = () => {
  const navigate=useNavigate();
  const [allVideos, setAllVideos] = useState([]);
  const {userDetails,setUserDetails,theme,setTheme,userSignedIn,setUserSignedIn}=useContext(UserDetailsContext);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const searchData = urlSearchParams.get("search");


  useEffect(() => {
    if(searchData){
      Api.get(`api/video/search?q=${searchData}`, { withCredentials: true }).then((res)=>{
        if(res.data.status == true){
          setAllVideos(res.data.video);
        }
      });  
    }else{
      Api.get('api/video/random', { withCredentials: true }).then((res)=>{
        if(res.data.status == true){
          setAllVideos(res.data.video)
        }
      });
    }
  },[]);

  const onVideoClicked = (e) => {
    const videoId = e.target.getAttribute('data-video-id');
    console.log(e.target);
    console.log("video clicked : " + videoId);
    navigate(`/video/${videoId}`);
  }

  return (
    <div className={`h-[91.5vh] left-[300px] p-4 pl-8 flex flex-row flex-wrap gap-x-10 gap-y-16 overflow-y-scroll scroll-bar w-[1620px] float-right ${theme === "light" ? 'text-[#080808]':'bg-[#080808] text-[#d4d0d0]'}`}>
      {
        allVideos.map( (video) => {
            console.log("videos : "+JSON.stringify(video));
            const userData = video.userDetails[0];
            return <VideoCards
                key={video._id}
                video={video}
                userData={userData}
                onVideoClicked={onVideoClicked}
            />;  
        })
      }
    </div>
  )
}

export default HomePage;
