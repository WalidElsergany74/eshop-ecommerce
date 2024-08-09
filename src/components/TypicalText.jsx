import React, { useEffect, useState } from 'react'
import 'animate.css';
export default function TypicalText({text}) {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

  
    useEffect(() => {
        let typingSpeed = 100;
        let deletingSpeed = 50;
        let delayBeforeDeleting = 1000;
    
        if (!deleting && index < text.length) {
          const timeoutId = setTimeout(() => {
            setDisplayedText(prev => prev + text.charAt(index));
            setIndex(prev => prev + 1);
          }, typingSpeed);
          return () => clearTimeout(timeoutId);
        } else if (deleting && index > 0) {
          const timeoutId = setTimeout(() => {
            setDisplayedText(prev => prev.slice(0, -1));
            setIndex(prev => prev - 1);
          }, deletingSpeed);
          return () => clearTimeout(timeoutId);
        } else if (index === text.length && !deleting) {
          const timeoutId = setTimeout(() => {
            setDeleting(true);
          }, delayBeforeDeleting);
          return () => clearTimeout(timeoutId);
        } else if (index === 0 && deleting) {
          setDeleting(false);
        }
      }, [index, text, deleting]);

      

  return (
    <>
    
      <h2 className="text-4xl font-bold">
      {displayedText}
      <span
      className="blinking-cursor inline-block ml-1 w-[10px] text-cyan-600 
        animate__animated  animate__flash animate__delay-1s animate__fast animate__infinite
      ">|</span>
    </h2>

    </>
  )


 
};

