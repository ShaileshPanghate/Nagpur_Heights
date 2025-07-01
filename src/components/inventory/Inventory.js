import React, { useState } from 'react';
import Blocks from './Blocks';
import './inventory.css';
import data from '../data.json';

const Inventory = () => {
  const ProjectsList = data.ProjectsList;
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  // Function to calculate sold and available flats for a given project
  const getFlatCounts = (project) => {
    let sold = 0;
    let available = 0;

    project.Blocks.forEach((block) => {
      block.Floors.forEach((floor) => {
        floor.flats.forEach((flat) => {
          if (flat.status.toLowerCase() === 'sold') {
            sold++;
          } else {
            available++;
          }
        });
      });
    });

    return { sold, available };
  };

  return (
    <div className="projects-container">
      {!selectedProject ? (
        <div className="project-list">
          {ProjectsList.map((project) => {
            const { sold, available } = getFlatCounts(project);

            return (
              <div
                key={project.projectId}
                className="project-card"
                onClick={() => handleProjectClick(project)}
              >
                <h4>{project.projectName}<hr></hr></h4>
                <div>
                  <h6>
                    <span>Sold: {sold}</span>
                    <span style={{ marginLeft: '10px' }}>Available: {available}</span>
                  </h6>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="project-button">
            <button onClick={() => setSelectedProject(null)} className="back-button">
              ← Back to Projects
            </button>
            <h3>{selectedProject.projectName}</h3>
          </div>
          <Blocks project={selectedProject} />
        </div>
      )}
    </div>
  );
};

export default Inventory;
