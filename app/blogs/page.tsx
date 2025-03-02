'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import block from 'bem-css-modules';

import { fetchBlogs, filterBlogs } from '@/store/slices/blogsSlice';
import { RootState, AppDispatch } from '@/store';
import BlogItem from '@/components/BlogItem';
import styles from './Blogs.module.scss';

export default function Blogs() {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredBlogs, status } = useSelector(
    (state: RootState) => state.blogs
  );
  const [searchTerm, setSearchTerm] = useState('');

  const b = block(styles);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    dispatch(filterBlogs(event.target.value));
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
