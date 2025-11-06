import type { Metadata } from 'next'
import ClientBlogs from './ClientBlogs';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Read the latest blogs from Luân',
};

export default function Blogs() {

  return (
    <ClientBlogs />
  );
}
