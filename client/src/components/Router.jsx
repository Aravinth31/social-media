import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'; 
import VideoCards from '../pages/VideoCards';
import VideoPreview from '../pages/VideoPreview';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import ErrorPage from '../pages/Common/ErrorPage';

const RouterPage = () => {
  return (
    <div>
        <Router>
            <Routes>
              <Route index path='/' element={<VideoCards/>}/>
              <Route path='/video' element={<VideoPreview/>}/>
              <Route path='/user/register' element={<SignUpPage/>}/>
              <Route path='/user/signin' element={<LoginPage/>}/>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    </div>
  )
}

export default RouterPage;
    