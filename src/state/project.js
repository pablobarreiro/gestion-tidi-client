import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { getProjectRoute, createProjectRoute, editProjectRoute, getAdminProjectRoute } from "../uris";


export const getProject = createAsyncThunk("GET_PROJECT", async (projectId) => {
  try {
    const project = await axios.get(getProjectRoute(projectId))
    return project.data
  } catch (err) {
    console.log(err)
  }
})

export const getAdminProject = createAsyncThunk("GET_ADMIN_PROJECT", async (projectId) => {
  try {
    const project = await axios.get(getAdminProjectRoute(projectId))
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

export const clearProject = createAction('clearProject')

const projectReducer = createReducer(null, (builder)=> {
  builder.addCase(getProject.fulfilled, (state, action) => action.payload)
  builder.addCase(getAdminProject.fulfilled, (state, action) => action.payload)
  builder.addCase(clearProject, (state, action) => action.payload)
});

export default projectReducer;
