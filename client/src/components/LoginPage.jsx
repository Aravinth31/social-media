import React from 'react';
import { UserDetailsContext } from '../context/UserContext';
import { useContext, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Api from '../pages/Common/Api';
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';




const LoginPage = () => {
    const {userDetails,setUserDetails,theme,setTheme,userSignedIn,setUserSignedIn}=useContext(UserDetailsContext);
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [isValidCredintials, setIsValidCredintials]=useState(true);
    const [showPassword, setShowPassword]=useState(false);
    const navigate=useNavigate();


    const handleSubmit = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailRegex.test(email) && password!=null) {
            const body ={
                email:email,
                password:password
            }
            Api.post("/api/user/signin", body, { withCredentials: true }).then((res)=>{
                if(res.data.status == true){
                    localStorage.setItem('youtube-current-user', JSON.stringify(res.data.user));
                    setIsValidCredintials(true);
                    setUserSignedIn(true);
                    setUserDetails(res.data.user);
                    setTheme(res.data.user.extraInfo.theme);
                    const prePath = localStorage.getItem('previousLocation');
                    navigate(prePath);
                }else{
                    setIsValidCredintials(false);
                }
            });
          
            setIsValidCredintials(true);
        } else {
            setIsValidCredintials(false);
        }
    }

  return (
    <div>
        <div className='block absolute top-0 left-0 w-full h-[100vh] bg-[#595757]'>
        </div>
        <div className='absolute bg-[#ffffff] top-[150px] left-[550px] w-[700px] h-[550px] z-10 opacity-100 text-[#000] font-serif'>
            <button className='bg-[#e1d9d9] right-0 mr-10 w-6 mt-6 inline-block absolute' onClick={() => {
                    const prePath = localStorage.getItem('previousLocation');
                    navigate(prePath);
            }}><CloseIcon/></button>
            <div className='flex  flex-col items-center justify-center mt-10 text-[30px]'>
                <div className='flex gap-x-1 text-[20px]'>
                    <p className='text-[#f82626] scale-[1.3]'><YouTubeIcon/></p>
                    <p className='pr-10'>YouTube</p>
                </div>
                <div className='p-0 ml-[-10px]'>
                    User SignIn
                </div>
            </div>
            <div className='flex flex-col gap-5 mt-[60px] items-center'>
                <input type="email" placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} className='w-[425px] h-[45px] p-3 bg-[#e1d9d9]'/>
                <div className='w-[425px] h-[45px]'>
                    <input type={showPassword ? "text" : "password"} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-[425px] h-[45px] p-3 bg-[#e1d9d9]' autoComplete='off'/>
                    {!showPassword &&
                        <VisibilityOffIcon className='absolute ml-[-35px] mt-[10px] text-[#636161] cursor-pointer' onClick={() => setShowPassword(!showPassword)}/>
                    }
                    {showPassword &&
                        <VisibilityIcon className='absolute ml-[-35px] mt-[10px] text-[#636161] cursor-pointer' onClick={() => setShowPassword(!showPassword)}/>
                    }
                </div>
                <div className='text-[#6833ec]'>
                    <a href="#" className='absolute left-[135px]'>Forgot Password?</a>
                </div>
                <div className={`text-[#f82626] ${!isValidCredintials ? "" : "invisible"}`}>
                    User validation failed🤧
                </div>
                <button type='submit' className='bg-[#e1d9d9] w-[80px] h-[45px]' onClick={handleSubmit}>
                    Sign In
                </button>
                <div className='text-[#6833ec] mt-10 text-[16px]'>
                    <p className='absolute left-[135px] text-[#000]'>Don't have an account?</p> 
                    <a href="/user/register" className='absolute left-[290px]'>Sign Up</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage;