import React from "react";
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary-500 ${sizeClasses[size]} ${className}`} />;
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default LoadingSpinner;
