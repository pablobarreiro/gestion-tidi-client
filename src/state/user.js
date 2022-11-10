import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { loginRoute, createUserRoute, logoutRoute, persistRoute } from "../uris";

export const userRegister = createAsyncThunk("USER_REGISTER", async (registerValues) => {
  try {
    await axios.post(createUserRoute(), registerValues)
  } catch (err) {
    console.log(err)
  }
});

export const userLogin = createAsyncThunk("USER_LOGIN", async (loginValues) => {
  try {
    const user = await axios.post(loginRoute(), loginValues)
    localStorage.setItem("user_values", JSON.stringify(user.data));
    return user.data
  } catch (err) {
    console.log(err)
  }
});

export const getUser = createAsyncThunk("GET_USER", async () => {
  try {
    let user = null
    if(localStorage.getItem("user_values")) user = JSON.parse(localStorage.getItem("user_values"))
    return user.data
  } catch (err) {
    console.log(err)
  }
})

export const userLogout = createAsyncThunk("USER_LOGOUT", async () => {
  try {
    await axios.post(logoutRoute())
    return null
  } catch (err) {
    console.log(err)
  }
});

const userReducer = createReducer(null, {
  [getUser.fulfilled]: (state, action) => action.payload,
  [userLogin.fulfilled]: (state, action) => action.payload,
  [userLogout.fulfilled]: (state, action) => action.payload,
});

export default userReducer;
