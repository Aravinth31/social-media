import React, {useContext} from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { UserDetailsContext } from '../context/UserContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MenuIcon from '@mui/icons-material/Menu';


const TopBar = () => {
  const {userDetails,setUserDetails,theme,setTheme,userSignedIn,setUserSignedIn} = useContext(UserDetailsContext);

  return (
    <div className={`fixed top-0 z-100 p-2 w-full block ${theme === "light" ? 'text-[#080808]':'bg-[#080808] text-[#d4d0d0]'}`}>
      <div className='flex h-[65px] items-center text-l px-5'>

        <div className='flex h-[65px] justify-around items-center text-[20px] w-[300px]'>
            <MenuIcon/>
          <div className='flex gap-x-1'>
            <p className='text-[#f82626] scale-[1.3]'><YouTubeIcon/></p>
            <p className='pr-10'>YouTube</p>
          </div>
        </div>

        <div className='flex justify-center w-11/12'>
          <div className='flex gap-x-4 justify-around items-center p-0'>
            <div className='flex h-[45px] w-[500px] rounded-[20px] border-2 border-[#e4e3e3]'>
              <input type="text" placeholder='search' className={`w-[85%] h-full rounded-l-[20px] pl-4 focus:outline-none' ${theme === "light" ? 'text-[#080808]':'bg-[#696969] text-[#e4e3e3]'}`}/>
              <button className='border-l-2 border-[#e4e3e3] w-[15%] text-[#696969]'><SearchOutlinedIcon/></button>
            </div>
            <button className={`w-[45px] h-[45px] rounded-[30px] ${theme === "light" ? 'bg-[#cecbcb]':'text-[#ffff] bg-[#696969]'}`}><KeyboardVoiceIcon/></button>
          </div>
        </div>

        {!userSignedIn && 
          <div className=' flex justify-center w-1/12 pl-4 text-sky-700'>
            <button className='border-2 border-sky-700 px-2 py-1 flex justify-center items-center gap-2 cursor-pointer'>
              <AccountCircleIcon/>
              Sign In
            </button>
          </div>
        }

      </div>
    </div>
  )
}

export default TopBar;
