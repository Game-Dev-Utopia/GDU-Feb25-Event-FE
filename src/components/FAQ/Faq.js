import React, { useState, useRef } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [height, setHeight] = useState({}); // Dynamic height tracking
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setHeight((prev) => ({ ...prev, [index]: 0 }));
      setTimeout(() => setActiveIndex(null), 300); // Smooth transition
    } else {
      setActiveIndex(index);
      setHeight((prev) => ({
        ...prev,
        [index]: contentRefs.current[index]?.scrollHeight || 0,
      }));
    }
  };

  const faqs = [
    {
      question: "What is Game Dev Utopia?",
      answer:
        "Game Dev Utopia is a club in the PICT which helps the students to explore their interests in the game development domain and provides an exposure to them about the development process.",
    },
    {
      question: "What's the event all about?",
      answer:
        "The event is all about mini games, treasure hunt events, and many exciting things, including lectures delivered by special guests in the college.",
    },
    {
      question: "How can I register for the event?",
      answer:
        "It's very simple. Just fill up the form circulated on the class groups and you're eligible to participate in it!",
    },
    {
      question: "When is the event happening?",
      answer:
        "The event is on 17, 18, and 19 February 2025 after the college hours in PICT itself. You may participate in it and have a fun evening after college!",
    },
  ];

  return (
    <div
      id="faq"
      className="relative flex justify-center p-5 mt-10 font-playfair"
    >
      <div className="w-full md:w-[60%] p-5 bg-charcoalGray bg-opacity-50 rounded-lg">
        <div className="text-center mb-5 text-4xl sm:text:5xl md:text-6xl font-bold font-cinzel text-burntOrange">
          Frequently Asked Questions
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="p-1 md:p-3 rounded-lg">
              <div
                className="accordion-header cursor-pointer flex items-center space-x-3 p-3 bg-black bg-opacity-50 rounded-lg hover:bg-gray-700 text-burntOrange"
                onClick={() => toggleAccordion(index)}
              >
                {activeIndex === index ? <FaMinus /> : <FaPlus />}
                <h3 className="text-ld md:text-xl font-semibold ">
                  {faq.question}
                </h3>
              </div>
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className="accordion-content overflow-hidden transition-all duration-300 ease-out text-left"
                style={{
                  maxHeight: activeIndex === index ? height[index] : 0,
                }}
              >
                <p className="p-4 text-white text-md md:text-xl">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
