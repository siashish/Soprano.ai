const config = require('config');
const AWS = require('aws-sdk');
const ID = config.get('ID');
const SECRET = config.get('SECRET');
const BUCKET_NAME = config.get('BUCKET_NAME');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
    secretAccessKey: SECRET,
    accessKeyId: ID,
    region: 'ap-south-1'
})

const s3 = new AWS.S3();
  
  const upload = multer({
    //fileFilter,
    storage: multerS3({
      s3,
      bucket: BUCKET_NAME,
      acl: 'public-read',
      ContentEncoding: 'base64', // required
      ContentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
          //console.log(file);
        cb(null, file.originalname);
      }
    })
  })
  
module.exports = upload;