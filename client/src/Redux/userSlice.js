import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { userSignUp } from "../backendConnections/userFunctions";
import { userLogin } from "../backendConnections/userFunctions";

const initialState = {
  userData: {},
  userLoading: false,
  userLogin: false,
  userContactList: [],
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSigningUp: async (state, { payload }) => {
      // state.userLoading = true;
      // const { userName, email, password } = payload;
      // const response = await userSignUp(email, password, userName);
      // console.log(response);
      // if (response.data.message === "User registered") {
      //   alert("Registered");
      //   state.userLoading = false;
      // } else {
      //   alert(response.message);
      // }
    },
    userSigningIn: (state, { payload }) => {
      const { message, user } = payload;
      // state.userLoading = true;
      // state.userLogin = true;

      if (message === "Success") {
        state.userLogin = true;
        state.userLoading = false;
        alert(`Welcome ${user}`);
      } else {
        alert(`Please try again`);
      }
      // console.log(response.data);
    },

    userVerify: (state, { payload }) => {
      const { user } = payload;
      state.userData = user;
      console.log(user);
    },

    getContactList: (state, { payload }) => {
      const { contactList } = payload;
      state.userContactList = contactList;
    },
  },
});

export default userReducer.reducer;
export const { userSigningUp, userSigningIn, userVerify, getContactList } =
  userReducer.actions;
