'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/index';
import { fetchTodos, addTodo, deleteTodo } from '@/store/slices/todoSlice';
import block from 'bem-css-modules';
import styles from './ToDoList.module.scss';
import ToDoItem from './ToDoItem';

const b = block(styles);

export default function ToDoList() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const [task, setTask] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = () => {
    if (task.trim()) {
      dispatch(addTodo(task));
      setTask('');
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className={b('')}>
      <h1 className={b('title')}>ToDo List</h1>
      <div className={b('input-container')}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New task..."
          className={b('input')}
        />
        <button onClick={handleAdd} className={b('button', { add: true })}>
          Add Task
        </button>
      </div>
      {todos.length === 0 ? (
        <p className={b('empty-message')}>No tasks yet. Add your first task!</p>
      ) : (
        <ul className={b('list')}>
          {todos.map((todo) => (
            <ToDoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
