import { UserDetailsContext } from '../context/UserContext';
import { useContext, useEffect, useState} from 'react';
import { UploadFile } from './Common/UploadFileToS3';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import Api from './Common/Api';



const AddNewVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [uploadFailed, setUploadFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const {userDetails,setUserDetails,theme,setTheme,userSignedIn,setUserSignedIn}=useContext(UserDetailsContext);
  const navigate=useNavigate();



  useEffect(() => {
    if(userSignedIn !== undefined && userSignedIn == false){
      window.location.href = '/user/signin';
    }
  }, [userSignedIn]); 


  const handleFileChange = (e) => {
    const type = e.target.getAttribute('data-type');
    const file = e.target.files[0];
    console.log(e.target)
    console.log("file : "+file);
    if(type === "video"){
        setVideo(file);
    }
    else if(type === "image"){
        setThumbnail(file);
    }
  };

  const handleFilePreview = (e) => {
    const type = e.target.getAttribute('data-type');
    let previewContainer = document.getElementById("file-upload-preview");
    if(type === "video"){
      const src = URL.createObjectURL(video);
      previewContainer.innerHTML = `
      <video controls autoplay style="display:relative; width:100%; height:100%;">
        <source src=${src} type="video/mp4">
        <source src=${src} type="video/ogg">
        Your browser does not support the video tag.
      </video>`;
    }
    else if(type === "image"){
      const src = URL.createObjectURL(thumbnail);
      console.log("src : "+src);
      previewContainer.innerHTML = `<img src=${src} alt="ara" style="display:relative; width:100%; height:100%;"/>`
    }
  }

  const addVideo = async () => {
    setUploadFailed(false);
    if(!title){
      setUploadFailed(true);
      setErrorMessage("Title is required..");
    }else if(!description){
      setUploadFailed(true);
      setErrorMessage("Description is required..");
    }else if(!thumbnail){
      setUploadFailed(true);
      setErrorMessage("Thumbnail is required..");
    }else if(!video){
      setUploadFailed(true);
      setErrorMessage("Video is required..");
    }else{
      let imageUpload = await UploadFile(thumbnail, userDetails);
      if(imageUpload.status === true){
        setThumbnail(imageUpload.url);
          let videoUpload = await UploadFile(video, userDetails);
          if(videoUpload.status === true){
            setVideo(videoUpload.url);
            const body = {
                  "title":title,
                  "description":description,
                  "imgUrl":imageUpload.url,
                  "videoUrl":videoUpload.url
            }
            Api.post('api/video/new', body, { withCredentials: true }).then((res)=>{
              if(res.data.status == true){
                alert("Video created successfully..!!");
                window.location.href = '/';
              }
            })
            .catch((error) => {
                if(error.response.status == 401){
                  window.location.href = '/user/signin';
                }
            });
  
          }
      }
    }
  }

  return (
    <div>
        <div className='block absolute top-0 left-0 w-full h-[100vh] bg-[#595757] z-10'>
        </div>
        <div className='absolute bg-[#ffffff] top-[50px] left-[550px] w-[1000px] h-[770px] z-10 text-[#000] font-serif'>
            <button className='bg-[#e1d9d9] right-0 mr-10 w-6 mt-6 inline-block absolute' onClick={() => {
                    const prePath = localStorage.getItem('previousLocation');
                    navigate(prePath);
            }}><CloseIcon/></button>
          <div className='flex items-center justify-center text-[30px]'>
              <div className='text-[#024bf5] mt-10'>
                  Add a New Video
              </div>
          </div>


          <div className='w-[1000px] h-[780px] mt-0 flex flex-col'>
              <div className='flex items-center justify-between p-5 pl-10 gap-10'>
                <div className='flex flex-col gap-y-10'>
                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor="video title" className='text-bold text-[20px] font-mono'>Video Title<span className='text-[#f62e2e]'>*</span></label>
                    <input type="text" placeholder='Video title' value={title} onChange={(e) => setTitle(e.target.value)} className='w-[500px] h-[45px] p-3 bg-[#e1d9d9]'/>
                  </div>
                  <div className='flex flex-col gap-y-3'>
                    <label htmlFor="video title" className='text-bold text-[20px] font-mono'>Video Description<span className='text-[#f62e2e]'>*</span></label>
                    <textarea rows="4" cols="70" placeholder='Video description' value={description} onChange={(e) => setDescription(e.target.value)} className='w-[500px] h-[105px] p-3 bg-[#e1d9d9]'/>
                  </div>
                </div>
                
                
                <div className='w-[400px] h-[400px]' id="file-upload-preview">
                </div>

              </div>

              <div className='flex items-center justify-between p-10 pt-0 gap-10'>
                <div className='flex flex-col w-[700px] gap-y-6'>
                  <div className='relative w-full h-[45px] flex items-center justify-between '>
                    <p className='text-bold text-[20px] font-mono'>Thumbnail Image<span className='text-[#f62e2e]'>*</span></p>
                    <input type="file" accept="image/*" placeholder='Video title' data-type="image" onChange={handleFileChange}/>
                    <button className={`bg-[#d6c9f0] w-[90px] h-[35px] rounded-full ${thumbnail ? '':'invisible'}`} data-type="image" onClick={handleFilePreview}>preview</button>
                  </div>
                  
                  <div className='relative w-full h-[45px] flex items-center justify-between'>
                    <p className='text-bold text-[20px] font-mono'>Upload Your Video<span className='text-[#f62e2e]'>*</span></p>
                    <input type="file" accept="video/*" placeholder='Video title' data-type="video" onChange={handleFileChange} autoComplete="off"/>
                    <button className={`bg-[#d6c9f0] w-[90px] h-[35px] rounded-full ${video ? '':'invisible'}`} data-type="video" onClick={handleFilePreview}>preview</button>
                  </div>
                </div>

                <div className='flex justify-center items-center w-[300px]'>
                  <button className='bg-[#efb063] w-[130px] h-[50px] flex items-center justify-center rounded-full text-[18px]' onClick={addVideo}>Add Video</button>
                </div>

              </div>

              {uploadFailed &&
                  <div className='flex justify-center items-center text-[#de1c1c] text-[22px]'>
                  {errorMessage}
                </div>
              }
          </div>
        </div>
    </div>
  )
}

export default AddNewVideo;
