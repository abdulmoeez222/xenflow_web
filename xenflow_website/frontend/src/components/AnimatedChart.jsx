import React, { useEffect, useState, useMemo } from 'react';

export default function AnimatedChart({ type, value, color, revealed, id }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const gradientId = useMemo(() => `gradient-${id || Math.random().toString(36).substr(2, 9)}`, [id]);

  useEffect(() => {
    if (revealed) {
      let startTime = null;
      const duration = 1500;
      const startValue = 0;
      const endValue = value;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (endValue - startValue) * easeOutCubic;
        setAnimatedValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimatedValue(endValue);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [value, revealed]);

  if (type === 'circle') {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (animatedValue / 100) * circumference;

    return (
      <div className="relative w-24 h-24">
        <svg className="transform -rotate-90 w-24 h-24">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-white/20"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{Math.round(animatedValue)}%</span>
        </div>
      </div>
    );
  }

  if (type === 'bar') {
    // Map color strings to actual gradient colors
    const getGradientColors = (colorStr) => {
      if (colorStr.includes('blue')) return 'from-blue-500 to-cyan-400';
      if (colorStr.includes('green')) return 'from-green-500 to-emerald-400';
      if (colorStr.includes('purple')) return 'from-purple-500 to-pink-400';
      if (colorStr.includes('orange')) return 'from-orange-500 to-red-400';
      return 'from-accent to-accent2';
    };

    return (
      <div className="w-full h-32 flex flex-col justify-end">
        <div className="relative w-full bg-white/10 rounded-t-lg overflow-hidden" style={{ height: '100px' }}>
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${getGradientColors(color)} rounded-t-lg transition-all duration-1000 ease-out`}
            style={{
              height: `${animatedValue}%`,
              transition: 'height 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg drop-shadow-lg">{Math.round(animatedValue)}%</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'line') {
    const points = [];
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * 100;
      const y = 100 - (animatedValue * (i / 10));
      points.push(`${x},${y}`);
    }

    return (
      <div className="w-full h-32 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`${gradientId}-line`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>
          <polyline
            points={points.join(' ')}
            fill="none"
            stroke={`url(#${gradientId}-line)`}
            strokeWidth="3"
            className="transition-all duration-1000"
          />
          <polygon
            points={`0,100 ${points.join(' ')} 100,100`}
            fill={`url(#${gradientId}-line)`}
            fillOpacity="0.2"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <span className="text-white font-bold text-lg drop-shadow-lg">{Math.round(animatedValue)}%</span>
        </div>
      </div>
    );
  }

  return null;
}

