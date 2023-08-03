import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';

const TopBar = () => {
  return (
    <div className='p-2 bg-[#ffff]'>
      <div className='flex h-[65px] items-center text-l px-5'>

        <div className='flex justify-center w-11/12'>
          <div className='flex gap-x-4 justify-around items-center p-0'>
            <div className='flex h-[45px] w-[500px] rounded-[20px] border-2 border-[#e4e3e3]'>
              <input type="text" placeholder='search' className='w-[85%] h-full rounded-l-[20px] pl-4 focus:outline-none'/>
              <button className='border-l-2 border-[#e4e3e3] w-[15%] text-[#696969]'><SearchOutlinedIcon/></button>
            </div>
            <button className='w-[45px] h-[45px] bg-[#cecbcb] rounded-[30px]'><KeyboardVoiceIcon/></button>
          </div>
        </div>

        <div className='flex justify-center gap-x-4 w-1/12'>
          <button className='scale-[1.3]'><VideoCallIcon/></button>
          <button className='scale-[1.1]'><NotificationsIcon/></button>
          <button className='w-[45px] h-[45px] bg-[#ff0000] rounded-[30px]'>A</button>
        </div>

      </div>
    </div>
  )
}

export default TopBar
