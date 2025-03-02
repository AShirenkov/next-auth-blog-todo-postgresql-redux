'use client';

import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import block from 'bem-css-modules';
import styles from './BlogPost.module.scss';

export default function BlogPost() {
  const b = block(styles);

  const { id } = useParams();
  const blog = useSelector((state: RootState) =>
    state.blogs.blogs.find((b) => b.id === Number(id))
  );

  if (!blog) return <p className={b('error')}>Blog not found...</p>;

  return (
    <div className={b('')}>
      <h1 className={b('title')}>{blog.title}</h1>
      <p className={b('body')}>{blog.body}</p>
    </div>
  );
}
