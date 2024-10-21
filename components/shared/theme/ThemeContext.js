// import React, { createContext, useContext, useState, useEffect } from 'react';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   // بارگذاری وضعیت از localStorage
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     const savedTheme = localStorage.getItem('isDarkMode');
//     return savedTheme === 'true'; // تبدیل به boolean
//   });

//   useEffect(() => {
//     // افزودن یا حذف کلاس 'dark' بر اساس وضعیت isDarkMode
//     if (isDarkMode) {
//       document.body.classList.add('dark');
//     } else {
//       document.body.classList.remove('dark');
//     }

//     // ذخیره‌سازی وضعیت theme در localStorage
//     localStorage.setItem('isDarkMode', isDarkMode);
//   }, [isDarkMode]);

//   const toggleTheme = () => {
//     setIsDarkMode((prevMode) => !prevMode);
//   };

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
