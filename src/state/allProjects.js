import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import {getAllAdminProjectsRoute, getAllProjectsRoute } from "../uris";


export const getAllProjects = createAsyncThunk("GET_ALL_PROJECTS", async () => {
  try {
    const project = await axios.get(getAllProjectsRoute())
    return project.data
  } catch (err) {
    console.log(err)
  }
})

export const getAllAdminProjects = createAsyncThunk("GET_ALL_ADMIN_PROJECTS", async () => {
  try {
    const project = await axios.get(getAllAdminProjectsRoute())
    return project.data
  } catch (err) {
    console.log(err)
  }
})

export const clearAllProjects = createAction('clearProject')

const allProjectsReducer = createReducer(null, (builder)=> {
  builder.addCase(getAllProjects.fulfilled, (state, action) => action.payload)
  builder.addCase(getAllAdminProjects.fulfilled, (state, action) => action.payload)
  builder.addCase(clearAllProjects, (state, action) => action.payload)
});

export default allProjectsReducer;
