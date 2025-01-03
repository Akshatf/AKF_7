import React, { useEffect } from "react";
import "./Loader.css";

const Loader = () => {
  useEffect(() => {
    const logo = document.querySelectorAll("#logo path");
    logo.forEach((path, index) => {
      console.log(`Path ${index} has length of ${path.getTotalLength()}`);
    });
  }, []);

  return (
    <div className="box">
      <div className="svgcontainer">
        <svg id="logo" viewBox="0 0 392 409" fill="none">
        <title>Loader</title>
          <path
            d="M48 85C41 99 41 99 25.064 130.86 50.611 130.86 58.76 130.86 84.137 130.86 84.137 135.192 84.137 139.001 84.137 143.156 51.73 143.156 36.044 143.156 2.612 143.156 3.687 140.814 4.534 138.812 5.508 136.869 26.587 94.826 47.661 52.78 68.828 10.779 69.904 8.647 68.819 10.781 73.178 1.983 77.881 9.6 76.798 8.592 77.861 10.704 87.52 29.892 97.55 50.021 107.092 69.237 91.844 69.27 107.09 69.216 91.816 69.264 91.809 69.264 91.765 69.293 73.352 34.605 62.063 57.044 54 73 41 99ZM92.946 143.527ZC99.4603 143.545 104.7637 143.533 110.067 143.521L108.996 112.297 132.206 112.238 132.089 99.898 108.261 99.806 108.017 87.944 130 88 130 75 91 76 91.145 75.951 91.82 100.279 91.82 100.279l1.096 43.094M48 85 87 85 81 99 41 99"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        {/* <div className="loading-text">Loading...</div> */}
      </div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default Loader;
