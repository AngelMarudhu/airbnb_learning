import jwt from 'jsonwebtoken';
import userSchema from '../Models/userSchema.js';

const auth = async (req, res, next) => {
  //   console.log(req.headers, 'request headers');
  try {
    const authHeader = req.headers.authorization;
    // console.log(authHeader, 'authheader');
    const token = authHeader.split(' ')[1];
    //  console.log(token, 'token............');
    const decodedData = jwt.decode(token, 'secret');
    //  console.log(decodedData, 'decoded data from auth.js');
    req.userId = decodedData.userId;
    console.log(req.userId);
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default auth;
