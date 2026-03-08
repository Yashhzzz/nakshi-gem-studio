import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 right-0 z-[99] pointer-events-none top-[60px] md:top-[72px]"
      style={{
        height: 2,
        background: '#B8860B',
        scaleX: scrollYProgress,
        transformOrigin: 'left',
      }}
    />
  );
};

export default ScrollProgress;
