import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
import "./projects.css";

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8;

  const [formData, setFormData] = useState({
    projectName: "",
    companyName: "",
    ownerName: "",
    startDate: "",
    completionDate: "",
    status: "Pending",
    noOfBlocks: "1",
    blockName: "Block A",
    roomsPerFlat: "2",
    roomDimensions: ["10x12", "12x14"],
    flats: [
      { flatNumber: 1, status: "Available" },
      { flatNumber: 2, status: "Sold" },
      { flatNumber: 3, status: "Available" },
      { flatNumber: 4, status: "Sold" },
      { flatNumber: 5, status: "Available" },
    ]
  });
  

  // const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const handleRowClick = (proj) => {
    localStorage.setItem("selectedProject", JSON.stringify(proj));
    // navigate(`/project/${id}`); // ⬅️ Pass data via `state`
  };
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = (index = null) => {
    if (index !== null) {
      setFormData(projects[index]);
      setEditIndex(index);
    } else {
      setFormData({
        projectName: "",
        companyName: "",
        ownerName: "",
        startDate: "",
        completionDate: "",
        status: "Pending",
      });
      setEditIndex(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...projects, formData];
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
    setFormData({
      projectName: "",
      companyName: "",
      ownerName: "",
      startDate: "",
      completionDate: "",
      status: "Pending",
    });
  };

  const handleDelete = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <div className="projects-container dark-mode">
      <div className="projects-header">
        <div className="filter-group">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="newBtn" onClick={() => openModal()}>+ New Project</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="projects-table">
          <thead>
            <tr>
              <th>PROJECTS</th>
              <th>COMAPANY</th>
              <th>OWNER</th>
              <th>START DATE</th>
              <th>COMPLETION</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((proj, i) => (
              <tr key={i} onClick={() => handleRowClick(proj)} className="clickable-row">
                <td>{proj.projectName}</td>
                <td>{proj.companyName}</td>
                <td>{proj.ownerName}</td>
                <td>{proj.startDate}</td>
                <td>{proj.completionDate}</td>
                <td>
                  <div className={`status-bar ${proj.status.toLowerCase()}`}>{proj.status}</div>
                </td>
                <td>
                  <button className="material-symbols-outlined" onClick={() => openModal(i)}><span >
                    edit
                  </span></button>
                  <button className="material-symbols-outlined" onClick={() => handleDelete(i)}><span >
                    delete
                  </span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            &laquo;
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            &raquo;
          </button>
        </div>
      )}


      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editIndex !== null ? "Edit Project" : "Add Project"}</h3>
            <form onSubmit={handleSubmit}>
              <input name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Project Name" required />
              <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" required />
              <input name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="Owner Name" required />
              <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
              <input name="completionDate" type="date" value={formData.completionDate} onChange={handleChange} required />
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="modal-buttons">
                <button type="submit">{editIndex !== null ? "Update" : "Add"}</button>
                <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
