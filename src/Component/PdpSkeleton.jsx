import React, { useContext } from "react";
import { ThemeContext } from "../Store/ThemeProvider";

const PdpSkeleton = () => { 
  const {theme} = useContext(ThemeContext);
  // const dark = ""
  // const light = ""
  return (
    <div className={theme == "light" ? "animate-pulse max-w-7xl mx-auto px-6 py-10" : "animate-pulse bg-gray-500 max-w-7xl mx-auto px-6 py-10"}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Image Section */}
        <div className= "space-y-4">
          <div className="h-96 bg-gray-300 rounded-xl"></div>
          <div className={theme == 'light' ? "flex gap-4" : "flex gap-4 bg-gray-500"}>
            <div className="h-20 w-20 bg-gray-300 rounded-md"></div>
            <div className="h-20 w-20 bg-gray-300 rounded-md"></div>
            <div className="h-20 w-20 bg-gray-300 rounded-md"></div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-20 bg-gray-300 rounded"></div>
          <div className="h-12 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default PdpSkeleton;