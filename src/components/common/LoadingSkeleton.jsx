import React from "react";

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 mb-4">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full" />
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24" />
        <div className="flex space-x-2">
          <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
      </div>
    </div>
  </div>
);

export default LoadingSkeleton;
