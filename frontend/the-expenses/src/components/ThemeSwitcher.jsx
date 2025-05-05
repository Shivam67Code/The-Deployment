import React, { useState, useContext, useRef, useEffect } from 'react';
import { LuPalette } from 'react-icons/lu';
import { ThemeContext, themes } from '../context/themeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleThemeSelect = (themeKey) => {
    setTheme(themeKey);
    setIsOpen(false);
  };

  // Current theme emoji
  const currentThemeEmoji = themes[theme]?.properties['--theme-emoji'] || '🎨';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md"
        style={{ 
          background: themes[theme]?.properties['--button-gradient'] || themes[theme]?.properties['--accent-color'],
          color: 'white',
          boxShadow: `0 2px 8px ${themes[theme]?.properties['--shadow-color']}`,
        }}
        aria-label="Change theme"
        title="Change theme"
      >
        <span className="text-lg">{currentThemeEmoji}</span>
        <LuPalette className="text-sm" />
      </button>

      {isOpen && (
        <div 
          className="absolute z-50 mt-2 w-48 rounded-xl shadow-xl overflow-hidden border border-opacity-30 right-0 theme-dropdown"
          style={{ 
            backgroundColor: 'var(--card-bg)', 
            borderColor: 'var(--border-color)',
            boxShadow: '0 10px 25px var(--shadow-color)',
          }}
        >
          <div className="compact-theme-selector">
            <div className="px-3 py-2 text-sm font-medium border-b flex items-center gap-1.5" 
              style={{ 
                borderColor: 'var(--border-color)',
                background: 'var(--accent-gradient)',
                color: 'white'
              }}
            >
              <LuPalette size={14} />
              Select Theme
            </div>
            <div className="py-1.5 max-h-80 overflow-y-auto theme-list">
              {Object.entries(themes).map(([key, { name, properties }]) => (
                <button
                  key={key}
                  onClick={() => handleThemeSelect(key)}
                  className={`compact-theme-option ${key === theme ? 'active' : ''}`}
                  style={{
                    color: 'var(--text-color)',
                   }}
                >
                  <div className="theme-info flex items-center gap-2 w-full relative p-2 px-3 hover:bg-black/5 transition-colors">
                    <div className="theme-emoji">{properties['--theme-emoji']}</div>
                    <div className="theme-name">{name}</div>
                    {key === theme && (
                      <div className="theme-active-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;