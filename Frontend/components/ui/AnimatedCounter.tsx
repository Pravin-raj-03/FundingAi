import React, { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  end, 
  duration = 1000, 
  decimals = 0,
  prefix = "", 
  suffix = "" 
}) => {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);
  const previousEndRef = useRef<number>(0);

  useEffect(() => {
    const startValue = previousEndRef.current;
    startTimeRef.current = null;
    
    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const progress = time - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Ease out quart
      const ease = 1 - Math.pow(1 - percentage, 4);
      
      const currentCount = startValue + (end - startValue) * ease;
      setCount(currentCount);

      if (percentage < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        previousEndRef.current = end;
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [end, duration]);

  return <span>{prefix}{count.toFixed(decimals)}{suffix}</span>;
}