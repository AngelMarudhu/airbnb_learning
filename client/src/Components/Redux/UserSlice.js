import { createSlice } from '@reduxjs/toolkit';
import * as api from '../axios/apiaxios.js';

const userSlice = createSlice({
  name: 'user-slice',
  initialState: {
    getDataUser: {},
    places: {},
    getPlaces: [],
    userValue: {
      username: null,
      error: null,
      isAuthenticated: false,
      isLoggedIn: false,
    },
  },

  //   reducers: {
  //     removeUser: (state, action) => {
  //       state.userValue.username = action.payload;
  //     },
  //   },
  extraReducers: (builder) => {
    builder.addCase(api.postUserDetails.pending, (state) => {
      state.userValue.error = null;
      state.userValue.isAuthenticated = false;
      state.userValue.isLoggedIn = false;
    });
    builder.addCase(api.postUserDetails.fulfilled, (state, action) => {
      console.log(action.payload);
      state.userValue.isAuthenticated = true;
      state.userValue.username = action.payload.username;
      state.userValue.isLoggedIn = true;
    });
    builder.addCase(api.postUserDetails.rejected, (state, action) => {
      state.userValue.error = null;
      state.userValue.isAuthenticated = false;
      state.userValue.isLoggedIn = false;
    });

    // ========================= LOGIN CREDENTIALS=====================

    builder.addCase(api.loginUser.pending, (state) => {
      state.userValue.isAuthenticated = false;
      state.userValue.isLoggedIn = false;
      state.userValue.error = null;
    });
    builder.addCase(api.loginUser.fulfilled, (state, action) => {
      //   console.log(action.payload);
      state.userValue.isAuthenticated = true;
      state.userValue.isLoggedIn = true;
      state.userValue.username = action.payload.username;
      if (action.payload) {
        localStorage.setItem('token', JSON.stringify(action.payload));
      }
    });
    builder.addCase(api.loginUser.rejected, (state, action) => {
      state.userValue.isAuthenticated = false;
      state.userValue.isLoggedIn = false;
      state.userValue.error = action.payload;
    });

    // ========================= GET USERNAME EMAIL CREDENTIALS=====================

    builder.addCase(api.getUserDetailsForShowProfile.pending, (state) => {
      state.userValue.isAuthenticated = false;
      state.userValue.isLoggedIn = false;
      state.userValue.error = null;
    });
    builder.addCase(
      api.getUserDetailsForShowProfile.fulfilled,
      (state, action) => {
        // console.log(action.payload.existingUserWithoutPassword);
        state.getDataUser = action.payload.existingUserWithoutPassword;
        state.userValue.isAuthenticated = true;
        state.userValue.isLoggedIn = true;
      }
    );
    builder.addCase(api.getUserDetailsForShowProfile.rejected, (state) => {
      state.userValue.isAuthenticated = false;
      state.userValue.isLoggedIn = false;
      state.userValue.error = null;
    });

    // ========================= PLACES AFTER POSTED RECEIVING FROM SERVER=====================

    builder.addCase(api.postPlaces.pending, (state) => {
      state.places = null;
    });
    builder.addCase(api.postPlaces.fulfilled, (state, action) => {
      // console.log(action.payload.data);
      state.places = action.payload.data;
    });
    builder.addCase(api.postPlaces.rejected, (state, action) => {
      state.places = null;
    });

    // ========================= PLACES AFTER POSTED GETTING FROM MONGO FOR SHOWING CLIENT =====================

    builder.addCase(api.postPlacesGetting.pending, (state, action) => {
      state.getPlaces = null;
    });
    builder.addCase(api.postPlacesGetting.fulfilled, (state, action) => {
      // console.log(action.payload.data);
      state.getPlaces = action.payload.data;
    });
    builder.addCase(api.postPlacesGetting.rejected, (state, action) => {
      state.getPlaces = null;
    });
  },
});

export const { removeUser } = userSlice.actions;

export default userSlice.reducer;
