import { GoSun } from "react-icons/go";
import { GoMoon } from "react-icons/go";
import { useTheme } from "./ThemeContext";

// inside Header():
const { isDark, toggleTheme } = useTheme();

// replace the button:
<button
  onClick={toggleTheme}
  className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-yellow-300 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
>
  {isDark ? <GoMoon /> : <GoSun />}
</button>