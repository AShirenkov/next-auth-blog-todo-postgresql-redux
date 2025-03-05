import { create } from 'zustand';
import { fetchTodos, addTodo, deleteTodo } from '@/entities/todo/api/todoApi';

interface ToDo {
  id: string;
  text: string;
}

interface ToDoState {
  todos: ToDo[];
  fetchTodos: () => Promise<void>;
  addTodo: (text: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export const useTodoStore = create<ToDoState>((set) => ({
  todos: [],
  fetchTodos: async () => {
    const todos = await fetchTodos();
    set({ todos });
  },
  addTodo: async (text) => {
    const newTodo = await addTodo(text);
    set((state) => ({ todos: [...state.todos, newTodo] }));
  },
  deleteTodo: async (id) => {
    await deleteTodo(id);
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
  },
}));
