import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/styles/globals.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faBriefcase, faBlog, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";

import { LayoutTransition } from "@/components/layout-transition";

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
    <html lang="vi">
      <body className={poppins.className}>
        <nav className="navbar">
          <Link href="/"> <FontAwesomeIcon icon={faHome}/> <span>home</span> </Link>
          <Link href="/about"> <FontAwesomeIcon icon={faUser}/> <span>about</span> </Link>
          <Link href="/portfolio"> <FontAwesomeIcon icon={faBriefcase}/> <span>portfolio</span> </Link>
          <Link href="/blogs"> <FontAwesomeIcon icon={faBlog}/> <span>blogs</span> </Link>
          <Link href="/contact"> <FontAwesomeIcon icon={faAddressBook}/> <span>contact</span> </Link>
        </nav>
        <LayoutTransition
          initial={{ opacity: 0, y: '100vh', scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: '100vw', scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", width: "100%", top: 0, left: 0 }}
        >
          {children}
        </LayoutTransition>
      </body>
    </html>
  );
}
