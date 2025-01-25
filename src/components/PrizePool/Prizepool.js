import React, { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";

const PrizePool = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);
  const endValue = 30000;
  const duration = 4000; // Duration in ms

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the component is visible
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let currentValue = 0;
      const increment = endValue / (duration / 100);

      const updateCount = () => {
        currentValue += increment;
        if (currentValue < endValue) {
          setCount(Math.round(currentValue));
          requestAnimationFrame(updateCount);
        } else {
          setCount(endValue);
          celebrate(); // Trigger celebration effects
        }
      };

      updateCount();
    }
  }, [isVisible]);

  const celebrate = () => {
    const duration = 2000; // 2 seconds
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  return (
    <div
      ref={componentRef}
      className="flex flex-col items-center justify-center text-center text-goldenrod font-cinzel"
    >
      <div className="animate-fade-in text-overlay">
        <div className="text-4xl mb-4 heading font-bold">With prize pool worth more than</div>
        <div className="text-[10rem] font-bold count-up">₹{count.toLocaleString()}+</div>
      </div>
      <canvas
        id="confettiCanvas"
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      ></canvas>
    </div>
  );
};

export default PrizePool;
