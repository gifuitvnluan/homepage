"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";  // ← Thêm import này (thay vì useSelectedLayoutSegment)
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useEffect, useRef } from "react";

// Hook usePreviousValue giữ nguyên (đã fix trước)
function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T | undefined>(undefined);
  
  useEffect(() => {
    prevValue.current = value;
    return () => {
      prevValue.current = undefined;
    };
  }, [value]);

  return prevValue.current;
}

// FrozenRouter cập nhật: Dùng pathname thay segment
function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) || null;
  const pathname = usePathname();  // ← Thay useSelectedLayoutSegment() bằng usePathname()
  const prevPathname = usePreviousValue(pathname);

  // Changed logic: So sánh pathname (luôn string, không undefined)
  const changed =
    pathname !== prevPathname &&
    prevPathname !== undefined;  // Bỏ segment !== undefined vì pathname luôn có giá trị

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

interface LayoutTransitionProps {
  children: React.ReactNode;
  className?: React.ComponentProps<typeof motion.div>["className"];
  style?: React.ComponentProps<typeof motion.div>["style"];
  initial: React.ComponentProps<typeof motion.div>["initial"];
  animate: React.ComponentProps<typeof motion.div>["animate"];
  transition: React.ComponentProps<typeof motion.div>["transition"];
  exit: React.ComponentProps<typeof motion.div>["exit"];
}

export function LayoutTransition({
  children,
  className,
  style,
  initial,
  animate,
  transition,
  exit,
}: LayoutTransitionProps) {
  const pathname = usePathname();  // ← Thay segment bằng pathname cho key

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className={className}
        style={style}
        key={pathname}  // ← Key dựa trên pathname: "/" cho home, "/about" cho about → unique luôn
        initial={initial}
        animate={animate}
        transition={transition}
        exit={exit}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
