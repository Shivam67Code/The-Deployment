import React, { createContext, useState, useEffect } from 'react';

// Update the themes object with consistent theme elements and appropriate emojis
export const themes = {
  default: {
    name: "Light Default",
    properties: {
      "--bg-color": "#ffffff",
      "--text-color": "#333333",
      "--accent-color": "#3b82f6",
      "--accent-gradient": "linear-gradient(135deg, #3b82f6, #2563eb)",
      "--card-bg": "#f8fafc",
      "--card-bg-gradient": "linear-gradient(145deg, #ffffff, #f1f5f9)",
      "--button-bg": "#3b82f6",
      "--button-gradient": "linear-gradient(to right, #3b82f6, #2563eb)",
      "--sidebar-bg": "linear-gradient(180deg, #ffffff, #f8fafc)",
      "--sidebar-text": "#333333",
      "--sidebar-active": "#3b82f6",
      "--shadow-color": "rgba(59, 130, 246, 0.15)",
      "--border-color": "#e2e8f0",
      "--icon-color": "#3b82f6",
      "--positive-value": "#10b981",
      "--negative-value": "#ef4444",
      "--transition-speed": "0.5s",
      "--card-animation": "fadeIn",
      "--element-animation": "slideIn",
      "--special-effect": "light-shimmer",
      "--theme-emoji": "☀️",
      "--accent-color-rgb": "59, 130, 246",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\" opacity=\"0.03\"><path d=\"M30,5 L45,25 L30,45 L15,25 Z\" fill=\"%233b82f6\" /></svg>')",
    },
  },

  
  roseGold: {
    name: "Rose Garden",
    properties: {
      "--bg-color": "#fff1f5",
      "--text-color": "#5a2a27",
      "--accent-color": "#e0a899",
      "--accent-gradient": "linear-gradient(135deg, #e0a899, #f5b6aa)",
      "--card-bg": "#ffe3e3",
      "--card-bg-gradient": "linear-gradient(145deg, #ffe9ed, #ffdde3)",
      "--button-bg": "#f3d2d2",
      "--button-gradient": "linear-gradient(to right, #e0a899, #f3d2d2)",
      "--sidebar-bg": "linear-gradient(180deg, #fff5f7, #ffedf1)",
      "--sidebar-text": "#5a2a27",
      "--sidebar-active": "#e0a899",
      "--shadow-color": "rgba(224, 168, 153, 0.3)",
      "--border-color": "#f8d6d6",
      "--icon-color": "#e0a899",
      "--positive-value": "#e0a899",
      "--negative-value": "#c94f66",
      "--transition-speed": "0.7s",
      "--card-animation": "roseBloom",
      "--element-animation": "roseSlideIn",
      "--special-effect": "rose-petals",
      "--theme-emoji": "🌹",
      "--accent-color-rgb": "224, 168, 153",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" opacity=\"0.08\"><path d=\"M15,3 C16,7 19,9 23,8 C19,12 19,16 23,20 C19,19 16,21 15,25 C14,21 11,19 7,20 C11,16 11,12 7,8 C11,9 14,7 15,3 Z\" fill=\"%23e0a899\" /></svg>')",
    },
  },
  
  ocean: {
    name: "Deep Ocean",
    properties: {
      "--bg-color": "#001f3f",
      "--text-color": "#ffffff",
      "--accent-color": "#00c8ff",
      "--accent-gradient": "linear-gradient(135deg, #00c8ff, #38bdf8)",
      "--card-bg": "#003f5c",
      "--card-bg-gradient": "linear-gradient(145deg, #004b70, #003f5c)",
      "--button-bg": "#00a8ff",
      "--button-gradient": "linear-gradient(to right, #00c8ff, #0099de)",
      "--sidebar-bg": "linear-gradient(180deg, #003352, #002c4c)",
      "--sidebar-text": "#ffffff",
      "--sidebar-active": "#00f7ff",
      "--shadow-color": "rgba(0, 200, 255, 0.5)",
      "--border-color": "#004e7c",
      "--icon-color": "#00c8ff",
      "--positive-value": "#0cebeb",
      "--negative-value": "#ff6a88",
      "--transition-speed": "0.8s",
      "--card-animation": "waveRise",
      "--element-animation": "waveIn",
      "--special-effect": "ocean-waves",
      "--theme-emoji": "🌊",
      "--accent-color-rgb": "0, 200, 255",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"20\" opacity=\"0.07\"><path d=\"M0,10 Q25,0 50,10 Q75,20 100,10\" stroke=\"%2300c8ff\" fill=\"none\" stroke-width=\"1.5\" /></svg>')",
    },
  },
  
  rain: {
    name: "Rainy Day",
    properties: {
      "--bg-color": "#e3eafc",
      "--text-color": "#3a4660",
      "--accent-color": "#7792e3",
      "--accent-gradient": "linear-gradient(135deg, #7792e3, #98aff5)",
      "--card-bg": "#d1dbf5",
      "--card-bg-gradient": "linear-gradient(145deg, #d8e2fc, #cad6f1)",
      "--button-bg": "#8da3e3",
      "--button-gradient": "linear-gradient(to right, #7792e3, #98aff5)",
      "--sidebar-bg": "linear-gradient(180deg, #cfdafb, #c6d3f9)",
      "--sidebar-text": "#3a4660",
      "--sidebar-active": "#7792e3",
      "--shadow-color": "rgba(119, 146, 227, 0.3)",
      "--border-color": "#b8c7f5",
      "--icon-color": "#7792e3",
      "--positive-value": "#62a1e3",
      "--negative-value": "#e06b9d",
      "--transition-speed": "0.6s",
      "--card-animation": "rainDrop",
      "--element-animation": "rainFall",
      "--special-effect": "rain-drops",
      "--theme-emoji": "🌧️",
      "--accent-color-rgb": "119, 146, 227",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"4\" height=\"12\" opacity=\"0.12\"><path d=\"M2,0 L4,0 L2,12 L0,12 Z\" fill=\"%237792e3\" /></svg>')",
    },
  },
  
  redWhite: {
    name: "Red & White",
    properties: {
      "--bg-color": "#ffffff",
      "--text-color": "#c41e3a",
      "--accent-color": "#ff5a5f",
      "--accent-gradient": "linear-gradient(135deg, #ff5a5f, #ff7e82)",
      "--card-bg": "#fff0f0",
      "--card-bg-gradient": "linear-gradient(145deg, #fff5f5, #fff0f0)",
      "--button-bg": "#c41e3a",
      "--button-gradient": "linear-gradient(to right, #c41e3a, #ff5a5f)",
      "--sidebar-bg": "linear-gradient(180deg, #ffffff, #fff8f8)",
      "--sidebar-text": "#c41e3a",
      "--sidebar-active": "#ff5a5f",
      "--shadow-color": "rgba(196, 30, 58, 0.25)",
      "--border-color": "#ffdbdb",
      "--icon-color": "#ff5a5f",
      "--positive-value": "#0cca4a",
      "--negative-value": "#e32636",
      "--transition-speed": "0.6s",
      "--card-animation": "heartBeat",
      "--element-animation": "heartPulse",
      "--special-effect": "floating-hearts",
      "--theme-emoji": "❤️",
      "--accent-color-rgb": "255, 90, 95",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" opacity=\"0.07\"><path d=\"M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.99 2.4,10.81 4.15,12.4 C5.39,13.5 6.73,14.5 8.34,15.69 C8.5,15.81 8.53,15.83 9,16.08 C9.47,16.33 9.5,16.35 9.66,16.47 C9.87,16.61 10.13,16.61 10.34,16.47 C10.5,16.35 10.53,16.33 11,16.08 C11.47,15.83 11.5,15.81 11.66,15.69 C13.27,14.5 14.61,13.5 15.85,12.4 C17.6,10.81 19,8.99 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 Z\" fill=\"%23ff5a5f\" /></svg>')",
    },
  },
  
  sunset: {
    name: "Neon Sunset",
    properties: {
      "--bg-color": "#282a36",
      "--text-color": "#f8f8f2",
      "--accent-color": "#ff79c6",
      "--accent-gradient": "linear-gradient(135deg, #ff79c6, #ff92d0)",
      "--card-bg": "#383a59",
      "--card-bg-gradient": "linear-gradient(145deg, #3d3f5f, #32344f)",
      "--button-bg": "#ff79c6",
      "--button-gradient": "linear-gradient(to right, #ff79c6, #bd93f9)",
      "--sidebar-bg": "linear-gradient(180deg, #2e303f, #282a36)",
      "--sidebar-text": "#f8f8f2",
      "--sidebar-active": "#ff79c6",
      "--shadow-color": "rgba(255, 121, 198, 0.35)",
      "--border-color": "#44475a",
      "--icon-color": "#ff79c6",
      "--positive-value": "#50fa7b",
      "--negative-value": "#ff5555",
      "--transition-speed": "0.7s",
      "--card-animation": "sunsetFade",
      "--element-animation": "sunsetGlow",
      "--special-effect": "sunset-glow",
      "--theme-emoji": "🌆",
      "--accent-color-rgb": "255, 121, 198",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" opacity=\"0.05\"><path d=\"M0,50 L100,50\" stroke=\"%23ff79c6\" stroke-width=\"0.5\" /><path d=\"M50,0 L50,100\" stroke=\"%23bd93f9\" stroke-width=\"0.5\" /></svg>')",
    },
  },
  
  glass: {
    name: "Crystal Glass",
    properties: {
      "--bg-color": "#f0f8ff",  // Solid light blue background
      "--text-color": "#2a4a56",
      "--accent-color": "#88d3f4",
      "--accent-gradient": "linear-gradient(135deg, #88d3f4, #5fb8e3)",
      "--card-bg": "rgba(255, 255, 255, 0.7)",  // Glass card background
      "--card-bg-gradient": "linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))",
      "--button-bg": "rgba(136, 211, 244, 0.85)",  // Semi-transparent button
      "--button-gradient": "linear-gradient(to right, rgba(136, 211, 244, 0.85), rgba(95, 184, 227, 0.85))",
      "--sidebar-bg": "rgba(255, 255, 255, 0.75)",  // Semi-transparent sidebar
      "--sidebar-text": "#2a4a56",
      "--sidebar-active": "#5fb8e3",
      "--shadow-color": "rgba(136, 211, 244, 0.25)",
      "--border-color": "rgba(255, 255, 255, 0.6)",
      "--icon-color": "#5fb8e3",
      "--positive-value": "#5bcfa0",
      "--negative-value": "#f25c5c",
      "--transition-speed": "0.8s",
      "--card-animation": "glassMorph",
      "--element-animation": "glassSlide",
      "--special-effect": "glass-reflection",
      "--backdrop-filter": "blur(12px)",
      "--theme-emoji": "✨",
      "--accent-color-rgb": "136, 211, 244",
      "--glass-border": "1px solid rgba(255, 255, 255, 0.6)",
      "--glass-shadow": "0 8px 32px rgba(31, 38, 135, 0.15)",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\" opacity=\"0.05\"><circle cx=\"30\" cy=\"30\" r=\"20\" stroke=\"%2388d3f4\" fill=\"none\" stroke-width=\"0.5\" /></svg>')",
    },
  },
  
  forest: {
    name: "Dark Forest",
    properties: {
      "--bg-color": "#1a2213",
      "--text-color": "#e0e8d5",
      "--accent-color": "#5c9940",
      "--accent-gradient": "linear-gradient(135deg, #5c9940, #78b259)",
      "--card-bg": "#283520",
      "--card-bg-gradient": "linear-gradient(145deg, #2c3a24, #243019)",
      "--button-bg": "#5c9940",
      "--button-gradient": "linear-gradient(to right, #5c9940, #78b259)",
      "--sidebar-bg": "linear-gradient(180deg, #283520, #1e2617)",
      "--sidebar-text": "#e0e8d5",
      "--sidebar-active": "#78b259",
      "--shadow-color": "rgba(0, 0, 0, 0.45)",
      "--border-color": "#3a4930",
      "--icon-color": "#78b259",
      "--positive-value": "#78b259",
      "--negative-value": "#c74e50",
      "--transition-speed": "0.6s",
      "--card-animation": "leafGrow",
      "--element-animation": "leafSway",
      "--special-effect": "falling-leaves",
      "--theme-emoji": "🌲",
      "--accent-color-rgb": "92, 153, 64",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" opacity=\"0.2\"><path d=\"M15,2 L17,12 L27,12 L19,18 L23,28 L15,22 L7,28 L11,18 L3,12 L13,12 Z\" fill=\"%235c9940\" /></svg>')",
    },
  },
  
  night: {
    name: "Midnight",
    properties: {
      "--bg-color": "#121212",
      "--text-color": "#e0e0e0",
      "--accent-color": "#8f44fd",
      "--accent-gradient": "linear-gradient(135deg, #8f44fd, #a66ffe)",
      "--card-bg": "#1e1e1e",
      "--card-bg-gradient": "linear-gradient(145deg, #232323, #1a1a1a)",
      "--button-bg": "#8f44fd",
      "--button-gradient": "linear-gradient(to right, #8f44fd, #b17cfe)",
      "--sidebar-bg": "linear-gradient(180deg, #1e1e1e, #1a1a1a)",
      "--sidebar-text": "#e0e0e0",
      "--sidebar-active": "#8f44fd",
      "--shadow-color": "rgba(143, 68, 253, 0.35)",
      "--border-color": "#2c2c2c",
      "--icon-color": "#8f44fd",
      "--positive-value": "#0ea5e9",
      "--negative-value": "#f43f5e",
      "--transition-speed": "0.7s",
      "--card-animation": "starTwinkle",
      "--element-animation": "nightFade",
      "--special-effect": "star-field",
      "--theme-emoji": "🌙",
      "--accent-color-rgb": "143, 68, 253",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" opacity=\"0.1\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"white\" /><circle cx=\"20\" cy=\"30\" r=\"1\" fill=\"white\" /><circle cx=\"70\" cy=\"20\" r=\"1\" fill=\"white\" /><circle cx=\"30\" cy=\"70\" r=\"1\" fill=\"white\" /><circle cx=\"85\" cy=\"65\" r=\"1\" fill=\"white\" /><circle cx=\"15\" cy=\"85\" r=\"1\" fill=\"white\" /></svg>')",
    },
  },
  
  lavender: {
    name: "Lavender Fields",
    properties: {
      "--bg-color": "#f5f1fe",
      "--text-color": "#3c1f67",
      "--accent-color": "#9b7dea",
      "--accent-gradient": "linear-gradient(135deg, #9b7dea, #b49df2)",
      "--card-bg": "#ede8fa",
      "--card-bg-gradient": "linear-gradient(145deg, #f0ebfc, #e9e4f7)",
      "--button-bg": "#9b7dea",
      "--button-gradient": "linear-gradient(to right, #9b7dea, #b49df2)",
      "--sidebar-bg": "linear-gradient(180deg, #ede8fa, #e6e0f8)",
      "--sidebar-text": "#3c1f67",
      "--sidebar-active": "#9b7dea",
      "--shadow-color": "rgba(155, 125, 234, 0.3)",
      "--border-color": "#d9d0f0",
      "--icon-color": "#9b7dea",
      "--positive-value": "#7c58e9",
      "--negative-value": "#e85298",
      "--transition-speed": "0.7s",
      "--card-animation": "lavenderPulse",
      "--element-animation": "lavenderFade",
      "--special-effect": "floating-bubbles",
      "--theme-emoji": "💜",
      "--accent-color-rgb": "155, 125, 234",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" opacity=\"0.08\"><path d=\"M10,2 L13,5 L10,8 L7,5 Z\" fill=\"%239b7dea\" /></svg>')",
    },
  },
  
  mint: {
    name: "Fresh Mint",
    properties: {
      "--bg-color": "#f0faf4",
      "--text-color": "#1e5345",
      "--accent-color": "#4dcf8f",
      "--accent-gradient": "linear-gradient(135deg, #4dcf8f, #6bdfa6)",
      "--card-bg": "#e3f6ed",
      "--card-bg-gradient": "linear-gradient(145deg, #e8faf2, #ddf2e8)",
      "--button-bg": "#4dcf8f",
      "--button-gradient": "linear-gradient(to right, #4dcf8f, #6bdfa6)",
      "--sidebar-bg": "linear-gradient(180deg, #e8faf2, #e0f3ea)",
      "--sidebar-text": "#1e5345",
      "--sidebar-active": "#4dcf8f",
      "--shadow-color": "rgba(77, 207, 143, 0.3)",
      "--border-color": "#c7e9d8",
      "--icon-color": "#4dcf8f",
      "--positive-value": "#4dcf8f",
      "--negative-value": "#ef4444",
      "--transition-speed": "0.6s",
      "--card-animation": "mintRefresh",
      "--element-animation": "mintSlide",
      "--special-effect": "mint-swirl",
      "--theme-emoji": "🍀",
      "--accent-color-rgb": "77, 207, 143",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" opacity=\"0.08\"><path d=\"M15,5 C20,5 25,10 25,15 C25,20 20,25 15,25 C10,25 5,20 5,15 C5,10 10,5 15,5 Z\" stroke=\"%234dcf8f\" fill=\"none\" stroke-width=\"0.5\" /></svg>')",
    },
  },
  
  coffee: {
    name: "Coffee Break",
    properties: {
      "--bg-color": "#f5f0e8",
      "--text-color": "#3b2c20",
      "--accent-color": "#b38867",
      "--accent-gradient": "linear-gradient(135deg, #b38867, #c9a080)",
      "--card-bg": "#ece5db",
      "--card-bg-gradient": "linear-gradient(145deg, #f0e9df, #e7e0d6)",
      "--button-bg": "#b38867",
      "--button-gradient": "linear-gradient(to right, #b38867, #c9a080)",
      "--sidebar-bg": "linear-gradient(180deg, #ece5db, #e6dfd4)",
      "--sidebar-text": "#3b2c20",
      "--sidebar-active": "#b38867",
      "--shadow-color": "rgba(179, 136, 103, 0.3)",
      "--border-color": "#d9d0c1",
      "--icon-color": "#b38867",
      "--positive-value": "#6b9b70",
      "--negative-value": "#c34949",
      "--transition-speed": "0.6s",
      "--card-animation": "coffeeSteam",
      "--element-animation": "coffeeSlide",
      "--special-effect": "coffee-steam",
      "--theme-emoji": "☕",
      "--accent-color-rgb": "179, 136, 103",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" opacity=\"0.1\"><circle cx=\"10\" cy=\"10\" r=\"7\" stroke=\"%23b38867\" fill=\"none\" stroke-width=\"0.5\" /></svg>')",
    },
  },
  
  stone: {
    name: "Granite",
    properties: {
      "--bg-color": "#eaeaea",
      "--text-color": "#333333",
      "--accent-color": "#707070",
      "--accent-gradient": "linear-gradient(135deg, #707070, #8a8a8a)",
      "--card-bg": "#f5f5f5",
      "--card-bg-gradient": "linear-gradient(145deg, #f8f8f8, #f0f0f0)",
      "--button-bg": "#707070",
      "--button-gradient": "linear-gradient(to right, #707070, #8a8a8a)",
      "--sidebar-bg": "linear-gradient(180deg, #f0f0f0, #dedede)",
      "--sidebar-text": "#333333",
      "--sidebar-active": "#707070",
      "--shadow-color": "rgba(112, 112, 112, 0.3)",
      "--border-color": "#d0d0d0",
      "--icon-color": "#707070",
      "--positive-value": "#16a34a",
      "--negative-value": "#dc2626",
      "--transition-speed": "0.7s",
      "--card-animation": "stoneReveal",
      "--element-animation": "stoneFade",
      "--special-effect": "dust-particles",
      "--theme-emoji": "🪨",
      "--accent-color-rgb": "112, 112, 112",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" opacity=\"0.08\"><rect x=\"0\" y=\"0\" width=\"20\" height=\"20\" fill=\"%23707070\" /><rect x=\"20\" y=\"20\" width=\"20\" height=\"20\" fill=\"%23707070\" /></svg>')",
    },
  },
  
  cherry: {
    name: "Cherry Blossom",
    properties: {
      "--bg-color": "#fff0f3",
      "--text-color": "#5c0f2d",
      "--accent-color": "#e84a5f",
      "--accent-gradient": "linear-gradient(135deg, #e84a5f, #ff6b7e)",
      "--card-bg": "#ffe6eb",
      "--card-bg-gradient": "linear-gradient(145deg, #ffecf0, #ffe0e6)",
      "--button-bg": "#e84a5f",
      "--button-gradient": "linear-gradient(to right, #e84a5f, #ff6b7e)",
      "--sidebar-bg": "linear-gradient(180deg, #ffecf0, #ffd6df)",
      "--sidebar-text": "#5c0f2d",
      "--sidebar-active": "#e84a5f",
      "--shadow-color": "rgba(232, 74, 95, 0.3)",
      "--border-color": "#ffbbc9",
      "--icon-color": "#e84a5f",
      "--positive-value": "#06b6d4",
      "--negative-value": "#e84a5f",
      "--transition-speed": "0.6s",
      "--card-animation": "cherryPop",
      "--element-animation": "cherryBounce", 
      "--special-effect": "cherry-blossoms",
      "--theme-emoji": "🌸",
      "--accent-color-rgb": "232, 74, 95",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" opacity=\"0.07\"><path d=\"M10,1 C10,1 8,5 5,5 C2,5 1,1 1,1 C1,1 2,5 2,8 C2,11 5,10 10,10 C15,10 18,11 18,8 C18,5 19,1 19,1 C19,1 18,5 15,5 C12,5 10,1 10,1 Z\" fill=\"%23e84a5f\" /></svg>')",
    },
  },
  
  autumn: {
    name: "Autumn Leaves",
    properties: {
      "--bg-color": "#fbf7f0",
      "--text-color": "#6b4423",
      "--accent-color": "#e07a5f",
      "--accent-gradient": "linear-gradient(135deg, #e07a5f, #f2a07b)",
      "--card-bg": "#f7efe4",
      "--card-bg-gradient": "linear-gradient(145deg, #fcf5eb, #f4eade)",
      "--button-bg": "#e07a5f",
      "--button-gradient": "linear-gradient(to right, #e07a5f, #f2a07b)",
      "--sidebar-bg": "linear-gradient(180deg, #fbf7f0, #f4ead5)",
      "--sidebar-text": "#6b4423",
      "--sidebar-active": "#e07a5f",
      "--shadow-color": "rgba(224, 122, 95, 0.3)",
      "--border-color": "#ecdcc3",
      "--icon-color": "#e07a5f",
      "--positive-value": "#669f65",
      "--negative-value": "#cd4c3a",
      "--transition-speed": "0.7s",
      "--card-animation": "autumnFloat",
      "--element-animation": "autumnFade",
      "--special-effect": "falling-leaves",
      "--theme-emoji": "🍂",
      "--accent-color-rgb": "224, 122, 95",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" opacity=\"0.1\"><path d=\"M20,5 L25,20 L40,25 L25,30 L20,45 L15,30 L0,25 L15,20 Z\" fill=\"%23e07a5f\" /></svg>')",
    },
  },
  
  azure: {
    name: "Azure Sky",
    properties: {
      "--bg-color": "#edf6ff",
      "--text-color": "#0c4a6e",
      "--accent-color": "#0284c7",
      "--accent-gradient": "linear-gradient(135deg, #0284c7, #38bdf8)",
      "--card-bg": "#dfeeff",
      "--card-bg-gradient": "linear-gradient(145deg, #e6f4ff, #d8e9ff)",
      "--button-bg": "#0284c7",
      "--button-gradient": "linear-gradient(to right, #0284c7, #38bdf8)",
      "--sidebar-bg": "linear-gradient(180deg, #e6f4ff, #d5e9ff)",
      "--sidebar-text": "#0c4a6e",
      "--sidebar-active": "#0284c7",
      "--shadow-color": "rgba(2, 132, 199, 0.3)",
      "--border-color": "#c0deff",
      "--icon-color": "#0284c7",
      "--positive-value": "#0891b2",
      "--negative-value": "#d53f8c",
      "--transition-speed": "0.6s",
      "--card-animation": "azureFloat",
      "--element-animation": "azureSlide",
      "--special-effect": "cloud-drift",
      "--theme-emoji": "☁️",
      "--accent-color-rgb": "2, 132, 199",
      "--theme-pattern": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"30\" opacity=\"0.08\"><path d=\"M15,15 Q30,0 45,15 Q60,30 75,15\" stroke=\"%230284c7\" fill=\"none\" stroke-width=\"0.5\" /></svg>')",
    },
  },
};

