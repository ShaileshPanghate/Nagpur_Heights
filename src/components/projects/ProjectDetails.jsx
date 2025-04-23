import React, { useEffect, useState } from "react";
import "./projectDetails.css";

const ProjectDetails = () => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedProject"));
    setProject(data);
  }, []);

  if (!project) return <p>Loading project details...</p>;

  return (
    <div className="project-details">
      <h2>Project Details</h2>
      <p><strong>Project Name:</strong> {project.projectName}</p>
      <p><strong>Company Name:</strong> {project.companyName}</p>
      <p><strong>Owner:</strong> {project.ownerName}</p>
      <p><strong>Start Date:</strong> {project.startDate}</p>
      <p><strong>Completion Date:</strong> {project.completionDate}</p>
      <p><strong>Status:</strong> {project.status}</p>
    </div>
  );
};

export default ProjectDetails;
