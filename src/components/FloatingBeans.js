'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const beans = [
  { id: 1, side: 'left',  edge: '2.5%', top: '14%', size: 40, angle: -28, speed: 0.025, phase: 0,    duration: 7.5, delay: 0 },
  { id: 2, side: 'right', edge: '3.5%', top: '24%', size: 30, angle: 34,  speed: -0.018, phase: 800,  duration: 8.8, delay: -2.1 },
  { id: 3, side: 'left',  edge: '7%',   top: '47%', size: 26, angle: 18,  speed: 0.032, phase: 1500, duration: 6.9, delay: -4.2 },
  { id: 4, side: 'right', edge: '7.5%', top: '58%', size: 44, angle: -42, speed: 0.022, phase: 2200, duration: 9.4, delay: -1.4 },
  { id: 5, side: 'left',  edge: '3.5%', top: '78%', size: 34, angle: 48,  speed: -0.026, phase: 2900, duration: 8.1, delay: -5.3 },
  { id: 6, side: 'right', edge: '2%',   top: '84%', size: 26, angle: 8,   speed: 0.035, phase: 3600, duration: 7.2, delay: -3 },
  { id: 7, side: 'left',  edge: '11%',  top: '31%', size: 21, angle: -8,  speed: -0.02, phase: 4300, duration: 9.8, delay: -6.1 },
  { id: 8, side: 'right', edge: '12%',  top: '42%', size: 22, angle: 62,  speed: 0.028, phase: 5000, duration: 7.8, delay: -2.8 },
];

function FloatingBean({ bean, reducedMotion, scrollY }) {
  const y = useTransform(scrollY, (value) => reducedMotion ? 0 : value * bean.speed);
  const rotate = useTransform(scrollY, (value) => reducedMotion ? bean.angle : bean.angle + value * bean.speed * 0.12);
  const opacity = useTransform(scrollY, (value) => {
    if (reducedMotion) return 0.22;
    const wave = (Math.sin((value + bean.phase) * 0.0022) + 1) / 2;
    return 0.26 + wave * 0.2;
  });

  return (
    <motion.span
      className={`floating-bean floating-bean-${bean.id}`}
      style={{
        top: bean.top,
        [bean.side]: bean.edge,
        width: bean.size,
        height: bean.size * 1.45,
        y,
        rotate,
        opacity,
      }}
    >
      <span
        className="floating-bean-shape"
        style={{
          animationDuration: `${bean.duration}s`,
          animationDelay: `${bean.delay}s`,
        }}
      />
    </motion.span>
  );
}

export default function FloatingBeans() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  return (
    <div className="floating-beans-layer" aria-hidden="true">
      {beans.map((bean) => (
        <FloatingBean key={bean.id} bean={bean} reducedMotion={reducedMotion} scrollY={scrollY} />
      ))}
    </div>
  );
}
