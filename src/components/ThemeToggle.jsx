import { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { HiSun, HiMoon, HiDesktopComputer } from "react-icons/hi";

export default function ThemeToggle() {
  const { mode, setMode } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const items = [
    { key: "light", label: "Light", icon: HiSun },
    { key: "dark", label: "Dark", icon: HiMoon },
    { key: "system", label: "System", icon: HiDesktopComputer },
  ];

  const current = items.find((i) => i.key === mode);
  const CurrentIcon = current.icon;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full 
                   bg-gray-100 dark:bg-gray-800 
                   border border-gray-200 dark:border-gray-700
                   hover:bg-gray-200 dark:hover:bg-gray-700
                   transition-all duration-300 cursor-pointer"
      >
        <CurrentIcon className="w-4 h-4" />
        <span className="text-sm font-medium">{current.label}</span>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 min-w-[160px] rounded-xl 
                        border border-gray-200 dark:border-gray-700 
                        bg-white dark:bg-gray-800 shadow-lg z-50">
          {items.map((item) => {
            const Icon = item.icon;
            const active = mode === item.key;

            return (
              <button
                key={item.key}
                onClick={() => {
                  setMode(item.key);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left
                  transition-all duration-200 ${
                    active
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm flex-1">{item.label}</span>
                {active && <span className="text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}