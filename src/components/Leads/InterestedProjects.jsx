import React from 'react';
import './interestedProjects.css';

const InterestedProjects = () => {
  return (
    <div className="projects-wrapper">
      <div className="project-card">
        <h3>Interested Projects</h3>
        <div className="project-info">
          <p><strong>Project:</strong> Suraburdi Backyard</p>
          <p><strong>Meeting:</strong> -</p>
          <p><strong>Brochure:</strong> -</p>
          <p><strong>Price Quote:</strong> <button className="quick-quote">Send Quick Quote</button></p>
          <p><strong>Deal Stage:</strong> Prospect</p>
          <p><strong>Expected Close Date:</strong> -</p>
          <p><strong>Revenue:</strong> -</p>
        </div>
      </div>

      <div className="project-card">
        <h3>Previous Activities</h3>
        <div className="project-info">
          <p><strong>Interest Shown on:</strong> Today at 1:03 PM</p>
        </div>
      </div>
    </div>
  );
};

export default InterestedProjects;
