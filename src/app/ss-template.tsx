// app/template.tsx
'use client'; // template.tsx cũng cần 'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Import CSS/Styles nếu cần
import "@/app/styles/globals.css";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Vẫn cần một container bọc ngoài có position: relative để chứa các trang absolute
  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - var(--navbar-height))", paddingTop: "var(--navbar-height)" }}> 
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 1, x: -100 }}
          transition={{ duration: 0.5 }}
          style={{ position: "absolute", width: "100%", top: 0, left: 0 }}
        >
          {/* Children ở đây sẽ được remount mỗi khi chuyển trang */}
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
