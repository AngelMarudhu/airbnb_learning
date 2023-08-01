import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000' });

export const postUserDetails = createAsyncThunk(
  'postUserDetails',
  async (post) => {
    try {
      const response = await API.post('/api/register', post);
      //console.log(response.status);
      return response.data;
    } catch (error) {
      console.log('error occured while registering');
    }
  }
);

export const loginUser = createAsyncThunk(
  'loginUser',
  async ({ username, password }) => {
    //  console.log(username, password, 'from axios login details');
    try {
      const response = await API.post('/api/loginuser', {
        username,
        password,
      });
      // console.log(response, 'from axiox');
      return response.data;
    } catch (error) {
      console.log('error occurred');
    }
  }
);

export const getUserDetailsForShowProfile = createAsyncThunk(
  'getUserDetailsForShowProfile',
  async (username) => {
    // console.log(username);
    try {
      const response = await API.get(`/api/user/${username}`);
      //   console.log(response.data.existingUserWithoutPassword);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const uploadImage = createAsyncThunk(
  'uploadImage',
  async (imageLink) => {
    // console.log(imageLink);
    try {
      const response = await API.post('/api/uploadimg', { link: imageLink });
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const uploadDevices = createAsyncThunk(
  'uploadDevices',
  async (images, { rejectWithValue }) => {
    try {
      const response = await API.post('/api/uploaddevice', images, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postPlaces = createAsyncThunk('postPlaces', async (postData) => {
  console.log(postData);
  try {
    const token = await JSON.parse(localStorage.getItem('token')).token;
    // console.log(token);
    const response = await API.post('/api/places', postData, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const postPlacesGetting = createAsyncThunk(
  'postPlacesGetting',
  async () => {
    try {
      const token = await JSON.parse(localStorage.getItem('token')).token;
      //console.log(token);
      const response = await API.get('/api/getPlaces', {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postPlacesUpdating = createAsyncThunk(
  'postPlacesUpdating',
  async (updateData) => {
    // console.log(updateData);
    try {
      const token = JSON.parse(localStorage.getItem('token')).token;
      const response = await API.put('/api/updatePlaces', updateData, {
        headers: { authorization: `Bearer ${token}` },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
