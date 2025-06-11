import React, { useState } from 'react';
import Blocks from './Blocks';
import './projects.css';
import data from '../data.json';

const Projects = () => {
  const ProjectsList = data.ProjectsList;
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="projects-container">
      {!selectedProject ? (
        <div className="project-list">
          {ProjectsList.map((project) => (
            <div
              key={project.projectId}
              className="project-card"
              onClick={() => handleProjectClick(project)}
            >
              {project.projectName}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedProject(null)} className="back-button">
            ← Back to Projects
          </button>
          <h3>{selectedProject.projectName}</h3>
          {/* ✅ Pass the full selectedProject or just its id */}
          <Blocks project={selectedProject} />
        </div>
      )}
    </div>
  );
};

export default Projects;
