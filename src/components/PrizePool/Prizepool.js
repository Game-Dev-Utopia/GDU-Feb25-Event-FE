import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const PrizePool = () => {
  const [count, setCount] = useState(0);
  const componentRef = useRef(null);
  const endValue = 30000;
  const duration = 4000; // Duration in ms

  // Function to animate the count-up every time it enters view
  const handleInView = () => {
    let currentValue = 0;
    const increment = endValue / (duration / 100);

    const updateCount = () => {
      currentValue += increment;
      if (currentValue < endValue) {
        setCount(Math.round(currentValue));
        requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
        celebrate(); // Trigger confetti
      }
    };

    setCount(0); // Reset count before each trigger
    updateCount();
  };

  const celebrate = () => {
    const duration = 1000; // 2 seconds
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
      className="flex flex-col items-center justify-center text-center text-burntOrange font-cinzel relative"
    >
      <motion.div
        className="text-overlay"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.5 }} // Allows re-triggering
        onViewportEnter={handleInView} // Triggers animation on enter
      >
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-3xl md:text-6xl mb-4 heading font-bold"
        >
          With prize pool worth more than
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(15px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: false, amount: 0.5 }}
          className="text-6xl md:text-[10rem] count-up font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-mysticPurple to-burntOrange"
        >
          ₹{count.toLocaleString()}
        </motion.div>
      </motion.div>

      <canvas
        id="confettiCanvas"
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      ></canvas>
    </div>
  );
};

export default PrizePool;
