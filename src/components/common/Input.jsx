import React from "react";
import PropTypes from 'prop-types';

const Input = ({ label, error, className = "", containerClassName = "", ...props }) => {
  const inputClasses = `w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${error ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"} text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${className}`;

  return (
    <div className={containerClassName}>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
      <input className={inputClasses} {...props} />
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default Input;
