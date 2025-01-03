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
            d="M48 85C41 99 41 99 25.064 130.86 50.611 130.86 58.76 130.86 84.137 130.86 84.137 135.192 84.137 139.001 84.137 143.156 51.73 143.156 36.044 143.156 2.612 143.156 3.687 140.814 4.534 138.812 5.508 136.869 26.587 94.826 47.661 52.78 68.828 10.779 69.904 8.647 68.819 10.781 73.178 1.983 77.881 9.6 76.798 8.592 77.861 10.704 87.52 29.892 97.55 50.021 107.092 69.237 91.844 69.27 107.09 69.216 91.816 69.264 91.809 69.264 91.765 69.293 73.352 34.605 62.063 57.044 54 73 41 99ZM92.946 143.527 91 77 108 77 109 99 122 77 141 77 123 108 143 143 126 143 109 113 110 143ZM48 85 87 85 81 99 41 99M152 77 153 143 170 143 169 114 193 114 193 102 168 102 168 90 193 90 193 77 152 77"
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
