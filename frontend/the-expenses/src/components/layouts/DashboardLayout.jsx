import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import ThemeAnimationWrapper from "../ThemeAnimationWrapper";
import { ThemeContext } from "../../context/themeContext";
import { UserContext } from "../../context/userContext";
import { AnimatePresence, motion } from "framer-motion";

// Simple PageTransition component implementation
const PageTransition = ({ children, pageType, direction }) => {
  // Animation variants based on direction
  const variants = {
    initial: (direction) => ({
      x: direction === 'forward' ? '100%' : '-100%',
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction === 'forward' ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={pageType}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const DashboardLayout = ({ children, activeMenu }) => {
  const { theme, isChanging } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const [previousMenu, setPreviousMenu] = useState(activeMenu);
  const [transitionDirection, setTransitionDirection] = useState(null);
  
  // Get username from user context
  const username = user?.fullName?.split(' ')[0] || 'User';
  const appTitle = `${username}'s Expense Tracker`;
  
  // Track menu changes to determine animation direction
  useEffect(() => {
    if (activeMenu !== previousMenu) {
      // Define page order for direction determination
      const pageOrder = ['dashboard', 'income', 'expense', 'analytics', 'profile'];
      const prevIndex = pageOrder.indexOf(previousMenu);
      const currentIndex = pageOrder.indexOf(activeMenu);
      
      if (prevIndex !== -1 && currentIndex !== -1) {
        setTransitionDirection(prevIndex < currentIndex ? 'forward' : 'backward');
      } else {
        // Default direction if pages not found in order
        setTransitionDirection('forward');
      }
      
      setPreviousMenu(activeMenu);
    }
  }, [activeMenu, previousMenu]);
  
  // Determine page type based on activeMenu
  const getPageType = () => {
    if (activeMenu === 'dashboard') return 'dashboard';
    if (activeMenu === 'income') return 'income';
    if (activeMenu === 'expense') return 'expense';
    if (activeMenu === 'analytics') return 'analytics';
    if (activeMenu === 'profile') return 'profile';
    return 'dashboard'; // default
  };
  
  return (
    <div 
      className={`flex h-screen transition-colors duration-500 theme-${theme}`} 
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      <div className="hidden lg:block w-[250px] border-r" style={{ borderColor: 'var(--border-color)' }}>
        <SideMenu activeMenu={activeMenu} appTitle={appTitle} />
      </div>
      <div className="flex-1 flex flex-col w-full">
        <Navbar activeMenu={activeMenu} appTitle={appTitle} />
        <div className="flex-1 overflow-y-auto page-viewport">
          <ThemeAnimationWrapper>
            <PageTransition 
              pageType={getPageType()} 
              direction={transitionDirection}
            >
              {children}
            </PageTransition>
          </ThemeAnimationWrapper>
        </div>
      </div>
      
      <div className={`fixed inset-0 pointer-events-none ${theme}-theme-bg transition-opacity duration-800 z-50 ${isChanging ? 'opacity-10' : 'opacity-0'}`}></div>
    </div>
  );
};

export default DashboardLayout;