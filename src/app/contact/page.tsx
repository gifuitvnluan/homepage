import type { Metadata } from 'next'
import ClientContact from './ClientContact';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Luân',
};

export default function Contact() {

  return (
      <ClientContact />
  );
}
