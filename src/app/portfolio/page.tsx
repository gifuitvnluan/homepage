import type { Metadata } from 'next'
import ClientPortfolio from './ClientPortfolio';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore Luân\'s projects and case studies',
};

export default function Portfolio() {

  return (
    <ClientPortfolio />
  );
}
