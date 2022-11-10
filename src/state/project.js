import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { getProjectRoute, createProjectRoute, editProjectRoute } from "../uris";


export const getProject = createAsyncThunk("GET_PROJECT", async (projectNumber) => {
  try {
    const project = await axios.get(getProjectRoute(projectNumber))
    return project.data
  } catch (err) {
    console.log(err)
  }
})

export const createProject = createAsyncThunk("CREATE_PROJECT", async () => {
  try {
    await axios.post(createProjectRoute())
  } catch (err) {
    console.log(err)
  }
})

export const editProject = createAsyncThunk("EDIT_PROJECT", async () => {
  try {
    await axios.put(editProjectRoute())
  } catch (err) {
    console.log(err)
  }
})

const projectReducer = createReducer(null, (builder)=> {
  builder.addCase(getProject.fulfilled, (state, action) => action.payload)
});

export default projectReducer;
