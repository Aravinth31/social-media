import React from 'react';
import { useContext} from 'react';
import { UserDetailsContext } from '../context/UserContext';
import Api from '../pages/Common/Api';


import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import MusicIcon from '@mui/icons-material/MusicNote';
import MovieIcon from '@mui/icons-material/MovieCreation';
import GamingIcon from '@mui/icons-material/SportsEsports';
import SportsIcon from '@mui/icons-material/EmojiEvents';
import FeedIcon from '@mui/icons-material/Feed';
import LiveIcon from '@mui/icons-material/OnlinePrediction';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagIcon from '@mui/icons-material/Flag';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const LeftNavBar = () => {
  const {userDetails,setUserDetails,theme,setTheme,userSignedIn,setUserSignedIn}=useContext(UserDetailsContext);

  const updateTheme = () => {
    localStorage.setItem('previousLocation', window.location.pathname);
    if(userSignedIn){
      const newTheme = (theme === "light") ? "dark" : "light";
      const body = {
        "extraInfo": {"theme": newTheme}
      }
      Api.put(`/api/user/${userDetails._id}`, body, { withCredentials: true }).then((res)=>{
        if(res.data.status == true){
          localStorage.setItem('youtube-current-user', JSON.stringify(res.data.user))
          setUserDetails(res.data.user);
          setTheme(res.data.user.extraInfo.theme);
        }
      })
      .catch((error) => {
          if(error.response.status == 401){
            window.location.href = '/user/signin';
          }
      });

    }else{
      window.location.href = '/user/signin';
    }
  }

  const handleSignIn = () => {
    localStorage.setItem('previousLocation', window.location.pathname);
    window.location.href = '/user/signin';
  }

  return (
    <div className={`p-2 w-[300px] inline-block ${theme === "light" ? 'text-[#080808]':'bg-[#080808] text-[#d4d0d0]'}`}>      
      <div className='overflow-y-scroll scroll-bar h-[89.8vh] text-[15px]'>

        <div className={`block pb-4 h-[auto] cursor-pointer border-b-2 ${theme === "light" ? 'border-[#e4e3e3]':'border-[#817c7c]'}`}>
          <div >
            <a href="/" className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>    
              <p className='w-1/4 pl-2'><HomeIcon/></p>
              <p className='w-3/4'>Home</p>
            </a>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><ExploreIcon/></p>
            <p className='w-3/4'>Explore</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><SubscriptionsIcon/></p>
            <p className='w-3/4'>Subscriptions</p>
          </div>
        </div>

        <div className={`block pt-4 pb-4 h-[auto] cursor-pointer border-b-2 ${theme === "light" ? 'border-[#e4e3e3]':'border-[#817c7c]'}`}>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><VideoLibraryIcon/></p>
            <p className='w-3/4'>Library</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><HistoryIcon/></p>
            <p className='w-3/4'>History</p>
          </div>
        </div>

        {!userSignedIn &&
            <div className={`block pt-4 pb-4 h-[auto] cursor-pointer border-b-2 ${theme === "light" ? 'border-[#e4e3e3]':'border-[#817c7c]'}`}>
            <p className='pl-4 leading-1 mb-2 cursor-text'>
              Sign in to like videos,comments and subscribe.
            </p>
            <div className='pl-4 text-sky-700'>
              <button onClick={handleSignIn}>
                <p className='border-2 border-sky-700 px-2 py-1 flex justify-center items-center gap-2 cursor-pointer'><AccountCircleIcon/> Sign In</p>
              </button>
            </div>
          </div>
        }

        <div className={`block pt-4 pb-4 h-[auto] cursor-pointer border-b-2 ${theme === "light" ? 'border-[#e4e3e3]':'border-[#817c7c]'}`}>
          <p className='pl-4 text-[18px] cursor-text'>
            BEST OF YOUTUBE
          </p>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><MusicIcon/></p>
            <p className='w-3/4'>Music</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><SportsIcon/></p>
            <p className='w-3/4'>Sports</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><GamingIcon/></p>
            <p className='w-3/4'>Gaming</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><MovieIcon/></p>
            <p className='w-3/4'>Movies</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><FeedIcon/></p>
            <p className='w-3/4'>News</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><LiveIcon/></p>
            <p className='w-3/4'>Live</p>
          </div>
        </div>

        <div className='block pt-4 pb-4 h-[auto] cursor-pointer'>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><SettingsIcon/></p>
            <p className='w-3/4'>Settings</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><FlagIcon/></p>
            <p className='w-3/4'>Report History</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><HelpOutlineIcon/></p>
            <p className='w-3/4'>Help</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === "light" ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`} onClick={updateTheme}>
            <p className='w-1/4 pl-2'><SettingsBrightnessIcon/></p>
            <p className='w-3/4'>Change Theme</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default LeftNavBar;
