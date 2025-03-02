'use client';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function BlogPost() {
  const { id } = useParams();
  const blog = useSelector((state: RootState) =>
    state.blogs.blogs.find((b) => b.id === Number(id))
  );

  if (!blog) return <p>Blog not found...</p>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.body}</p>
    </div>
  );
}
