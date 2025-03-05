'use client';

import { useParams } from 'next/navigation';
import { useBlogStore } from '@/store/useBlogStore';
import block from 'bem-css-modules';
import styles from './page.module.scss';

export default function BlogPost() {
  const b = block(styles);
  const { id } = useParams();

  const blogs = useBlogStore((state) => state.blogs);

  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) return <p className={b('error')}>Blog not found...</p>;

  return (
    <div className={b('')}>
      <h1 className={b('title')}>{blog.title}</h1>
      <p className={b('body')}>{blog.body}</p>
    </div>
  );
}