export const ThemeContext = createContext({
  theme: 'default',
  setTheme: () => {},
  isChanging: false,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default');
  const [isChanging, setIsChanging] = useState(false);

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
      applyTheme(savedTheme, false);
    } else {
      applyTheme('default', false);
    }
  }, []);

  // Apply theme by setting CSS variables on document root
  const applyTheme = (themeName, animate = true) => {
    const selectedTheme = themes[themeName];
    if (!selectedTheme) return;

    if (animate) {
      // Set changing state to trigger animations
      setIsChanging(true);
      
      // Add theme-change class to trigger global transition
      document.documentElement.classList.add('theme-changing');
      
      // Add the special effect class for the theme
      document.documentElement.setAttribute('data-theme-effect', selectedTheme.properties['--special-effect']);
      
      // Show theme emoji animation when theme changes
      if (selectedTheme.properties['--theme-emoji']) {
        showThemeChangeAnimation(selectedTheme.properties['--theme-emoji']);
      }
      
      // Remove the classes after animation completes
      setTimeout(() => {
        setIsChanging(false);
        document.documentElement.classList.remove('theme-changing');
      }, 800); // Duration of animation + buffer
    }

    // Apply theme properties
    Object.entries(selectedTheme.properties).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
    
    // Apply special backdrop-filter for glass theme
    if (themeName === 'glass') {
      document.documentElement.classList.add('theme-glass');
    } else {
      document.documentElement.classList.remove('theme-glass');
    }
  };

  // Create a temporary emoji animation when theme changes
  const showThemeChangeAnimation = (emoji) => {
    // Create container for emoji animations if it doesn't exist
    let container = document.getElementById('theme-emoji-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'theme-emoji-container';
      container.style.position = 'fixed';
      container.style.inset = '0';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '9999';
      container.style.overflow = 'hidden';
      document.body.appendChild(container);
    }
    
    // Clear existing emojis
    container.innerHTML = '';
    
    // Add multiple emojis with random positions
    for (let i = 0; i < 12; i++) {
      const emojiEl = document.createElement('div');
      emojiEl.textContent = emoji;
      emojiEl.style.position = 'absolute';
      emojiEl.style.fontSize = `${20 + Math.random() * 30}px`;
      emojiEl.style.left = `${Math.random() * 100}%`;
      emojiEl.style.top = `${Math.random() * 100}%`;
      emojiEl.style.opacity = '0';
      emojiEl.style.transform = 'translateY(20px)';
      emojiEl.style.transition = 'all 0.5s ease-out';
      
      container.appendChild(emojiEl);
      
      // Animate in
      setTimeout(() => {
        emojiEl.style.opacity = '1';
        emojiEl.style.transform = 'translateY(0)';
      }, i * 50);
      
      // Animate out
      setTimeout(() => {
        emojiEl.style.opacity = '0';
        emojiEl.style.transform = 'translateY(-20px) scale(0.8)';
      }, 600 + i * 50);
    }
    
    // Remove container after animation is complete
    setTimeout(() => {
      container.innerHTML = '';
    }, 1500);
  };

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    if (!themes[newTheme]) return;
    
    setTheme(newTheme);
    localStorage.setItem('selectedTheme', newTheme);
    applyTheme(newTheme, true);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange, isChanging }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;