import AWS from "aws-sdk";

const accessKey = process.env.REACT_APP_AWS_ACCESS_KEY;
const secretKey = process.env.REACT_APP_AWS_SECRET_KEY;

AWS.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
});

const s3 = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_AWS_BUCKET },
  region: process.env.REACT_APP_AWS_REGION,
});

export default s3;
