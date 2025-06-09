import React, { useState } from 'react';
import Blocks from './Blocks';
import './projects.css';

const Projects = () => {
  const [projects] = useState([
    { id: 1, name: 'Sunrise Residency' },
    { id: 2, name: 'Ocean View Towers' },
    { id: 3, name: 'Green Valley Homes' },
    { id: 4, name: 'Green Valley Homes' },
    { id: 5, name: 'Green Valley Homes' },
    { id: 6, name: 'Green Valley Homes' },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="projects-container">
      {!selectedProject ? (
        <div className="project-list">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={() => handleProjectClick(project)}
            >
              {project.name}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedProject(null)} className="back-button">
            ← Back to Projects
          </button>
          <h3>{selectedProject.name}</h3>
          <Blocks projectId={selectedProject.id} />
        </div>
      )}
    </div>
  );
};

export default Projects;