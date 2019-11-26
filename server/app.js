require('dotenv').config();
const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const app = express();
app.use(cors());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', () => {
  console.log("Connected to database");
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

// Cloudinary config
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

// Multer file storage on server temporarily
let fileName;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    fileName = file.originalname;
    cb(null, fileName);
  }
});
let upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }

  cloudinary.uploader.upload('uploads/' + fileName, { folder: 'our-cookbook', width: 800, height: 600, crop: 'lfill', quality: 70 }, function(error, result) { 
    if (error) return res.send(error);

    // Remove image stored on server
    fs.unlinkSync('uploads/' + fileName);
    // Return image url
    res.send(result.url);
  });
});


app.listen(4000, () => {
  console.log('Now listening on port 4000');
});