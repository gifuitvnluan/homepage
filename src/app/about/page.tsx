import type { Metadata } from 'next'
import ClientAbout from './ClientAbout';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Luân',
};

export default function About() {

  return (
    <ClientAbout />
  );
}
