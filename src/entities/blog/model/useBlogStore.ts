import { create } from 'zustand';
import { fetchBlogs } from '@/entities/blog/api/blogApi';

export interface Blog {
  id: number;
  title: string;
  body: string;
}

interface BlogsState {
  blogs: Blog[];
  filteredBlogs: Blog[];
  status: 'idle' | 'loading' | 'failed';
  fetchBlogs: () => Promise<void>;
  filterBlogs: (keyword: string) => void;
}

export const useBlogStore = create<BlogsState>((set) => ({
  blogs: [],
  filteredBlogs: [],
  status: 'idle',
  fetchBlogs: async () => {
    set({ status: 'loading' });
    try {
      const data = await fetchBlogs();
      set({ blogs: data, filteredBlogs: data, status: 'idle' });
    } catch {
      set({ status: 'failed' });
    }
  },
  filterBlogs: (keyword) => {
    set((state) => ({
      filteredBlogs: state.blogs.filter((blog) =>
        blog.title.toLowerCase().includes(keyword.toLowerCase())
      ),
    }));
  },
}));
