import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./slices/blogsSlice";
import todoReducer from "./slices/todoSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
