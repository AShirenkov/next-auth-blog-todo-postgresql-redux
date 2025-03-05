'use client';

import { useEffect, useState } from 'react';
import { useBlogStore } from '@/entities/blog/model/useBlogStore';
import block from 'bem-css-modules';
import BlogItem from '@/components/Blogs/BlogItem/BlogItem';
import styles from './Blogs.module.scss';

const b = block(styles);

export default function Blogs() {
  const { filteredBlogs, status, fetchBlogs, filterBlogs } = useBlogStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    filterBlogs(event.target.value);
  };

  if (status === 'loading') return <p className={b('loading')}>Loading...</p>;
  if (status === 'failed')
    return <p className={b('error')}>Failed to load blogs.</p>;

  return (
    <div className={b('')}>
      <h1 className={b('title')}>Blogs</h1>
      <input
        className={b('search')}
        type="text"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className={b('list')}>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogItem key={blog.id} title={blog.title} id={blog.id} />
          ))
        ) : (
          <p className={b('empty')}>No blogs found.</p>
        )}
      </div>
    </div>
  );
}
