import React from 'react';

const VideoCards = ({video, onVideoClicked, userData}) => {

  const getTime = (createdTime) => {
    const timeDifference = new Date() - new Date(createdTime);
    if(Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365)) > 0){
      return `${Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365))} years ago`
    }else if(Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30)) > 0){
      return `${Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30))} months ago`
    }else if(Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7)) > 0){
      return `${Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7))} weeks ago`
    }else if(Math.floor(timeDifference / (1000 * 60 * 60 * 24)) > 0){
      return `${Math.floor(timeDifference / (1000 * 60 * 60 * 24))} days ago`
    }else if(Math.floor(timeDifference / (1000 * 60 * 60)) > 0){
      return `${Math.floor(timeDifference / (1000 * 60 * 60))} hours ago`
    }else if(Math.floor(timeDifference / (1000 * 60)) > 0){
      return `${Math.floor(timeDifference / (1000 * 60))} minutes ago`
    }else{
      return `${Math.floor(timeDifference / (1000))} seconds ago`
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

  const getVideoName = (name) => {
    return name.length > 70 ? name.substring(0, 70 - 3) + "..." : name;
  }  

  return ( 
    <div className='w-[340px] h-[280px] bg-[#eeeaea] rounded-[10px]' id={`container_${video._id}`}>
       <div className='w-full h-[60%] rounded-[10px] block hover:opacity-50'>
         <img src={video.imgUrl} alt={video.title} className='w-full h-full rounded-[10px] cursor-pointer' onClick={onVideoClicked} data-video-id={video._id}/>
       </div>
       <div className='h-[40%] flex flex-row'>
         <div className='block w-[16%] h-[100%] pt-2'>
             <img className='w-[40px] h-[40px] rounded-[20px] m-auto border-2 border-[#275bec]' src={userData.img} alt="" />
         </div>
         <div className='flex flex-col w-[84%] h-[100%] p-1 pt-2'>
           <div className='block h-[70%] font-bold overflow-hidden text-[#080808]'>
               {getVideoName(video.title)}
           </div>
           <div className='text-[#6d6b6b]'>
             {userData.name}
           </div>
           <div className='flex flex-row gap-2 items-center text-[#6d6b6b]'>
             {getViewsCount(video.views)} views
             <li>{getTime(video.createdAt)}</li>
           </div>
         </div>
       </div>
   </div>
   );
}

export default VideoCards;
