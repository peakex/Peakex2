import React from 'react';
import { motion } from 'motion/react';

export function FadeIn({ children, delay = 0, className = '', as = 'div', ...props }: any) {
  const Component = motion[as] as any;
  
  return (
    <Component
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.75, ease: "easeOut", delay }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}