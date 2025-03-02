import ToDoList from '@/components/ToDoList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todo list',
  description: 'Todo list ',
};
export default function ToDoListPage() {
  return <ToDoList />;
}
