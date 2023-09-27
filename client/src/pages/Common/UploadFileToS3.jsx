import { useContext } from "react";
import { UserDetailsContext } from "../../context/UserContext";
import s3  from '../../config/AwsConfig'; 


const UploadFile = async (file, userDetails) => {
    console.log("nvkndfknvkfnvjk")
    const currentUserId = userDetails._id;
    const currentTime = Date.now();
    const fileName = `${currentUserId}_${currentTime}_${file.name.replace(/\s/g, "")}`;
    console.log("fileName "+fileName);
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
      console.log(data);
      const s3Url = `https://my-you-tube.s3.amazonaws.com/${fileName}`;
      return {status:true, url:s3Url};
    })
    .catch((err)=>{
        alert("File uploaded failed..");
        return {status:false, err:err};
    });

    return status;
  };

export {UploadFile};