import React from "react";
import PropTypes from 'prop-types';
import { Sun, Moon, Globe, StickyNote } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import Button from "../common/Button";

const AuthLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

      <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
        <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800" aria-label="Toggle theme">
          {theme === "light" ? <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
        </Button>
        <Button variant="ghost" size="sm" onClick={toggleLanguage} className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 flex items-center space-x-1">
          <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          <span className="text-sm font-medium leading-none text-gray-600 dark:text-gray-300">{language === "id" ? "EN" : "ID"}</span>
        </Button>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4 shadow-lg">
            <StickyNote className="w-8 h-8 text-white ms-[0.175rem]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">NoteVibe</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Your thoughts, organized beautifully</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">{children}</div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
