import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Archive, Plus } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const Navigation = () => {
  const { t } = useLanguage();

  const navItems = [
    {
      to: "/",
      icon: Home,
      label: t("activeNotes"),
      exact: true,
    },
    {
      to: "/archived",
      icon: Archive,
      label: t("archived"),
    },
    {
      to: "/add",
      icon: Plus,
      label: t("addNote"),
    },
  ];

  const navLinkClass = ({ isActive }) => `flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-sm" : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"}`;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.exact}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
