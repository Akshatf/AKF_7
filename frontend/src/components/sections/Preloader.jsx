import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PreloaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c1b29;
  z-index: 9999;
`;

const Logo = styled.svg`
  width: 150px;
  height: 150px;
  .text {
    font-size: 70px;
    fill: none;
    stroke: #e05fcb;
    stroke-width: 2;
    stroke-dasharray: 300;
    stroke-dashoffset: 300;
    animation: dash 4s ease-in-out infinite;
  }
  
  @keyframes dash {
    0% {
      stroke-dashoffset: 300;
    }
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: -300;
    }
  }
`;

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show preloader for 3 seconds (adjust as needed)

    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <PreloaderWrapper>
      <Logo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text">
          AF
        </text>
      </Logo>
    </PreloaderWrapper>
  );
};

export default Preloader;
