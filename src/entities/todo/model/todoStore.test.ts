import { waitFor } from '@testing-library/react';
import { useTodoStore } from './useTodoStore';

global.fetch = jest.fn();

describe('useTodoStore', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    useTodoStore.setState({ todos: [] });
  });

  it('should fetch todos', async () => {
    const mockTodos = [{ id: '1', text: 'Test todo' }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockTodos),
    });

    useTodoStore.getState().fetchTodos();

    await waitFor(() => {
      expect(useTodoStore.getState().todos).toEqual(mockTodos);
    });
  });

  it('should add a todo', async () => {
    const newTodo = { id: '2', text: 'New todo' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(newTodo),
    });

    useTodoStore.getState().addTodo('New todo');

    await waitFor(() => {
      expect(useTodoStore.getState().todos).toContainEqual(newTodo);
    });
  });

  it('should delete a todo', async () => {
    const initialTodos = [{ id: '1', text: 'Test todo' }];
    useTodoStore.setState({ todos: initialTodos });

    (global.fetch as jest.Mock).mockResolvedValueOnce({});

    useTodoStore.getState().deleteTodo('1');

    await waitFor(() => {
      expect(useTodoStore.getState().todos).toEqual([]);
    });
  });
});
