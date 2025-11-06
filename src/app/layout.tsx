import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "@/app/styles/globals.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faBriefcase, faBlog, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: '%s | Luân HomePage',
    default: 'Luân HomePage',
  },
  description: 'Welcome to Luân\'s homepage.',
  metadataBase: new URL('https://gifuitvnluan.github.io/homepage/'),
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <nav className="navbar">
            <Link href="/"> <FontAwesomeIcon icon={faHome}/> <span>home</span> </Link>
            <Link href="/about"> <FontAwesomeIcon icon={faUser}/> <span>about</span> </Link>
            <Link href="/portfolio"> <FontAwesomeIcon icon={faBriefcase}/> <span>portfolio</span> </Link>
            <Link href="/blogs"> <FontAwesomeIcon icon={faBlog}/> <span>blogs</span> </Link>
            <Link href="/contact"> <FontAwesomeIcon icon={faAddressBook}/> <span>contact</span> </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
