'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

type Props = {
  value: number
  duration?: number
}

export default function CountUp({ value, duration = 1.8 }: Props) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, latest => Math.round(latest))

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: 'easeOut',
    })

    return controls.stop
  }, [value, duration])

  return <motion.span>{rounded}</motion.span>
}
