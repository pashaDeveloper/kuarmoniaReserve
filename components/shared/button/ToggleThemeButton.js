import { useEffect, useState } from "react";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import { useTheme } from "@/components/shared/theme/ThemeContext"; // دریافت تم از کانتکست

const ToggleThemeButton = () => {
  const { toggleTheme } = useTheme(); // گرفتن تابع toggleTheme از ThemeContext
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains("dark"));
  }, []);

  const handleToggle = () => {
    toggleTheme();
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-12 h-12 relative rounded-full shadow-lg dark:bg-gray-800">
        <button
          onClick={handleToggle}
          className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-lg backdrop-blur-lg focus:outline-none"
        >
          {isDarkMode ? (
            <BsSun
              className="text-white transform transition-transform  animate-spin-slow "
              size={24}
            />
          ) : (
            <BsMoonStarsFill
              className="text-gray-700 transform transition-transform  hover:translate-y-1"
              size={24}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ToggleThemeButton;
