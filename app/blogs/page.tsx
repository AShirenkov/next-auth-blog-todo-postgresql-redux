'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, filterBlogs } from '@/store/slices/blogsSlice';
import { RootState, AppDispatch } from '@/store';
import Link from 'next/link';

export default function Blogs() {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredBlogs, status } = useSelector(
    (state: RootState) => state.blogs
  );
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    dispatch(filterBlogs(event.target.value));
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Failed to load blogs.</p>;

  return (
    <div>
      <h1>Blogs</h1>
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredBlogs.map((blog) => (
        <div key={blog.id}>
          <h2>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </h2>
        </div>
      ))}
    </div>
  );
}
