var express = require('express');
var router = express.Router();

const fs = require('fs')
const path = require('path')

var multer = require('multer')

const { v4: uuidv4 } = require('uuid');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = req.params.directory || "temp";
    const uploadPath = path.join('uploads', directory);
    fs.mkdirSync(uploadPath, { recursive: true }); // Create directory if it doesn't exist
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const filename = uuidv4() + path.extname(file.originalname);
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Media App running");
});

/* GET users listing. */
router.post('/upload/:directory', upload.array('files'),function(req, res, next) {
  let {directory} = req.params
  if(!directory)
  {
    directory = "temp"
  }
  const fileUrls = req.files.map(file => {
    return req.protocol + '://' + req.get('host') + '/'+directory+'/' + file.filename;
  });

  // Send the URLs back to the client
  res.json({ urls: fileUrls });
});

router.get('/:directory/:filename', (req, res) => {
  const {filename,directory} = req.params;

  const filePath = path.join(__dirname, "..",'uploads', directory , filename);

  // Check if file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});





module.exports = router;
