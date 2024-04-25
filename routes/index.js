const express = require('express');
const router = express.Router();

const fs = require('fs')
const path = require('path')

const authorizationRequest = require('../middleware/authorization')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Media App running");
});

router.route('/:directory/:filename').get((req, res) => {
  const {filename,directory} = req.params;

  const filePath = path.join(__dirname, "..",'uploads', directory , filename);

  // Check if file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath)
  } else {
    res.send("File not found!")

  }
}).put(authorizationRequest,(req, res) => {
  const {filename,directory} = req.params;

  const filePath = path.join(__dirname, "..",'uploads', directory , filename);

  // Check if file exists
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.status(200).json({message:"File deleted!", success: true})

  } else {
    res.status(200).json({message:"File not found!", success: false})

  }
})




module.exports = router;
