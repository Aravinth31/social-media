import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'; 
import VideoCards from '../pages/VideoCards';
import VideoPreview from '../pages/VideoPreview';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import ErrorPage from '../pages/Common/ErrorPage';
import AddNewVideo from '../pages/AddNewVideo';

const RouterPage = () => {
  return (
    <div>
        <Router>
            <Routes>
              <Route index path='/' element={<VideoCards/>}/>
              <Route path='/video' element={<VideoPreview/>}/>
              <Route path='/user/register' element={<SignUpPage/>}/>
              <Route path='/user/signin' element={<LoginPage/>}/>
              <Route path="/video/new" element={<AddNewVideo/>} />

              <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    </div>
  )
}

export default RouterPage;
    