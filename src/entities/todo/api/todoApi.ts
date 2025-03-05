export const fetchTodos = async () => {
  const response = await fetch('/api/todos');
  return response.json();
};

export const addTodo = async (text: string) => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ text }),
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};

export const deleteTodo = async (id: string) => {
  await fetch(`/api/todos/${id}`, { method: 'DELETE' });
};
