import { useEffect, useState } from "react";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import { useTheme } from "@/pages/ThemeContext"; // دریافت تم از کانتکست

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
    <div className="flex justify-center !w-12 !h-12 profile-container rounded-full shine-effect">
      <button
        onClick={handleToggle}
        className="rounded-full !w-12 !h-12 flex items-center justify-center dark:bg-gray-800 shadow-lg backdrop-blur-lg profile-pic"
      >
        {isDarkMode ? (
          <BsSun className="text-white " size={24} />
        ) : (
          <BsMoonStarsFill className="text-gray-700" size={24} />
        )}
      </button>
    </div>
  );
};

export default ToggleThemeButton;
