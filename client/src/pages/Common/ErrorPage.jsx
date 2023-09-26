import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
        <div className='block absolute top-0 left-0 w-full h-[100vh] bg-[#595757]'>
        </div>
        <div className='absolute bg-[#595757] top-[100px] left-[380px] w-[1000px] h-[700px] z-10 text-[#000] font-serif flex items-center justify-center flex-col gap-10'>
          <div className='flex flex-col items-center text-[#f50606] text-[150px] font-dela '>
            <p>ERROR</p>
            <p>404</p>
            <p>Page Not Found</p>
          </div>
          <Link to="/" className='text-[22px]'> 👉  Go back to the Homepage</Link>
        </div>
    </div>
  )
}

export default ErrorPage;
