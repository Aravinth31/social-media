import React, {useContext, useEffect, useState} from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyIcon from '@mui/icons-material/Reply';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { UserDetailsContext } from '../context/UserContext';
import { json, useParams } from "react-router-dom";
import Api from './Common/Api';
import {ShareSocial} from 'react-share-social';
import CloseIcon from '@mui/icons-material/Close';
import RecommendedVideos from './RecommendedVideos';
import UserComments from '../components/UserComments';


const VideoPreview = () => {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState({});
  const [like, setLike] = useState([]);
  const [disLike, setDisLike] = useState([]);
  const [channelData, setChannelData] = useState({});
  const [showShares, setShowShares] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [allVideos, setAllVideos] = useState([]);

  const {userDetails,setUserDetails,theme,setTheme,userSignedIn,setUserSignedIn}=useContext(UserDetailsContext);

  const style = {
    root: {
      background: '#999999',
      borderRadius: 3,
      border: 0,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      position:'absolute',
      top:'55vh',
      left:'50vw'
  
    },
    copyContainer: {
      border: '1px solid blue',
      background: 'rgb(0,0,0,0.7)'
    },
    title: {
      color: 'aquamarine',
      fontStyle: 'italic'
    }
  };

  useEffect(() => {
    Api.get(`api/video/find/${id}`, { withCredentials: true }).then((res)=>{
      if(res.data.status == true){
        setVideoDetails(res.data.video);
        setLike(res.data.video.likes);
        setDisLike(res.data.video.dislikes);
        setChannelData(res.data.user)
      }
    });

    Api.get(`api/comment/${id}`, { withCredentials: true }).then((res)=>{
      if(res.data.status == true){
        setComments(res.data.comments);
      }
    });

    Api.get('api/video/random', { withCredentials: true }).then((res)=>{
      if(res.data.status == true){
        setAllVideos(res.data.video);
      }
    });

    setTimeout(()=>{
      Api.put(`api/video/views/${id}`, { withCredentials: true }).then((res)=>{
        console.log("video view updtaed successfully..!!");
      });  
    }, 5000);
  },[id]);
  
  const handleVideoLike = () => {
    localStorage.setItem('previousLocation', window.location.pathname);
    if(userSignedIn){
      Api.put(`api/user/like/${id}`, {}, { withCredentials: true }).then((res)=>{
        console.log("video like updated successfully..!!");
        setLike(res.data.video.likes);
        setDisLike(res.data.video.dislikes)
      })
      .catch((err) => {
        console.log("error message : "+err);
      }); 
    }else{
      window.location.href = '/user/signin';
    }

  }

  const handleVideoDislike = () => {
    localStorage.setItem('previousLocation', window.location.pathname);
    if(userSignedIn){
      Api.put(`api/user/dislike/${id}`, {}, { withCredentials: true }).then((res)=>{
        console.log("video dislike updated successfully..!!");
        setLike(res.data.video.likes);
        setDisLike(res.data.video.dislikes);
      })
      .catch((err) => {
        console.log("error message : "+err);
      }); 
    }
    else{
      window.location.href = '/user/signin';
    }
  }

  const handleVideoSave = () => {
    localStorage.setItem('previousLocation', window.location.pathname);
    if(userSignedIn){

    }
    else{
      window.location.href = '/user/signin';
    }
  }

  const getViewsCount = (views) => {
    if(views >= 1000000000){
      return `${Math.floor(views/1000000000)} B`;
    }else if(views >= 1000000){
      return `${Math.floor(views/1000000)} M`;
    }else if(views >= 1000){
      return `${Math.floor(views/1000)} K`;
    }else{
      return  views;
    }
  }

  const handleChannelSubscribe = () => {
    Api.put(`api/user/subscribe/${videoDetails.userId}`, {}, { withCredentials: true }).then((res)=>{
      if(res.data.status == true){
        console.log("User subscribed successfully..!!");
        setChannelData(res.data.channel);
        localStorage.setItem('youtube-current-user', JSON.stringify(res.data.user))
        setUserDetails(res.data.user);
      }
    })
    .catch((err) => {
      console.log("error message : "+err);
    }); 
  }

  const handleChannelUnsubscribe = () => {
    Api.put(`api/user/unsubscribe/${videoDetails.userId}`, {}, { withCredentials: true }).then((res)=>{
      if(res.data.status == true){
        console.log("User unsubscribed successfully..!!");
        setChannelData(res.data.channel);
        localStorage.setItem('youtube-current-user', JSON.stringify(res.data.user))
        setUserDetails(res.data.user);
      }
    })
    .catch((err) => {
      console.log("error message : "+err);
    }); 
  }

  const addNewComment = () => {
    localStorage.setItem('previousLocation', window.location.pathname);
    if(userSignedIn){
      console.log("button clicked.....");
      const body = {
        videoId:id,
        comment:newComment
      }
      Api.post(`api/comment`, body, { withCredentials: true }).then((res)=>{
        if(res.data.status == true){
          Api.get(`api/comment/${id}`, { withCredentials: true }).then((res)=>{
            if(res.data.status == true){
              setComments(res.data.comments);
              setNewComment('');
            }
          });      
        }
      })
      .catch((err) => {
        console.log("error message : "+err);
      });  
    }
    else{
      window.location.href = '/user/signin';
    }
  }

  const onVideoClicked = (e) => {
    const videoId = e.target.getAttribute('data-video-id');
    window.location.href = `/video/${videoId}`;
  }


  return (
    <div className={`flex justify-center h-[864px] overflow-y-scroll scroll-bar pt-8 ${theme === "light" ? 'text-[#080808]':'bg-[#080808] text-[#d4d0d0]'}`}>
      <div className='w-[1100px] h-[790px] inline-block m-10 mt-0 overflow-y-scroll scroll-bar'>
          <div className='w-full h-[630px] p-2'>
            <video controls crossOrigin="anonymous" autoPlay muted loop src={videoDetails.videoUrl} className='h-[605px] w-full rounded-[30px] border-2 overflow-hidden'></video>
          </div>
          <div className='flex flex-col w-full h-[100px]'>
            <div className='flex flex-1 items-center pl-2 font-bold'>
            {videoDetails.title}
            </div>
            <div className='flex flex-1 items-center justify-between p-2'>
              <div className='flex flex-row items-center gap-3'>
                <div className='w-[45px] h-[45px] rounded-full'>
                  <img className="w-[45px] h-[45px] rounded-full border-2 border-[#ff1818]" alt="" src={channelData.img}/>
                </div>
                <div>
                  <p>{channelData.name}</p>
                  <p>{getViewsCount(channelData.subscribers)} subscribers</p>
                </div>
              </div>
              <div className={`flex flex-row gap-2 pr-5 ${theme === "light" ? 'text-[#080808]':'text-[#ddd9d9]'}`}>
                <div className={`flex flex-row w-[110px]  h-[40px] rounded-full ${theme === "light" ? 'bg-[#e9e4e4]':'bg-[#969090]'}`} onClick={handleVideoLike}>
                  <button className='flex-1 flex flex-row justify-center items-center gap-1'>
                    {like.length}
                    <ThumbUpIcon/> 
                    <p>Like</p>
                  </button>
                </div>
                <div className={`flex flex-row w-[110px]  h-[40px] rounded-full ${theme === "light" ? 'bg-[#e9e4e4]':'bg-[#969090]'}`} onClick={handleVideoDislike}>
                  <button className='flex-1 flex flex-row justify-center items-center gap-1'>
                    {disLike.length}
                    <ThumbDownIcon/> 
                    <p>Dislike</p>
                  </button>
                </div>
                <div className={`flex flex-row w-[110px]  h-[40px] rounded-full ${theme === "light" ? 'bg-[#e9e4e4]':'bg-[#969090]'}`}>
                  <button className='flex-1 flex flex-row justify-center items-center gap-1' onClick={() => setShowShares(true)}>
                    <ReplyIcon/> 
                    <p>Share</p>
                    </button>
                </div>
                {showShares &&
                  <div>
                    <button onClick={() => setShowShares(false)} className='absolute top-[58vh] left-[72.5vw] text-[#ffff] z-10'>
                      <CloseIcon/>
                    </button>
                    <ShareSocial 
                      url ={window.location.href}
                      socialTypes= {['facebook','twitter', 'whatsapp', 'telegram']}
                      onSocialButtonClicked={ data => console.log(data)}
                      style={style}
                    />                     
                  </div>
                }
                <div className={`flex flex-row w-[110px]  h-[40px] rounded-full ${theme === "light" ? 'bg-[#e9e4e4]':'bg-[#969090]'}`} onClick={handleVideoSave}>
                  <button className='flex-1 flex flex-row justify-center items-center gap-1'>
                    <BookmarksIcon/> 
                    <p>Save</p>
                    </button>
                </div>
                {userDetails && userDetails.subscribedUsers && videoDetails.userId != userDetails._id && userDetails.subscribedUsers.indexOf(videoDetails.userId) !== -1 &&
                  <div className={`flex flex-row w-[110px]  h-[40px] rounded-full ${theme === "light" ? 'bg-[#e9e4e4]':'bg-[#969090]'}`}>
                    <button className='flex-1 flex flex-row justify-center items-center gap-1 rounded-full bg-[#fe4747] font-bold' onClick={handleChannelUnsubscribe}>
                      <p>Unsubscribe</p>
                    </button>
                  </div>
                }
                {userDetails && userDetails.subscribedUsers && videoDetails.userId != userDetails._id && userDetails.subscribedUsers.indexOf(videoDetails.userId) === -1 &&
                  <div className={`flex flex-row w-[110px]  h-[40px] rounded-full ${theme === "light" ? 'bg-[#e9e4e4]':'bg-[#969090]'}`}>
                    <button className='flex-1 flex flex-row justify-center items-center gap-1 rounded-full bg-[#2ea128] font-bold' onClick={handleChannelSubscribe}>
                      <p>Subscribe</p>
                    </button>
                  </div>
                }
              </div>
            </div>
            <hr></hr>
          </div>
          <div className={`w-full h-[120px] flex border-b-2`}>
            <div className='flex w-[7%] justify-end items-center'>
                <img src={userDetails? userDetails.img : "https://my-you-tube.s3.ap-southeast-2.amazonaws.com/default_profile_pic.png"} alt="" className='w-[50px] h-[50px] rounded-full'/>
            </div>
            <div className='flex w-[83%] justify-center px-10 items-center'>
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder='Add a new comment...' className={`w-full border-b-2 focus:outline-none bg-[#edeaea] px-5 py-2 ${theme === "light" ? 'text-[#080808]':'text-[#dcd6d6] bg-[#535151]'}`}/>
            </div>
            <div className={`flex justify-center items-center w-[10%] ${theme === "light" ? 'text-[#080808]':'text-[#080808]'}`}>
                <button className='bg-[#17e45e] w-[80%] h-[40%] rounded-full' onClick={addNewComment}>save</button>
            </div>
          </div>
          {
            comments.map((comment) => {
              console.log("-------------- comments : "+JSON.stringify(comment));
              const userData = comment.userDetails[0];
              return <UserComments
                key={comment._id}
                comment={comment}
                userData={userData}
                videoOwner={videoDetails.userId}
                videoId={id}
                setComments={setComments}
              />
            })
          }
      </div>
      <div className='inline-block w-[400px] ml-0 mt-0 m-10 h-auto overflow-y-scroll scroll-bar'>
        <div className='text-[22px] p-2 font-dela font-bold underline '>
          Recommended Videos
        </div>
        {
          allVideos.map((video) => {
            const userData = video.userDetails[0];
            return <RecommendedVideos
              key={video._id}
              video={video}
              userData={userData}
              onVideoClicked={onVideoClicked}
            />
          })
        }
      </div>
    </div>
  )
}

export default VideoPreview;
