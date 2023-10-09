import { useContext } from "react";
import { UserDetailsContext } from "../../context/UserContext";
import s3  from '../../config/AwsConfig'; 


const UploadFile = async (file, userDetails) => {
    const currentUserId = userDetails._id;
    const currentTime = Date.now();
    const fileName = `${currentUserId}_${currentTime}_${file.name.replace(/\s/g, "")}`;
    const params = {
      Bucket: "my-you-tube",
      Key: fileName,
      Body: file,
      ContentType: file.type,
    };

    var upload = s3.putObject(params).on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      }).promise();

    const status = await upload.then((data) => {
      const s3Url = `https://my-you-tube.s3.amazonaws.com/${encodeURIComponent(fileName)}`;
      return {status:true, url:s3Url};
    })
    .catch((err)=>{
        alert("File uploaded failed..");
        return {status:false, err:err};
    });

    return status;
  };

export {UploadFile};