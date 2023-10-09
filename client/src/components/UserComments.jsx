import React, {useContext} from 'react';
import { UserDetailsContext } from '../context/UserContext';
import Api from '../pages/Common/Api';

const UserComments = ({comment, userData, videoOwner,videoId, setComments}) => {
    const {userDetails,setUserDetails,theme,setTheme,userSignedIn,setUserSignedIn}=useContext(UserDetailsContext);

    const deleteComment = () => {
        Api.delete(`api/comment/${comment._id}`, { withCredentials: true }).then((res)=>{
            if(res.data.status == true){
                Api.get(`api/comment/${videoId}`, { withCredentials: true }).then((res)=>{
                    if(res.data.status == true){
                        setComments(res.data.comments);
                    }
                });
            }
        });      
    }


    return (
    <div className={`w-[90%] min-h-[100px] flex m-10 p-5 font-serif ${theme === "light" ? 'bg-[#edeaea] text-[#080808]':'text-[#ccc1c1] bg-[#525050]'}`}>
        <div className='flex w-[10%] justify-center items-center'>
            <img src={userData.img} alt="" className='w-[50px] h-[50px] rounded-full'/>
        </div>
        <div className='flex flex-col w-[90%] justify-center pr-10'>
            <div className={`font-bold font-sans text-[18px] ${theme === "light" ? 'bg-[#edeaea] text-[#080808]':'text-[#c27536] bg-[#525050]'}`}>{userData.name}</div>
            <div>{comment.comment}</div>
            {userDetails && userDetails._id && ((userDetails._id == userData._id) || (userDetails._id == videoOwner)) &&
                <div className='py-3'>
                    <button className='underline' onClick={deleteComment}>delete</button>
                </div>
            }
        </div>
    </div>
    )
}

export default UserComments;
