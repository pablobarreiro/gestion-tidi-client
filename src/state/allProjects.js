import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import {getAllProjectsRoute } from "../uris";


export const getAllProjects = createAsyncThunk("GET_ALL_PROJECTS", async () => {
  try {
    const project = await axios.get(getAllProjectsRoute())
    return project.data
  } catch (err) {
    console.log(err)
  }
})

const allProjectsReducer = createReducer(null, (builder)=> {
  builder.addCase(getAllProjects.fulfilled, (state, action) => action.payload)
});

export default allProjectsReducer;
