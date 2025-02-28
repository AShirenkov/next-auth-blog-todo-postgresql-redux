import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ToDo {
  id: string;
  text: string;
}

interface ToDoState {
  todos: ToDo[];
}

const initialState: ToDoState = {
  todos: [],
};

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await fetch("/api/todos");
  return response.json();
});

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (text: string) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    return id;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<ToDo[]>) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<ToDo>) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
