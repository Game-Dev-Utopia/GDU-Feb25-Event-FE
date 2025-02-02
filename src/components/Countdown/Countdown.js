import FlipCountdown from "@rumess/react-flip-countdown";
import { motion } from "framer-motion";

function Countdown() {
  return (
    <div className="bg-cover flex justify-center items-center">
      <div className="font-bold text-white tracking-widest text-center font-cinzel">
        {/* Focus-In Animation for "WE'RE LAUNCHING SOON" */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)"}}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }} // Triggers every time on scroll
          className="text-3xl md:text-6xl tracking-[10px] mb-16 text-burntOrange"
        >
          WE'RE LAUNCHING SOON
        </motion.h1>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: false, amount: 0.5 }}
          className="text=[#C49A3E] font-cinzel"
        >
          <FlipCountdown
            hideYear
            hideMonth
            theme="dark"
            size="large"
            titlePosition="bottom"
            endAt={new Date("2025-02-17T11:00:00Z").toUTCString()} // Set to 17 Feb 2025
            dayTitle="DAYS"
            hourTitle="HOURS"
            minuteTitle="MINUTES"
            secondTitle="SECONDS"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Countdown;
