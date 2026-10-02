"use client";

import { useTheme } from "@/components/site/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`relative flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        theme === "dark"
          ? "bg-[oklch(0.20_0.028_252)] border-[oklch(0.28_0.025_252)] text-amber-400 hover:bg-[oklch(0.25_0.028_252)] focus-visible:ring-amber-400"
          : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-400"
      } ${className}`}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`absolute transition-all duration-300 ${
          theme === "dark" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-90"
        }`}
      >
        <Moon className="w-4 h-4" />
      </span>
      <span
        className={`absolute transition-all duration-300 ${
          theme === "light" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-90"
        }`}
      >
        <Sun className="w-4 h-4" />
      </span>
    </button>
  );
}
