"use client";

import { useState, useEffect } from "react";

export default function ReadingProgress() {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollCompletion);
    
    // Initial call
    updateScrollCompletion();

    return () => {
      window.removeEventListener("scroll", updateScrollCompletion);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-gray-100">
      <div 
        className="h-full bg-accent-dark transition-all duration-150 ease-out" 
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
}
