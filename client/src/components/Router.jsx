import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'; 
import VideoCards from '../pages/VideoCards';
import VideoPreview from '../pages/VideoPreview';

const RouterPage = () => {
  return (
    <div>
        <Router>
            <Routes>
            <Route index path='/' element={<VideoCards/>}/>
            <Route index path='/video' element={<VideoPreview/>}/>
            </Routes>
        </Router>
    </div>
  )
}

export default RouterPage;
    