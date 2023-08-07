import React, { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MenuIcon from '@mui/icons-material/Menu';

import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
// import WatchLaterIcon from '@mui/icons-material/WatchLater';
// import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
// import LikeIcon from '@mui/icons-material/ThumbUpOffAlt';
// import BrowseChannelIcon from '@mui/icons-material/AddCircleOutline';
// import TrendingIcon from '@mui/icons-material/Whatshot';
// import ShoppingIcon from '@mui/icons-material/LocalMall';
import MusicIcon from '@mui/icons-material/MusicNote';
import MovieIcon from '@mui/icons-material/MovieCreation';
import GamingIcon from '@mui/icons-material/SportsEsports';
import SportsIcon from '@mui/icons-material/EmojiEvents';
import FeedIcon from '@mui/icons-material/Feed';
import LiveIcon from '@mui/icons-material/OnlinePrediction';
// import BulbIcon from '@mui/icons-material/Lightbulb';
// import DressIcon from '@mui/icons-material/Checkroom';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagIcon from '@mui/icons-material/Flag';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import FeedbackIcon from '@mui/icons-material/Feedback';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { light } from '@mui/material/styles/createPalette';


const LeftNavBar = () => {

  const [theme, setTheme] = useState('light');

  return (
    <div className={`p-2 h-[100vh] w-[300px] sticky top-0 ${theme === 'light' ? 'text-[#080808]':'bg-[#080808] text-[#d4d0d0]'}`}>
      <div className='flex h-[65px] justify-around items-center text-[20px] '>
          <MenuIcon/>
        <div className='flex gap-x-1'>
          <p className='text-[#f82626] scale-[1.3]'><YouTubeIcon/></p>
          <p className='pr-10'>YouTube</p>
        </div>
      </div>
      
      <div className='overflow-y-scroll scroll-bar h-[92vh] text-[15px]'>

        <div className={`block pb-4 h-[auto] border-b-2 ${theme === 'light' ? 'border-[#e4e3e3]':'border-[#817c7c]'}`}>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><HomeIcon/></p>
            <p className='w-3/4'>Home</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><ExploreIcon/></p>
            <p className='w-3/4'>Explore</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><SubscriptionsIcon/></p>
            <p className='w-3/4'>Subscriptions</p>
          </div>
        </div>

        <div className={`block pt-4 pb-4 h-[auto] border-b-2 ${theme === 'light' ? 'border-[#e4e3e3]':'border-[#817c7c]'}`}>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><VideoLibraryIcon/></p>
            <p className='w-3/4'>Library</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><HistoryIcon/></p>
            <p className='w-3/4'>History</p>
          </div>
          {/* <div className='flex p-2 gap-x-2 hover:bg-[#f2f2f2] hover:rounded-[15px] hover:text-sky-700'>
            <p className='w-1/4 pl-2'><WatchLaterIcon/></p>
            <p className='w-3/4'>Watch Later</p>
          </div>
          <div className='flex p-2 gap-x-2 hover:bg-[#f2f2f2] hover:rounded-[15px] hover:text-sky-700'>
            <p className='w-1/4 pl-2'><PlaylistPlayIcon/></p>
            <p className='w-3/4'>PlaylistPlay</p>
          </div>
          <div className='flex p-2 gap-x-2 hover:bg-[#f2f2f2] hover:rounded-[15px] hover:text-sky-700'>
            <p className='w-1/4 pl-2'><LikeIcon/></p>
            <p className='w-3/4'>Liked Videos</p>
          </div> */}
        </div>

        <div className={`block pt-4 pb-4 h-[auto] border-b-2 ${theme === 'light' ? 'border-[#e4e3e3]':'border-[#817c7c]'}`}>
          <p className='pl-4 leading-1 mb-2'>
            Sign in to like videos,comments and subscribe.
          </p>
          <div className='pl-4 text-sky-700'>
            <button className='border-2 border-sky-700 px-2 py-1 flex justify-center items-center gap-2 cursor-pointer'>
              <AccountCircleIcon/>
              Sign In
            </button>
          </div>
        </div>

        {/* <div className='block pt-4 pb-4 h-[auto] border-b-2 border-[#e4e3e3]'>
          <p className='pl-4 text-[18px]'>
            Subscriptions
          </p>
          <div className='flex p-2 gap-x-2 hover:bg-[#f2f2f2] hover:rounded-[15px] hover:text-sky-700'>
            <p className='w-1/4 pl-2'><BrowseChannelIcon/></p>
            <p className='w-3/4'>Browse Channels</p>
          </div>
        </div> */}


        <div className={`block pt-4 pb-4 h-[auto] border-b-2 ${theme === 'light' ? 'border-[#e4e3e3]':'border-[#817c7c]'}`}>
          <p className='pl-4 text-[18px]'>
            BEST OF YOUTUBE
          </p>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><MusicIcon/></p>
            <p className='w-3/4'>Music</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><SportsIcon/></p>
            <p className='w-3/4'>Sports</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><GamingIcon/></p>
            <p className='w-3/4'>Gaming</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><MovieIcon/></p>
            <p className='w-3/4'>Movies</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><FeedIcon/></p>
            <p className='w-3/4'>News</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><LiveIcon/></p>
            <p className='w-3/4'>Live</p>
          </div>
          {/* <div className='flex p-2 gap-x-2 hover:bg-[#f2f2f2] hover:rounded-[15px] hover:text-sky-700 hover:stroke-1'>
            <p className='w-1/4 pl-2'><TrendingIcon/></p>
            <p className='w-3/4'>Trending</p>
          </div>
          <div className='flex p-2 gap-x-2 hover:bg-[#f2f2f2] hover:rounded-[15px] hover:text-sky-700'>
            <p className='w-1/4 pl-2'><ShoppingIcon/></p>
            <p className='w-3/4'>Shopping</p>
          </div>
          <div className='flex p-2 gap-x-2 hover:bg-[#f2f2f2] hover:rounded-[15px] hover:text-sky-700'>
            <p className='w-1/4 pl-2'><BulbIcon/></p>
            <p className='w-3/4'>Learnings</p>
          </div>
          <div className='flex p-2 gap-x-2 hover:bg-[#f2f2f2] hover:rounded-[15px] hover:text-sky-700'>
            <p className='w-1/4 pl-2'><DressIcon/></p>
            <p className='w-3/4'>Fashion & Beauty</p>
          </div> */}
        </div>

        <div className='block pt-4 pb-4 h-[auto]'>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><SettingsIcon/></p>
            <p className='w-3/4'>Settings</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><FlagIcon/></p>
            <p className='w-3/4'>Report History</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><HelpOutlineIcon/></p>
            <p className='w-3/4'>Help</p>
          </div>
          <div className={`flex p-2 gap-x-2 hover:rounded-[15px] hover:text-sky-700 ${theme === 'light' ? 'hover:bg-[#f2f2f2]':'hover:bg-[#817c7c]'}`}>
            <p className='w-1/4 pl-2'><SettingsBrightnessIcon/></p>
            <p className='w-3/4'>Light mode</p>
          </div>
          {/* <div className='flex p-2 gap-x-2 hover:bg-[#f2f2f2] hover:rounded-[15px] hover:text-sky-700'>
            <p className='w-1/4 pl-2'><FeedbackIcon/></p>
            <p className='w-3/4'>Feedback</p>
          </div> */}
        </div>

      </div>

    </div>
  );
}

export default LeftNavBar;
