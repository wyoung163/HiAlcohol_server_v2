import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";

const fileFilter = (req, file, cb) => {
  const typeArray = file.mimetype.split("/");
  const fileType = typeArray[1];
  if (
    fileType == "jpg" ||
    fileType == "png" ||
    fileType == "jpeg" ||
    fileType == "gif" ||
    fileType == "webp"
  ) {
    cb(null, true);
  } else {
    cb({ msg: "jpg, png, jpeg, gif, webp 파일만 업로드 가능합니다." }, false);
  }
};

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(process.env.IMAGE_ENDPOINT),
  accessKeyId: process.env.IMAGE_ACCESSKEY,
  secretAccessKey: process.env.IMAGE_SECRETACCESSKEY,
  region: process.env.IMAGE_REGION,
});

let imageUpload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.IMAGE_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `users/${Date.now()}`);
    },
  }),
  fileFilter: fileFilter,
});


export default imageUpload = multer(imageUpload);