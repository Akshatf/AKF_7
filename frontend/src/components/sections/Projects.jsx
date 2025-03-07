import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { projects } from "../../data/constants";
import ProjectCard from "../cards/ProjectCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  padding: 0px 16px;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ToggleButtonGroup = styled.div`
  display: flex;
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  border-radius: 12px;
  font-weight: 500;
  margin: 22px 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ToggleButton = styled.div`
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
  @media (max-width: 768px) {
    padding: 6px 8px;
    border-radius: 4px;
  }
  ${({ active, theme }) =>
    active &&
    `
  background:  ${theme.primary + 20};
  `}
`;

const Divider = styled.div`
  width: 1.5px;
  background: ${({ theme }) => theme.primary};
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
`;

const ShowMoreButton = styled.button`
  margin-top: 20px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.primary + 90};
  }
`;

const AnimatedProjectCard = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Projects = () => {
  const [toggle, setToggle] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(6);

  const filteredProjects =
    toggle === "all"
      ? projects
      : projects.filter((item) => item.category === toggle);

  const handleShowMore = () => {
    if (visibleProjects + 4 >= filteredProjects.length) {
      window.open("https://github.com/Akshatf", "_blank");
    } else {
      setVisibleProjects(visibleProjects + 4);
    }
  };

  return (
    <Container id="Projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc style={{ marginBottom: "40px" }}>
          I have worked on several projects. From web apps to basic ML Projects.
          Here are some of my projects.
        </Desc>

        <ToggleButtonGroup>
          <ToggleButton
            active={toggle === "all"}
            onClick={() => {
              setToggle("all");
              setVisibleProjects(6);
            }}
          >
            ALL
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "web app"}
            onClick={() => {
              setToggle("web app");
              setVisibleProjects(6);
            }}
          >
            WEB APPS
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "machine learning"}
            onClick={() => {
              setToggle("machine learning");
              setVisibleProjects(6);
            }}
          >
            MACHINE LEARNING
          </ToggleButton>
        </ToggleButtonGroup>

        <CardContainer>
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <AnimatedProjectCard key={index}>
              <ProjectCard project={project} />
            </AnimatedProjectCard>
          ))}
        </CardContainer>

        {filteredProjects.length > visibleProjects && (
          <ShowMoreButton onClick={handleShowMore}>
            {visibleProjects + 4 >= filteredProjects.length
              ? "See More on GitHub"
              : "See More Projects"}
          </ShowMoreButton>
        )}
      </Wrapper>
    </Container>
  );
};

export default Projects;
