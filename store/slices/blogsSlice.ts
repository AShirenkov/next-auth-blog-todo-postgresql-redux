import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Blog {
  id: number;
  title: string;
  body: string;
}

interface BlogsState {
  blogs: Blog[];
  filteredBlogs: Blog[];
  status: "idle" | "loading" | "failed";
}

const initialState: BlogsState = {
  blogs: [],
  filteredBlogs: [],
  status: "idle",
};

// Асинхронный запрос для загрузки всех блогов
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
});

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    filterBlogs(state, action) {
      const keyword = action.payload.toLowerCase();
      state.filteredBlogs = state.blogs.filter((blog) =>
        blog.title.toLowerCase().includes(keyword)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "idle";
        state.blogs = action.payload;
        state.filteredBlogs = action.payload; // По умолчанию показываем все
      })
      .addCase(fetchBlogs.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { filterBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;
