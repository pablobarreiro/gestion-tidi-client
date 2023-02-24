import { createAction, createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import axios from "axios";
import { getBudgetRoute } from "../uris";

export const getBudget = createAsyncThunk("GET_BUDGET", async (projectId) => {
  try {
    const project = await axios.get(getBudgetRoute(projectId));
    return project.data;
  } catch (err) {
    console.log(err);
  }
});

export const clearBudget = createAction("clearBudget");

const budgetReducer = createReducer(null, (builder) => {
  builder.addCase(getBudget.fulfilled, (state, action) => action.payload);
  builder.addCase(clearBudget, (state, action) => action.payload);
});

export default budgetReducer;
