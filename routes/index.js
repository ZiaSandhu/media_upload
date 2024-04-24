const express = require('express');
const router = express.Router();

const fs = require('fs')
const path = require('path')




/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Media App running");
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
