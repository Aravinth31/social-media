import React from 'react'
import VideoCards from './VideoCards'
import TopBar from './TopBar'
import LeftNavBar from './LeftNavBar'

const Container = () => {
  return (
    <div className='flex'>
        <LeftNavBar/>
        <div className='bg-slate-400 text-red-600 w-full'>
            <TopBar/>
            <VideoCards/>
        </div>
    </div>
  )
}

export default Container
