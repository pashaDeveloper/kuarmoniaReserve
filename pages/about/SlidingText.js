import React, { useState, useEffect } from 'react';

const SlidingText = () => {
  const texts = [
    'متن اول',
    'متن دوم',
    'متن سوم',
    'متن چهارم',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [linePosition, setLinePosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLinePosition((prevPosition) => (prevPosition === 100 ? 0 : 100));
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); // تغییر متن هر 3 ثانیه

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-16 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex items-center">
        {/* خط عمودی */}
        <div
          className="absolute top-0 left-0 w-1 bg-black"
          style={{
            transform: `translateX(${linePosition}%)`,
            transition: 'transform 1.5s ease-in-out',
            height: '100%',
          }}
        />
        {/* نمایش متن‌ها */}
        <div className="absolute top-0 left-0 w-full flex justify-center items-center">
          <div className="text-center text-xl">{texts[currentIndex]}</div>
        </div>
      </div>
    </div>
  );
};

export default SlidingText;
