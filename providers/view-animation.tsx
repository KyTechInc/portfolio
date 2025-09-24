'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ComponentProps, ReactNode } from 'react';

type ViewAnimationProps = {
  initial?: ComponentProps<typeof motion.div>['initial'];
  whileInView?: ComponentProps<typeof motion.div>['whileInView'];
  animate?: ComponentProps<typeof motion.div>['animate'];
  delay?: number;
  // className?: ComponentProps<typeof motion.div>['className'];
  className?: string;
  children: ReactNode;
};

export const ViewAnimation = ({
  initial,
  whileInView,
  animate,
  delay,
  className,
  children,
}: ViewAnimationProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      animate={animate}
      className={className}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
