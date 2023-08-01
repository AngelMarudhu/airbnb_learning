import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import imageDownloader from 'image-downloader';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import multer from 'multer';
import fs from 'fs';
import auth from './Middleware/auth.js';

// es module dont have __dirname that's we use path and file to urlpath library
const __dirname = dirname(fileURLToPath(import.meta.url));

import {
  getPlaceMongo,
  getUsernameDetails,
  loginUser,
  postPlaces,
  postUserDetails,
  updatePlaces,
} from './Controllers/index.js';

const PORT = 8000;
const CONNECTION_URL =
  'mongodb+srv://marudhu:marudhu1234@hotelbooking.tnekuuh.mongodb.net/?retryWrites=true&w=majority';

const app = express();

// DEFAULT WORK OF EXPRESS JS DOESN'T ADD REQ.BODY IN REQ OBJECT, IN ORDER TO THE ADD REQ.BODY IN REQ OBJECT THROUGH MIDDLEWARE, THAT'S THE POWER OF MIDDLEWARE
// MIDDLEWARE CAN BE MANIPULATE REQUEST OBJECT AND RESPONSE OBJECT, WITHOUT MIDDLEWARE YOU CAN'T GET REQ.BODY VALUE IN REQUEST OBJECT.....
app.use(express());
app.use(cors({ origin: 'http://localhost:3000' }));

// this middleware, after our images stored in local file and then the local file want to show in front end........ In Node.js, when you want to serve static files such as images, CSS files, or JavaScript files, you need to use a middleware function called express.static().
// /uploadedimg whatever you want to set the endpoint hitted the express.static search give files after direname uploads means your folder directory this folderdirectory is very important
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// The dev format inside of Morgan middleware is a predefined log output format that is optimized for development purposes. It provides detailed information about each request that includes the request method, URL, response status code, response time, and the size of the response body. It also logs additional information such as the IP address and the user agent of the client making the request.
// Using the dev format during development can be very useful for debugging and performance optimization, as it provides a lot of information about each request and helps identify any issues or bottlenecks in the application.
app.use(morgan('dev'));

//body-parser is a middleware library for handling HTTP request body parsing in Node.js applications. It helps to extract data from the request body in a format that can be easily used by the application, BASED ON USE CASES
// DEFAULT LIMIT IS 100kb
// OFFICIAL A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This will be a Buffer object of the body.
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '100mb' }));

// ==================== PUT REQUEST =====================

app.route('/api/updatePlaces').put(auth, updatePlaces);

// ==================== GET REQUEST ====================
app.route('/api/user/:username').get(getUsernameDetails);
app.route('/api/getPlaces').get(auth, getPlaceMongo);

// ==================== POST REQUEST ====================
app.route('/api/places').post(auth, postPlaces);
app.route('/api/loginuser').post(loginUser);
app.route('/api/register').post(postUserDetails);
app.route('/api/uploadimg').post(async (req, res) => {
  const { link } = req.body;
  console.log(link);

  const timeStamp = new Date().getTime();
  const uniqueFilename = `marudhu-${timeStamp}.jpg`;
  const filePath = path.join(__dirname, 'uploads', uniqueFilename);

  // url (required) - the image URL to download
  // dest (required) - the image destination. Can be a directory or a filename. If a directory is given, ID will automatically extract the image filename from options.url (see usage bellow)
  // extractFilename - boolean indicating whether the image filename will be automatically extracted from options.url or not. Set to false to have options.dest without a file extension for example. (default: true)

  const options = {
    url: link,
    dest: filePath,
  };

  await imageDownloader
    .image(options)
    .then(({ filename }) => {
      // The path.basename() method is used to get the last portion of a path. In this case, it is used to extract the name of the uploaded image file from the filename variable which contains the full path of the saved image.
      // For example, if filename is E:\MarudhuPackage\hotelbooking\server\uploads\marudhu-1680326222797.jpg, then path.basename(filename) will return marudhu-1680326222797.jpg.
      const imageName = path.basename(filename);
      res.status(200).json({
        message: `file uploaded successfully`,
        link: imageName,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  umask: false,
});

const postsMiddleware = multer({ storage });

app
  .route('/api/uploaddevice')
  .post(postsMiddleware.array('photos', 100), async (req, res) => {
    try {
      const filenames = [];
      for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.').pop();
        const uniqueSuffix = Date.now();
        const newPath = `${uniqueSuffix}.${parts}`;
        fs.renameSync(path, newPath);
        filenames.push(newPath);
      }
      res.status(200).json({
        message: 'Images uploaded successfully',
        link: filenames,
      });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  });

mongoose.set('strictQuery', false);
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongodb Successfully Connected');
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('server started');
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
