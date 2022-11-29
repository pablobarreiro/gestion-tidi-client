import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import projectReducer from "./project";
import allProjectsReducer from "./allProjects";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    user: userReducer,
    project: projectReducer,
    allProjects: allProjectsReducer,
  },
});

export default store;
