import React, { useState, useEffect, useContext, useCallback } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuLock, LuExternalLink } from "react-icons/lu";
import { FiClock, FiCalendar } from "react-icons/fi";
import SideMenu from './SideMenu';
import ThemeSwitcher from '../ThemeSwitcher';
import { ThemeContext, themes } from '../../context/themeContext';
import VaultPromptModal from '../../components/VaultPromptModal';

// Rain effect component - update this to remove flowers and grass
const RainEffect = () => {
  const [raindrops, setRaindrops] = useState([]);
  const [lightning, setLightning] = useState({ active: false, intensity: 0 });
  const { theme } = useContext(ThemeContext);
  
  // Get theme values from CSS variables for better synchronization
  const getCSSVariable = (name) => {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  };
  
  // Generate theme-aware styling
  const getThemeStyles = () => {
    // Get accent color from theme
    const accentColor = getCSSVariable('--accent-color') || '#3b82f6';
    const textColor = getCSSVariable('--text-color') || '#1f2937';
    
    // Parse the accent color to extract RGB values
    let accentRGB = { r: 70, g: 130, b: 230 }; // Default fallback
    
    // Try to parse the accent color if it's in hex format
    if (accentColor.startsWith('#')) {
      const hex = accentColor.slice(1);
      if (hex.length === 3) {
        accentRGB = {
          r: parseInt(hex[0] + hex[0], 16),
          g: parseInt(hex[1] + hex[1], 16),
          b: parseInt(hex[2] + hex[2], 16)
        };
      } else if (hex.length === 6) {
        accentRGB = {
          r: parseInt(hex.slice(0, 2), 16),
          g: parseInt(hex.slice(2, 4), 16),
          b: parseInt(hex.slice(4, 6), 16)
        };
      }
    }
    
    switch(theme) {
      case 'dark':
        return {
          raindrop: `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.7)`,
          cloud: `rgba(${Math.max(0, accentRGB.r - 40)}, ${Math.max(0, accentRGB.g - 40)}, ${Math.max(0, accentRGB.b - 40)}, 0.6)`,
          cloudShadow: `rgba(${Math.max(0, accentRGB.r - 70)}, ${Math.max(0, accentRGB.g - 70)}, ${Math.max(0, accentRGB.b - 70)}, 0.3)`,
          lightning: `rgba(230, 230, 255, 0.9)`,
          lightningGlow: `0 0 60px 30px rgba(180, 180, 255, 0.8)`
        };
      case 'purple':
        return {
          raindrop: `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.7)`,
          cloud: `rgba(${Math.max(0, accentRGB.r - 40)}, ${Math.max(0, accentRGB.g - 40)}, ${Math.max(0, accentRGB.b - 40)}, 0.6)`,
          cloudShadow: `rgba(${Math.max(0, accentRGB.r - 70)}, ${Math.max(0, accentRGB.g - 70)}, ${Math.max(0, accentRGB.b - 70)}, 0.3)`,
          lightning: 'rgba(230, 200, 255, 0.9)',
          lightningGlow: '0 0 60px 30px rgba(180, 120, 255, 0.8)'
        };
      case 'golden':
        return {
          raindrop: `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.7)`,
          cloud: `rgba(${Math.max(0, accentRGB.r - 40)}, ${Math.max(0, accentRGB.g - 40)}, ${Math.max(0, accentRGB.b - 40)}, 0.6)`,
          cloudShadow: `rgba(${Math.max(0, accentRGB.r - 70)}, ${Math.max(0, accentRGB.g - 70)}, ${Math.max(0, accentRGB.b - 70)}, 0.3)`,
          lightning: 'rgba(255, 240, 180, 0.9)',
          lightningGlow: '0 0 60px 30px rgba(255, 200, 100, 0.8)'
        };
      default: // light and others
        return {
          raindrop: `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.7)`,
          cloud: `rgba(${Math.max(0, accentRGB.r - 40)}, ${Math.max(0, accentRGB.g - 40)}, ${Math.max(0, accentRGB.b - 40)}, 0.6)`,
          cloudShadow: `rgba(${Math.max(0, accentRGB.r - 70)}, ${Math.max(0, accentRGB.g - 70)}, ${Math.max(0, accentRGB.b - 70)}, 0.3)`,
          lightning: 'rgba(230, 230, 255, 0.9)',
          lightningGlow: '0 0 60px 30px rgba(200, 200, 255, 0.8)'
        };
    }
  };

  const styles = getThemeStyles();
  
  // Generate clouds
  const clouds = [
    { left: '10%', top: '10%', size: 60, delay: 0 },
    { left: '30%', top: '5%', size: 80, delay: 2 },
    { left: '60%', top: '8%', size: 70, delay: 1 },
    { left: '80%', top: '15%', size: 50, delay: 3 },
  ];

  useEffect(() => {
    const createLightning = () => {
      // Random time between 6-7 seconds for next lightning
      const nextLightningTime = 6000 + Math.random() * 1000;
      
      setTimeout(() => {
        // Flash the lightning with higher intensity
        setLightning({ active: true, intensity: 0.9 + Math.random() * 0.1 });
        
        // Longer flash duration
        setTimeout(() => {
          setLightning({ active: false, intensity: 0 });
        }, 150 + Math.random() * 200);
        
        // Increased chance of second flash (80%)
        if (Math.random() > 0.2) {
          setTimeout(() => {
            // Second flash with higher intensity
            setLightning({ active: true, intensity: 0.7 + Math.random() * 0.3 });
            
            setTimeout(() => {
              setLightning({ active: false, intensity: 0 });
              
              // 50% chance of third flash for more dramatic effect
              if (Math.random() > 0.5) {
                setTimeout(() => {
                  setLightning({ active: true, intensity: 0.6 + Math.random() * 0.4 });
                  
                  setTimeout(() => {
                    setLightning({ active: false, intensity: 0 });
                    
                    // Schedule next lightning
                    createLightning();
                  }, 50 + Math.random() * 100);
                }, 100 + Math.random() * 150);
              } else {
                // Schedule next lightning
                createLightning();
              }
            }, 70 + Math.random() * 130);
          }, 120 + Math.random() * 180);
        } else {
          // Schedule next lightning
          createLightning();
        }
      }, nextLightningTime);
    };
    
    // Start the lightning cycle
    createLightning();
    
    // No cleanup needed as component is persistent
  }, []);
  // Create new raindrops
  useEffect(() => {
    // Initialize raindrops
    const createRaindrop = () => {
      const id = Math.random().toString(36);
      const left = Math.random() * 100; // position across width (%)
      const size = Math.random() * 3 + 1; // raindrop size
      const duration = Math.random() * 0.5 + 0.7; // fall animation duration
      const delay = Math.random() * 0.3; // start delay
      
      return { id, left, size, duration, delay };
    };
    
    // Initial raindrops
    setRaindrops(Array.from({ length: 30 }, createRaindrop));
    
    // Keep adding raindrops
    const interval = setInterval(() => {
      setRaindrops(prev => {
        // Remove some older drops to prevent too many elements
        const filtered = prev.slice(-40);
        return [...filtered, createRaindrop()];
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Keyframe animations */}
      <style>
        {`
          @keyframes raindrop {
            0% {
              transform: translateY(-10px);
              opacity: 0;
            }
            10% {
              opacity: 0.7;
            }
            90% {
              opacity: 0.7;
            }
            100% {
              transform: translateY(95px);
              opacity: 0;
            }
          }
          
          @keyframes float {
            0% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-10px) translateX(10px);
            }
            100% {
              transform: translateY(0) translateX(0);
            }
          }
          
          @keyframes lightning-path {
            0% {
              d: path('M 50,0 L 55,20 L 45,30 L 55,50 L 40,70');
            }
            50% {
              d: path('M 50,0 L 60,25 L 40,35 L 60,55 L 35,75');
            }
            100% {
              d: path('M 50,0 L 55,20 L 45,30 L 55,50 L 40,70');
            }
          }
        `}
      </style>
      
      {/* Lightning overlay */}
      {lightning.active && (
        <div 
          className="absolute inset-0 z-30 transition-opacity duration-100"
          style={{
            opacity: lightning.intensity,
            background: `radial-gradient(circle at ${30 + Math.random() * 40}% ${20 + Math.random() * 20}%, ${styles.lightning}, transparent 70%)`,
            mixBlendMode: 'screen'
          }}
        ></div>
      )}
      
      {/* Lightning bolts */}
      {lightning.active && (
        <div 
          className="absolute z-20"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: 0,
            opacity: lightning.intensity
          }}
        >
          <svg width="100" height="80" viewBox="0 0 100 80">
            <path
              d={`M 50,0 L ${48 + Math.random() * 14},${15 + Math.random() * 10} L ${40 + Math.random() * 10},${25 + Math.random() * 10} L ${50 + Math.random() * 15},${45 + Math.random() * 10} L ${35 + Math.random() * 10},${65 + Math.random() * 15}`}
              stroke={styles.lightning}
              strokeWidth="2"
              fill="none"
              style={{
                filter: `drop-shadow(0 0 3px ${styles.lightning})`,
              }}
            />
          </svg>
        </div>
      )}
      
      {/* Clouds */}
      {clouds.map((cloud, index) => (
        <div 
          key={index}
          className="absolute"
          style={{
            left: cloud.left,
            top: cloud.top,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            borderRadius: '50%',
            background: styles.cloud,
            boxShadow: `5px 5px 10px ${styles.cloudShadow}`,
            animation: `float 15s ease-in-out ${cloud.delay}s infinite alternate`,
            zIndex: 10
          }}
        >
          {/* Cloud details */}
          <div 
            className="absolute"
            style={{
              left: '20%',
              top: '-30%',
              width: '60%',
              height: '60%',
              borderRadius: '50%',
              background: styles.cloud
            }}
          ></div>
          <div 
            className="absolute"
            style={{
              left: '50%',
              top: '-40%',
              width: '50%',
              height: '70%',
              borderRadius: '50%',
              background: styles.cloud
            }}
          ></div>
        </div>
      ))}
      
      {/* Lightning glow source */}
      {lightning.active && (
        <div 
          className="absolute z-10"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${10 + Math.random() * 20}%`,
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: styles.lightning,
            boxShadow: styles.lightningGlow,
            opacity: lightning.intensity * 0.8
          }}
        ></div>
      )}
      
      {/* Raindrops */}
      {raindrops.map(drop => (
        <div
          key={drop.id}
          className="absolute w-0.5 rounded-full"
          style={{
            left: `${drop.left}%`,
            top: '-5px',
            height: `${drop.size * 10}px`,
            width: `${drop.size}px`,
            background: styles.raindrop,
            animation: `raindrop ${drop.duration}s linear ${drop.delay}s forwards`,
            zIndex: 5
          }}
        ></div>
      ))}
    </div>
  );
};

// Analog Clock Component
const AnalogClock = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const secondsStyle = {
    transform: `rotate(${time.getSeconds() * 6}deg)`
  };
  
  const minutesStyle = {
    transform: `rotate(${time.getMinutes() * 6}deg)`
  };
  
  const hoursStyle = {
    transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)`
  };
  
  return (
    <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-green-500/50" 
         style={{ 
           background: 'radial-gradient(circle, rgba(220, 255, 220, 0.2) 0%, rgba(0, 80, 0, 0.1) 100%)',
           boxShadow: '0 0 10px rgba(0, 200, 0, 0.3), inset 0 0 15px rgba(0, 150, 0, 0.2)'
         }}>
      {/* Hour Markings */}
      {[...Array(12)].map((_, i) => (
        <div key={i} 
             className="absolute w-1 h-1.5 bg-green-600 rounded-full"
             style={{ 
               left: '50%', 
               top: i % 3 === 0 ? '2px' : '3px',
               height: i % 3 === 0 ? '6px' : '4px',
               width: i % 3 === 0 ? '2px' : '1px',
               transformOrigin: '0 calc(8px + 0.5px)', 
               transform: `rotate(${i * 30}deg) translateX(-50%)` 
             }}></div>
      ))}
      
      {/* Clock Hands */}
      <div className="absolute top-1/2 left-1/2 w-0.5 h-4 md:h-5 bg-green-700 rounded-full origin-bottom" 
           style={{ ...hoursStyle, transform: `${hoursStyle.transform} translateX(-50%)` }}></div>
      <div className="absolute top-1/2 left-1/2 w-0.5 h-5 md:h-6 bg-green-600 rounded-full origin-bottom" 
           style={{ ...minutesStyle, transform: `${minutesStyle.transform} translateX(-50%)` }}></div>
      <div className="absolute top-1/2 left-1/2 w-0.5 h-6 md:h-7 bg-green-500 rounded-full origin-bottom" 
           style={{ ...secondsStyle, transform: `${secondsStyle.transform} translateX(-50%)` }}></div>
      
      {/* Center Pin */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-700 rounded-full -translate-x-1/2 -translate-y-1/2"
           style={{ boxShadow: '0 0 2px rgba(0, 150, 0, 0.8)' }}></div>
    </div>
  );
};

const Navbar = ({ activeMenu, appTitle }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: true }));
  const { theme } = useContext(ThemeContext);
  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);
  const [isVaultButtonHovered, setIsVaultButtonHovered] = useState(false);
  const [isGlowing, setIsGlowing] = useState(true);
  const [pulseIntensity, setPulseIntensity] = useState(0);

  // Get today's date in a readable format
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Current theme emoji
  const currentThemeEmoji = themes[theme]?.properties['--theme-emoji'] || '💼';

  // Define timeStyles based on the current theme
  const timeStyles = {
    bg: `var(--card-bg-transparent, rgba(255, 255, 255, 0.1))`,
    border: `2px solid var(--accent-color, #3b82f6)`,
    boxShadow: `0 2px 6px var(--shadow-color, rgba(0, 0, 0, 0.1))`,
    iconColor: `var(--accent-color, #3b82f6)`,
    textShadow: `0 0 1px var(--shadow-color, rgba(0, 0, 0, 0.1))`
  };

  // Update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Smoother breathing effect for the clock
  useEffect(() => {
    let direction = 1;
    const breathingInterval = setInterval(() => {
      setPulseIntensity(prev => {
        const newValue = prev + (0.05 * direction);
        if (newValue >= 1) direction = -1;
        if (newValue <= 0) direction = 1;
        return Math.max(0, Math.min(1, newValue));
      });
    }, 50);
    return () => clearInterval(breathingInterval);
  }, []);

  // Vault modal handlers
  const handleOpenVaultModal = useCallback(() => {
    setIsVaultModalOpen(true);
  }, []);
  
  const handleVaultConfirm = useCallback(() => {
    setIsVaultModalOpen(false);
    window.open("https://shivamsvault.netlify.app/", "_blank", "noopener,noreferrer");
  }, []);
  
  const handleVaultCancel = useCallback(() => {
    setIsVaultModalOpen(false);
  }, []);

  return (
    <>
      <div 
        className="flex flex-col sm:flex-row justify-between items-center border border-b backdrop-blur-[2px] py-3 sm:py-4 px-4 sm:px-7 sticky top-0 z-300 relative" 
        style={{ 
          background: 'var(--sidebar-bg)', 
          borderColor: 'var(--border-color)',
          boxShadow: '0 2px 10px var(--shadow-color)'
        }}
      >
        {/* Rain effect - keep the same */}
        <RainEffect />
        
        {/* Top row for mobile: menu button and app title */}
        <div className="flex items-center justify-between w-full sm:w-auto sm:justify-start relative z-10 mb-2 sm:mb-0">
          <button
            className="p-2 -ml-2 block sm:hidden"
            onClick={() => {
              setOpenSideMenu(!openSideMenu);
            }}
            style={{ color: 'var(--text-color)' }}
            aria-label="Toggle menu"
          >
            {openSideMenu ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>
          
          {/* Glassmorphism container for title - optimized for mobile */}
          <div className="flex flex-col relative max-w-[calc(100vw-100px)] sm:max-w-none">
            {/* Glassmorphism background */}
            <div className="absolute -left-2 sm:-left-3 -top-2 sm:-top-3 -right-2 sm:-right-3 -bottom-2 sm:-bottom-3 rounded-xl backdrop-blur-md z-0"
                 style={{
                   backgroundColor: 'rgba(255, 255, 255, 0.15)',
                   border: '1px solid rgba(255, 255, 255, 0.2)',
                   boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
                 }}>
            </div>
            
            <h1 className="text-lg sm:text-xl font-bold relative z-10 px-2 sm:px-3 pt-1 sm:pt-2 truncate">{appTitle}</h1>
            <h2 className="text-base sm:text-lg font-medium flex items-center navbar-brand relative z-10 px-2 sm:px-3" style={{ color: 'var(--accent-color)' }}>
              <span className="mr-2">{currentThemeEmoji}</span>
            </h2>
          </div>

          {/* Theme switcher in top row for mobile */}
          <div className="block sm:hidden">
            <ThemeSwitcher />
          </div>
        </div>
        
        {/* Middle row - Clock and date display */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start relative z-10 my-1 sm:my-0">
          <div className="mt-0 sm:mt-2 flex flex-row sm:flex-row gap-3 items-center relative z-10 px-2 sm:px-3 pb-1 sm:pb-2 w-full justify-center sm:justify-start">
            {/* Smaller clock on mobile */}
            <div className="scale-90 sm:scale-100 transform-origin-left">
              <AnalogClock />
            </div>
            
            <div className="flex flex-col gap-1 sm:gap-2">
              <div 
                className="flex items-center gap-1 sm:gap-2 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 transition-all duration-500"
                style={{ 
                  backgroundColor: timeStyles.bg,
                  borderLeft: timeStyles.border,
                  boxShadow: timeStyles.boxShadow,
                }}
              >
                <FiCalendar className="text-xs sm:text-sm transition-colors duration-500" 
                            style={{ color: timeStyles.iconColor }}/>
                <p 
                  className="text-2xs sm:text-xs font-medium transition-all duration-500 whitespace-nowrap" 
                  style={{ 
                    color: 'var(--text-color)',
                    textShadow: timeStyles.textShadow
                  }}
                >
                  {today}
                </p>
              </div>
              
              <div 
                className="flex items-center gap-1 sm:gap-2 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 transition-all duration-500"
                style={{ 
                  backgroundColor: timeStyles.bg,
                  borderLeft: timeStyles.border,
                  boxShadow: timeStyles.boxShadow,
                }}
              >
                <FiClock 
                  className="text-xs sm:text-sm transition-colors duration-500" 
                  style={{ 
                    color: timeStyles.iconColor,
                  }}
                />
                <p 
                  className="text-2xs sm:text-xs font-medium transition-all duration-500" 
                  style={{ 
                    color: 'var(--text-color)',
                    textShadow: timeStyles.textShadow
                  }}
                >
                  <span className="font-mono tracking-wider">{currentTime}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom row - Vault button */}
        <div className="flex items-center w-full sm:w-auto justify-center sm:justify-end relative z-10 mt-1 sm:mt-0">
          <button
            onClick={handleOpenVaultModal}
            onMouseEnter={() => setIsVaultButtonHovered(true)}
            onMouseLeave={() => setIsVaultButtonHovered(false)}
            className="flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-300 relative overflow-hidden group max-w-[90%] sm:max-w-none justify-center"
            style={{ 
              backgroundColor: isVaultButtonHovered 
                ? 'var(--accent-color)' 
                : 'var(--accent-color-light, rgba(59, 130, 246, 0.1))',
              color: isVaultButtonHovered 
                ? 'white' 
                : 'var(--accent-color)',
              transform: isVaultButtonHovered ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: isVaultButtonHovered 
                ? '0 4px 12px var(--shadow-color, rgba(0, 0, 0, 0.1))' 
                : 'none',
              border: isVaultButtonHovered 
                ? '1px solid var(--accent-color)' 
                : '1px solid transparent'
            }}
            aria-label="Open Shivam's Vault"
          >
            {/* Add shine effect overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
            ></div>
            
            <LuLock className={`${isVaultButtonHovered ? 'text-white' : ''} text-xs sm:text-sm transition-all duration-300 ${isVaultButtonHovered ? 'rotate-12 scale-110' : ''}`} />
            <span className={`text-xs font-medium transition-all duration-300 ${isVaultButtonHovered ? 'font-semibold' : ''}`}>
              🔐 Secure Passwords
            </span>
          </button>
          
          <div className="hidden sm:block ml-3">
            <ThemeSwitcher />
          </div>
        </div>
        
        {/* Side menu - updated for better mobile height calculation */}
        {openSideMenu && (
          <div 
            className="fixed top-[105px] sm:top-[97px] md:top-[61px] left-0 w-64 h-[calc(100vh-105px)] sm:h-[calc(100vh-97px)] md:h-[calc(100vh-61px)] z-40 overflow-hidden backdrop-blur-md"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              borderRight: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.17)'
            }}
          >
            <div 
              className="absolute inset-0 opacity-30"
              style={{ 
                background: `linear-gradient(135deg, 
                  var(--card-bg-transparent, rgba(255, 255, 255, 0.2)) 0%, 
                  var(--card-bg-transparent, rgba(255, 255, 255, 0.1)) 100%)`,
                pointerEvents: 'none'
              }}
            ></div> 
            
            <div className="p-3 relative h-full bg-white/5">
              <SideMenu activeMenu={activeMenu} />
            </div>
          </div>
        )}
      </div>

      <VaultPromptModal 
        isOpen={isVaultModalOpen}
        onConfirm={handleVaultConfirm}
        onCancel={handleVaultCancel}
      />
    </>
  );
};

export default Navbar;