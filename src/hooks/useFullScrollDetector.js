import { useState, useEffect } from 'react';

const useFullScrollDetector = () => {
   const [isFullScrolled, setIsFullScrolled] = useState(false);

   const detector = () => {
      const scrollSize = window.scrollY + window.innerHeight;
      setIsFullScrolled(scrollSize === document.body.scrollHeight);
   };

   useEffect(() => {
      window.addEventListener('scroll', detector);
      return () => {
         window.removeEventListener('scroll', detector);
      };
   }, [isFullScrolled]);

   return isFullScrolled;
};

export default useFullScrollDetector;