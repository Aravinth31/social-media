import React, {useContext, useEffect, useState} from 'react';
import { UserDetailsContext } from '../context/UserContext';
import Api from './Common/Api';
import { UploadFile } from './Common/UploadFileToS3';

const UserProfile = () => {
    const {userDetails,setUserDetails,theme,setTheme,userSignedIn,setUserSignedIn}=useContext(UserDetailsContext);


    useEffect(() => {
        if(userSignedIn !== undefined && userSignedIn == false){
            window.location.href = '/user/signin';
        }
    },[userSignedIn, userDetails]);


    const handleFileChange = async(event) => {
        const file = event.target.files[0];
        if(file){
            let imageUpload = await UploadFile(file, userDetails);
            if(imageUpload.status == true){
                const body = {
                    img:imageUpload.url
                }
                Api.put(`/api/user/${userDetails._id}`, body, { withCredentials: true }).then((res)=>{
                    if(res.data.status == true){
                      localStorage.setItem('youtube-current-user', JSON.stringify(res.data.user))
                      setUserDetails(res.data.user);
                    }
                })
                .catch((error) => {
                      if(error.response.status == 401){
                        window.location.href = '/user/signin';
                      }
                });
            }
        }
      };

  return (
    <div className={`h-[91.5vh] left-[300px] p-4 pl-8 flex flex-row items-center justify-center gap-x-10 gap-y-16 overflow-y-scroll scroll-bar w-[1620px] float-right ${theme === "light" ? 'text-[#080808]':'bg-[#080808] text-[#d4d0d0] '}`}>
        <div className='w-[800px] h-[500px] flex flex-col border-2 gap-y-10'>
            <div className='text-[45px] font-bold text-[#c54a4a] h-[80px] w-full px-[3%] flex flex-col justify-center items-center gap-y-1'>
                USER PROFILE
            </div>
            <div className='flex flex-row h-full items-start'>
                <div className='w-[40%]'>
                    <div className='h-full   flex flex-col  gap-y-7 justify-center items-center'>
                        <div className='w-[60%] h-[40%] relative'>
                            <img src={userDetails?.img} alt="" className='w-full h-full'/>
                        </div>
                        <label htmlFor="fileInput" className={`flex justify-center items-center ${theme === "light" ? 'text-[#080808] bg-[#e2d8d8]':'bg-[#343333] text-[#d7d1d1] '} w-[160px] h-[35px] rounded-full `}>Change image</label>
                        <input accept="image/*" id="fileInput" type="file"className="invisible w-[0px] h-[0px]" onChange={handleFileChange}/>
                    </div>
                </div>
                <div className='w-[60%] flex flex-col  gap-y-10 '>
                    <div className='flex flex-col justify-center items-center gap-y-2 h-full w-full  '>
                        <div className='h-[80px] w-[80%] px-[3%] flex flex-col justify-center gap-y-1'>
                            <label className='font-dela font-bold underline'>User Name</label>
                            <input className={`w-full h-[50%] p-2 border-2 ${theme === "light" ? 'text-[#080808] bg-[#e2d8d8]':'bg-[#343333] text-[#d7d1d1] '}`} type="text" value={userDetails?.name} readOnly={true}/>
                        </div>
                        <div className='h-[80px] w-[80%] px-[3%] flex flex-col justify-center gap-y-1'>
                            <label className='font-dela font-bold underline'>User Email</label>
                            <input className={`w-full h-[50%] p-2 border-2 ${theme === "light" ? 'text-[#080808] bg-[#e2d8d8]':'bg-[#343333] text-[#d7d1d1] '}`} type="text" value={userDetails?.email} readOnly={true}/>
                        </div>
                        <div className='h-[80px] w-[80%] px-[3%] flex flex-col justify-center gap-y-1'>
                            <label className='font-dela font-bold underline'>Nunmer of Subscribers</label>
                            <input className={`w-full h-[50%] p-2 border-2 ${theme === "light" ? 'text-[#080808] bg-[#e2d8d8]':'bg-[#343333] text-[#d7d1d1] '}`} type="text" value={userDetails?.subscribers} readOnly={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserProfile;
