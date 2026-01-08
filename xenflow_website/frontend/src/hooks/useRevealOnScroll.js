import { useEffect, useRef, useState } from 'react';

export default function useRevealOnScroll(threshold = 0.1, rootMargin = '0px 0px -50px 0px') {
  const ref = useRef();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Use requestAnimationFrame for smoother performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use requestAnimationFrame for smoother reveal
            requestAnimationFrame(() => {
              setRevealed(true);
            });
            observer.unobserve(node);
          }
        });
      },
      { 
        threshold,
        rootMargin // Trigger slightly before element enters viewport
      }
    );

    observer.observe(node);
    return () => {
      if (node) {
        observer.unobserve(node);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return [ref, revealed];
} 