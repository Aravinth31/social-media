import React from 'react';
import { UserDetailsContext } from '../context/UserContext';
import { useContext, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Api from './Common/Api';
import { useNavigate } from "react-router-dom";



const SignUpPage = () => {
    const {userDetails,setUserDetails,theme,setTheme,userSignedIn,setUserSignedIn}=useContext(UserDetailsContext);
    const navigate=useNavigate();

    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setconfirmPassword]=useState("");
    const [isValidCredintials, setIsValidCredintials]=useState(true);

    const [showPassword, setShowPassword]=useState(false);
    const [showConfirmPassword, setShowConfirmPassword]=useState(false);


    const handleSubmit = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailRegex.test(email) && password!=null && confirmPassword!= null && password == confirmPassword && name!=null) {
            const body ={
                name:name,
                email:email,
                password:password
            }
            Api.post("/api/user/signup", body, { withCredentials: true }).then((res)=>{
                if(res.data.status == true){
                    localStorage.setItem('youtube-current-user', JSON.stringify(res.data.user));
                    setIsValidCredintials(true);
                    setUserSignedIn(true);
                    setUserDetails(res.data.user);
                    setTheme(res.data.user.extraInfo.theme);
                    navigate('/');
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
        <div className='block absolute top-0 left-0 w-full h-[100vh] bg-[#595757] z-10'>
        </div>
        <div className='absolute bg-[#ffffff] top-[100px] left-[550px] w-[700px] h-[700px] z-10 text-[#000] font-serif'>
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
                    Register to continue with Youtube
                </div>
            </div>
            <div className='flex flex-col gap-5 mt-[60px] items-center'>
                <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} className='w-[425px] h-[45px] p-3 bg-[#e1d9d9]'/>
                <input type="email" placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} className='w-[425px] h-[45px] p-3 bg-[#e1d9d9]' autoComplete='off'/>
                <div className='w-[425px] h-[45px]'>
                    <input type={showPassword ? "text" : "password"} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-[425px] h-[45px] p-3 bg-[#e1d9d9]' autoComplete='off'/>
                    {!showPassword &&
                        <VisibilityOffIcon className='absolute ml-[-35px] mt-[10px] text-[#636161] cursor-pointer' onClick={() => setShowPassword(!showPassword)}/>
                    }
                    {showPassword &&
                        <VisibilityIcon className='absolute ml-[-35px] mt-[10px] text-[#636161] cursor-pointer' onClick={() => setShowPassword(!showPassword)}/>
                    }
                </div>
                <div className='w-[425px] h-[45px]'>
                    <input type={showConfirmPassword ? "text" : "password"} placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} className='w-[425px] h-[45px] p-3 bg-[#e1d9d9]'/>
                    {!showConfirmPassword &&
                        <VisibilityOffIcon className='absolute ml-[-35px] mt-[10px] text-[#636161] cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>
                    }
                    {showConfirmPassword &&
                        <VisibilityIcon className='absolute ml-[-35px] mt-[10px] text-[#636161] cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>
                    }
                </div>

                <div className={`text-[#f82626] ${!isValidCredintials ? "" : "invisible"}`}>
                    User validation failed🤧
                </div>
                <button type='submit' className='bg-[#e1d9d9] w-[80px] h-[45px]' onClick={handleSubmit}>
                    Sign In
                </button>
                <div className='text-[#6833ec] mt-10 text-[16px]'>
                    <p className='absolute left-[135px] text-[#000]'>Already have an account?</p> 
                    <a href="/user/signin" className='absolute left-[310px]'>Sign In</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUpPage;
