import React from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Globe, LogOut, User, StickyNote } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import Button from "../common/Button";

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors duration-200">
              <StickyNote className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">{t("notes")}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">NoteVibe</p>
            </div>
          </Link>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}>
              {theme === "light" ? <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
            </Button>

            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-1" aria-label={`Switch to ${language === "id" ? "English" : "Indonesian"}`}>
              <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium leading-none text-gray-600 dark:text-gray-300">{language === "id" ? "EN" : "ID"}</span>
            </Button>

            {user && (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>

                <Button variant="outline" size="sm" onClick={logout} className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:border-red-700 dark:hover:text-red-400">
                  <span className="hidden sm:inline leading-none">{t("logout")}</span>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
