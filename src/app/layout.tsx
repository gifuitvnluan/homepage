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
    <html lang="en">
      <body className={poppins.className}>
        <nav className="navbar">
          <Link href="/"> <FontAwesomeIcon icon={faHome}/> <span>home</span> </Link>
          <Link href="/about"> <FontAwesomeIcon icon={faUser}/> <span>about</span> </Link>
          <Link href="/portfolio"> <FontAwesomeIcon icon={faBriefcase}/> <span>portfolio</span> </Link>
          <Link href="/blogs"> <FontAwesomeIcon icon={faBlog}/> <span>blogs</span> </Link>
          <Link href="/contact"> <FontAwesomeIcon icon={faAddressBook}/> <span>contact</span> </Link>
        </nav>
        <LayoutTransition
          initial={{ 
            opacity: 0, 
            y: '100vh',    // Vào từ dưới màn hình (100% chiều cao viewport)
            scale: 0.8     // Bắt đầu nhỏ (80% kích thước gốc) để phóng to
          }}
          animate={{ 
            opacity: 1, 
            y: 0,          // Slide lên vị trí trung tâm
            scale: 1       // Phóng to về kích thước đầy đủ
          }}
          exit={{ 
            opacity: 0,    // Fade-out (giữ nguyên như cũ)
            x: '100vw',    // Slide ra bên phải (giữ nguyên như cũ)
            scale: 0.95    // Scale nhỏ lại nhẹ (giữ nguyên như cũ)
          }}
          transition={{ 
            duration: 0.5,               // Thời gian 400ms, mượt mà
            ease: [0.22, 1, 0.36, 1]    // Easing curve tự nhiên (bắt đầu chậm, kết thúc mượt)
            // Nếu muốn enter và exit có easing khác, có thể tách: transition={{ enter: {...}, exit: {...} }}
          }}
          style={{ 
            position: "absolute", 
            width: "100%", 
            top: 0, 
            left: 0 
          }}
        >
          {children}
        </LayoutTransition>
      </body>
    </html>
  );
}
