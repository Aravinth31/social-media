import React from 'react'

const RecommendedVideos = () => {

    const getVideoName = (name) => {
        return name.length > 70 ? name.substring(0, 70 - 3) + "..." : name;
    }  


  return (
    <div className='flex relative h-[130px] py-2 px-2 border-2 m-2' id="recommended-videos">
        <div className='w-[50%]'>
            <img  className="relative w-full h-full" src="https://media.gettyimages.com/id/1354672309/photo/rohit-sharma-of-india-celebrates-their-half-century-during-the-third-t20-international-match.jpg?s=612x612&w=0&k=20&c=189uSxbDObS178IItppHb_dYAIvUGebwS6YHK6DTlBI=" alt="" />
        </div>
        <div className='w-[50%] p-2 flex flex-col justify-between text-[13px] font-bold'>
            <p className=''>{getVideoName("Rohit sharma's double ton in ODI again vs SL. What a knock!!")}</p>
            <div>
                <p className='text-[#d92d2d]'>Aravinthan Chinnasamy</p>
                <div className='flex text-[#8f8e8e] justify-between'>
                    <p className=''>1000 views</p>
                    <p>. 2 hours ago</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RecommendedVideos;
