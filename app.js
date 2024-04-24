require('dotenv').config()

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const authenticateRequest = require('./middleware/authorization')

const indexRouter = require('./routes/index');

const app = express();

const port = process.env.PORT || 3000


app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Apply the referer access control middleware
app.use(authenticateRequest);

app.use('/', indexRouter);
app.use('/upload', require('./routes/upload'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
