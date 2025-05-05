import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/themeContext';

const ThemeAnimationWrapper = ({ children }) => {
  const { theme, isChanging } = useContext(ThemeContext);
  const [key, setKey] = useState(theme);
  
  // Reset animation when theme changes
  useEffect(() => {
    if (isChanging) {
      // Generate new key to force re-mount and new animation
      setKey(`${theme}-${Date.now()}`);
    }
  }, [theme, isChanging]);

  return (
    <div key={key} className="animate-with-theme">
      {children}
    </div>
  );
};

export default ThemeAnimationWrapper;