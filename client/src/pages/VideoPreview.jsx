import React, {useContext} from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyIcon from '@mui/icons-material/Reply';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { UserDetailsContext } from '../context/UserContext';

const VideoPreview = () => {
  const {userDetails,setUserDetails,theme,setTheme,userSignedIn,setUserSignedIn}=useContext(UserDetailsContext);

  const handleVideoLike = () => {
    localStorage.setItem('previousLocation', window.location.pathname);
    if(userSignedIn){

    }else{
      window.location.href = '/user/signin';
    }

  }

  const handleVideoDislike = () => {
    localStorage.setItem('previousLocation', window.location.pathname);
    if(userSignedIn){

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


  return (
    <div className={`flex justify-center h-[864px] overflow-y-scroll scroll-bar pt-8 ${theme === "light" ? 'text-[#080808]':'bg-[#080808] text-[#d4d0d0]'}`}>
      <div className='w-[1100px] h-[750px] inline-block m-10 mt-0 overflow-y-scroll scroll-bar'>
          <div className='w-full h-[630px] p-2'>
            <video controls crossOrigin="anonymous" autoPlay muted loop src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" className='h-[605px] rounded-[30px] border-2 overflow-hidden'></video>
          </div>
          <div className='flex flex-col w-full h-[100px]'>
            <div className='flex flex-1 items-center pl-2'>
            Tamil love song 💥 Morning vibes song 💥 tamil EFX song 💥 #tamilsong
            </div>
            <div className='flex flex-1 items-center justify-between p-2'>
              <div className='flex flex-row items-center gap-3'>
                <div className='w-[45px] h-[45px] rounded-full'>
                  <img className="w-[45px] h-[45px] rounded-full border-2 border-[#ff1818]" alt="" src="data:image/png;base64,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"/>
                </div>
                <div>
                  <p>Gk Explorer</p>
                  <p>33.7K subscribers</p>
                </div>
              </div>
              <div className={`flex flex-row gap-2 pr-5 ${theme === "light" ? 'text-[#080808]':'text-[#ddd9d9]'}`} onClick={handleVideoLike}>
                <div className={`flex flex-row w-[110px]  h-[40px] rounded-full ${theme === "light" ? 'bg-[#e9e4e4]':'bg-[#969090]'}`}>
                  <button className='flex-1 flex flex-row justify-center items-center gap-1'>
                    <ThumbUpIcon/> 
                    <p>Like</p>
                    </button>
                </div>
                <div className={`flex flex-row w-[110px]  h-[40px] rounded-full ${theme === "light" ? 'bg-[#e9e4e4]':'bg-[#969090]'}`} onClick={handleVideoDislike}>
                  <button className='flex-1 flex flex-row justify-center items-center gap-1'>
                    <ThumbDownIcon/> 
                    <p>Dislike</p>
                    </button>
                </div>
                <div className={`flex flex-row w-[110px]  h-[40px] rounded-full ${theme === "light" ? 'bg-[#e9e4e4]':'bg-[#969090]'}`}>
                  <button className='flex-1 flex flex-row justify-center items-center gap-1'>
                    <ReplyIcon/> 
                    <p>Share</p>
                    </button>
                </div>
                <div className={`flex flex-row w-[110px]  h-[40px] rounded-full ${theme === "light" ? 'bg-[#e9e4e4]':'bg-[#969090]'}`} onClick={handleVideoSave}>
                  <button className='flex-1 flex flex-row justify-center items-center gap-1'>
                    <BookmarksIcon/> 
                    <p>Save</p>
                    </button>
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
      </div>
      <div className='border-2  bg-[#e42323] inline-block w-[400px] ml-0 mt-0 m-10 h-auto overflow-y-scroll scroll-bar'>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
            <p>recommendation</p>
      </div>
    </div>
  )
}

export default VideoPreview;
