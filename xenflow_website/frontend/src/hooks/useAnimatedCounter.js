import { useEffect, useState } from 'react';

export default function useAnimatedCounter(targetValue, duration = 2000, startOnReveal = true, revealed = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startOnReveal || revealed) {
      let startTime = null;
      const startValue = 0;
      const endValue = targetValue;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [targetValue, duration, startOnReveal, revealed]);

  return count;
}

