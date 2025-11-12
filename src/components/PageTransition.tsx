'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname} // KEY là BẮT BUỘC để AnimatePresence hoạt động đúng
          initial={{ opacity: 0, x: 100 }} 
          animate={{ opacity: 1, x: 0 }}   
          exit={{ opacity: 0, x: -100 }}  
          transition={{ duration: 0.5 }} 
          // Áp dụng CSS position: absolute
          style={{ position: "absolute", width: "100%" }} 
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
