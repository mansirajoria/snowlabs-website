import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
  duration?: number;
}
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0.2,
  distance = 50,
  direction = 'up',
  once = true,
  duration = 0.6
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    once,
    margin: '-100px'
  });
  const directionMap = {
    up: {
      y: distance
    },
    down: {
      y: -distance
    },
    left: {
      x: distance
    },
    right: {
      x: -distance
    }
  };
  const initial = {
    opacity: 0,
    ...directionMap[direction]
  };
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }
      });
    }
  }, [controls, inView, delay, duration]);
  return <motion.div ref={ref} initial={initial} animate={controls} className={className}>
      {children}
    </motion.div>;
};
export default AnimatedSection;