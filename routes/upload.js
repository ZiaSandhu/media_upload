const express = require('express');
const router = express.Router();
const authenticateRequest = require('../middleware/authorization')
const fs = require('fs')
const path = require('path')

const multer = require('multer')

const { v4: uuidv4 } = require('uuid');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = req.params.directory || "temp";
    const uploadPath = path.join('uploads', directory);
    fs.mkdirSync(uploadPath, { recursive: true }); // Create directory if it doesn't exist
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const originalnameParts = file.originalname.split(' ');
    const filename = uuidv4() + "_" + originalnameParts.join('_').replace(/\.(png)+$/i, '') + path.extname(file.originalname);
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });




router.post('/:directory', authenticateRequest,upload.array('files'),function(req, res, next) {
  let {directory} = req.params
  if(!directory)
  {
    directory = "temp"
  }

  if(!req.files){
    return res.status(409).json({success:false,message:"Invalid Payload"})
  }

  const fileUrls = req.files.map(file => {
    return req.protocol + '://' + req.get('host') + '/'+directory+'/' + file.filename;
  });

  // Send the URLs back to the client
  res.status(200).json({ urls: fileUrls, message:"URL's of Saved files", success:true });
});







module.exports = router;
