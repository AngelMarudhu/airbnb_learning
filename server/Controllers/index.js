import userSchema from '../Models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import placeSchema from '../Models/placeSchema.js';
import mongoose from 'mongoose';

export const getUsernameDetails = async (req, res) => {
  const { username } = req.params;
  // console.log(username);
  try {
    const existingUser = await userSchema.findOne({ username });
    // console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({ message: 'user not found' });
    }

    const existingUserWithoutPassword = await Object.assign(
      {},
      existingUser.toObject()
    );
    delete existingUserWithoutPassword.password;

    // console.log(existingUserWithoutPassword);

    res.status(200).json({
      existingUserWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const postUserDetails = async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(username, email, password, 'postuserdetails');
  try {
    const existingUser = await userSchema.findOne({ email, username });

    if (existingUser) {
      return res.status(404).json({ message: 'user already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userSchema.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      username: result.username,
      message: 'User created successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);

  try {
    const existingUser = await userSchema.findOne({ username });
    // console.log(existingUser.username, 'existing user loginuser');
    if (existingUser) {
      const comparePassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!comparePassword) {
        return res.status(403).json({ message: 'password is invalid' });
      }

      if (comparePassword) {
        const token = await jwt.sign(
          {
            email: existingUser.email,
            userId: existingUser._id,
          },
          'secret',
          { expiresIn: '24h' }
        );
        return res.status(200).json({ token, username: existingUser.username });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const postPlaces = async (req, res) => {
  const { title, address, photos, extraInfo, description, perks, price } =
    req.body;
  console.log(title, address, photos, extraInfo, description, perks, price);
  try {
    if (!req.userId) {
      return res.status(403).json({ message: 'You Are UnAuthorized User💀' });
    }
    const placeCreateMongo = await placeSchema.create({
      owner: req.userId,
      title,
      address,
      photos,
      perks,
      extraInfo,
      description,
      price,
    });
    res
      .status(200)
      .json({ message: 'place created successfully', data: placeCreateMongo });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPlaceMongo = async (req, res) => {
  console.log(req.userId);
  try {
    if (!req.userId) {
      return res.status(403).json({ message: 'You Are UnAuthorized User💀' });
    }

    const placesData = await placeSchema.find({ owner: req.userId });
    console.log(placesData);

    return res
      .status(200)
      .json({ message: 'your places are here', data: placesData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePlaces = async (req, res) => {
  const { _id, title, address, photos, extraInfo, description, perks, price } =
    req.body;
  // console.log(_id, 'updatePlaces');
  try {
    if (!req.userId) {
      return res.status(403).json({ message: 'You are not authorized person' });
    }

    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      return res.status(404).json({ message: 'your id is not valid ' });
    }
    const findIdPlaces = await placeSchema.findById(_id);
    console.log(findIdPlaces.owner.toString(), 'find id');

    if (req.userId === findIdPlaces.owner.toString()) {
      findIdPlaces.set({
        title,
        address,
        photos,
        extraInfo,
        description,
        perks,
        price,
      });

      await findIdPlaces.save();
      return res.status(200).json({ message: 'success' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
