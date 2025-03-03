import { create } from 'zustand';

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
    const response = await fetch('/api/todos');
    const data = await response.json();
    set({ todos: data });
  },
  addTodo: async (text) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' },
    });
    const newTodo = await response.json();
    set((state) => ({ todos: [...state.todos, newTodo] }));
  },
  deleteTodo: async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
  },
}));
