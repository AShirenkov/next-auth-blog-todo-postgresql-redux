import { waitFor } from '@testing-library/react';
import { useBlogStore } from './useBlogStore';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, title: 'First blog', body: 'Content of the first blog' },
        { id: 2, title: 'Second blog', body: 'Content of the second blog' },
      ]),
  })
) as jest.Mock;

describe('Zustand Blog Store tests', () => {
  beforeEach(() => {
    useBlogStore.setState({ blogs: [], filteredBlogs: [], status: 'idle' });
  });

  it('should fetch blogs', async () => {
    useBlogStore.getState().fetchBlogs();

    await waitFor(() => {
      const { blogs, status } = useBlogStore.getState();
      expect(status).toBe('idle');
      expect(blogs.length).toBe(2);
      expect(blogs[0].title).toBe('First blog');
    });
  });

  it('should filter blogs by title', async () => {
    useBlogStore.setState({
      blogs: [
        { id: 1, title: 'First blog', body: 'Content' },
        { id: 2, title: 'Second blog', body: 'Content' },
      ],
      filteredBlogs: [
        { id: 1, title: 'First blog', body: 'Content' },
        { id: 2, title: 'Second blog', body: 'Content' },
      ],
    });

    useBlogStore.getState().filterBlogs('First');

    await waitFor(() => {
      const { filteredBlogs } = useBlogStore.getState();
      expect(filteredBlogs.length).toBe(1);
      expect(filteredBlogs[0].title).toBe('First blog');
    });
  });

  it('should handle failed blog fetch', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject('Error fetching blogs')
    ) as jest.Mock;

    useBlogStore.getState().fetchBlogs();

    await waitFor(() => {
      const { status } = useBlogStore.getState();
      expect(status).toBe('failed');
    });
  });
});
