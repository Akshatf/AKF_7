import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroImg from "../../images/download.png";
import HeroBgAnimation from "../HeroBgAnimation";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Toast trigger function with HTML content
const showToast = () => {
  toast.info(
    <div>
      Akshat just joined Infosys as an SDE Intern 🎉&nbsp;
      <a
        href="https://wa.me/919425718644?text=Hey%20Akshat%2C%20Congratulations%20on%20joining%20Infosys!%20%F0%9F%8E%89"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#6C63FF", // Accent color
          fontWeight: "bold",
          textDecoration: "underline",
        }}
      >
        {/* Congratulate him */}
      </a>
    </div>,
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: false,
      style: {
        background: "#fff",
        color: "#1e293b", // Slate-800
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        fontSize: "15px",
        fontWeight: "500",
        padding: "14px 16px",
        maxWidth: "380px",
        border: "1px solid #6C63FF", // Optional accent border
      },
      progressStyle: {
        background: "#6C63FF", // Progress bar color
        height: "4px",
        borderRadius: "0 0 12px 12px",
      },
    }
  );
};

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 30px 30px;
  z-index: 1;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
  @media (max-width: 960px) {
    padding: 66px 16px;
  }
  @media (max-width: 640px) {
    padding: 32px 16px;
  }
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: end;
  margin-bottom: 50px;
  @media (max-width: 960px) {
    order: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 80px;
    padding-right: 0px;
  }
  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 50px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) {
    text-align: center;
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 8px;
  }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) {
    text-align: center;
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

const Span = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
`;

const SubTitle = styled.div`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 42px;
  color: ${({ theme }) => theme.text_primary + 95};
  @media (max-width: 960px) {
    text-align: center;
    font-size: 16px;
  }
`;


const ResumeButton = styled.a`
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;
  width: 95%;
  max-width: 300px;
  text-align: center;
  padding: 16px 0;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  box-shadow: 20px 20px 60px #1f2634, -20px -20px 60px #1f2634;
  border-radius: 50px;
  font-weight: 600;
  font-size: 20px;
  color: white;
  &:hover {
    transform: scale(1.05);
    transition: all 0.4s ease-in-out;
    box-shadow: 20px 20px 60px #1f2634, -20px -20px 60px #1f2634;
    filter: brightness(1);
  }
  @media (max-width: 640px) {
    padding: 12px 0;
    font-size: 18px;
  }
`;


const Img = styled.img`
  width: 69%;
  margin-left: 200px;
  height: 50%;
  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
    margin-left: 41px;
  }
  @media (min-width: 640px) {
    margin-left: 137px;
  }
  @media (min-width: 910px) {
    margin-left: 200px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  @media (max-width: 960px) {
    justify-content: center;
    padding: 0;
  }
`;

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const timeout = setTimeout(() => {
      showToast();
    }, 1000); // 1 second

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div id="About">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <motion.div {...headContainerAnimation}>
          <HeroInnerContainer>
            <HeroLeftContainer>
              <motion.div {...headTextAnimation}>
                <Title>
                  Hi, I am <br /> {Bio.name}
                </Title>
                <TextLoop>
                  I am a
                  <Span>
                    <Typewriter
                      options={{
                        strings: Bio.roles,
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>
              <motion.div {...headContentAnimation}>
                <SubTitle>{Bio.description}</SubTitle>
              </motion.div>
              {isMobile ? (
                <ResumeButton href={Bio.resume} target="_blank">
                  View Resume
                </ResumeButton>
              ) : (
                <ResumeButton href={Bio.github} target="_blank">
                  GitHub Profile
                </ResumeButton>
              )}
            </HeroLeftContainer>
            <HeroRightContainer>
              <motion.div {...headContentAnimation}>
                <Tilt>
                  <Img src={HeroImg} alt="Akshat Farkya" />
                </Tilt>
              </motion.div>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>
      <ToastContainer />
    </div>
  );
};

export default Hero;
