import { motion } from "framer-motion";

interface FloatingShapeProps {
  className?: string;
  delay?: number;
  duration?: number;
}

export function FloatingShape({ className, delay = 0, duration = 20 }: FloatingShapeProps) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      className={`absolute pointer-events-none opacity-15 mix-blend-multiply blur-3xl ${className}`}
    >
      <div className="w-full h-full bg-gradient-to-br from-black to-black/40 rounded-full" />
    </motion.div>
  );
}
