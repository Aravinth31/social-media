import React from 'react'

const RecommendedVideos = ({video, onVideoClicked, userData}) => {

    const getVideoName = (name) => {
        return name.length > 70 ? name.substring(0, 70 - 3) + "..." : name;
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


  return (
    <div className='flex relative h-[130px] py-2 px-2 border-2 m-2' id={`video_${video._id}`}>
        <div className='w-[50%]'>
            <img  className="relative w-full h-full cursor-pointer" onClick={onVideoClicked} data-video-id={video._id} src={video.imgUrl} alt="" />
        </div>
        <div className='w-[50%] p-2 flex flex-col justify-between text-[13px] font-bold'>
            <p className=''>{getVideoName(video.title)}</p>
            <div>
                <p className='text-[#d92d2d]'>{userData.name}</p>
                <div className='flex text-[#8f8e8e] justify-between'>
                    <p className=''>{getViewsCount(video.views)} views</p>
                    <p>
                        <li><span className='relative left-[-12px]'>{getTime(video.createdAt)}</span></li>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RecommendedVideos;
