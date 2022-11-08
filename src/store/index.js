import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import projectReducer from "./project";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    user: userReducer,
    project: projectReducer,
  },
});

export default store;
