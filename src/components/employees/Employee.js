// Modified Employee component to support calendar-based attendance structure
import React, { useState, useEffect } from 'react';
import './employee.css';
import emp from './emp.json'
import { useNavigate } from 'react-router-dom';

const Employee = () => {
  const navigate = useNavigate();
  const employeesList = emp.Employees;
  const [employees, setEmployees] = useState(employeesList);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [filterDept, setFilterDept] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', position: '', department: '', joiningDate: '', status: 'Active', attendance: {}
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Name, Email, and Phone are required!");
      return;
    }

    let updatedEmployees;
    if (isEditing) {
      updatedEmployees = employees.map((emp, index) =>
        index === editIndex ? { ...formData, id: emp.id } : emp
      );
    } else {
      const newId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
      updatedEmployees = [...employees, { ...formData, id: newId }];
    }

    setEmployees(updatedEmployees);
    setFormData({ name: '', email: '', phone: '', position: '', department: '', joiningDate: '', status: 'Active', attendance: {} });
    setIsEditing(false);
    setEditIndex(null);
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setFormData(employees[index]);
    setIsEditing(true);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const updatedEmployees = employees.filter((_, i) => i !== index);
      setEmployees(updatedEmployees);
    }
  };

  const uniqueDepartments = [...new Set(employees.map(emp => emp.department).filter(Boolean))];
  const uniquePositions = [...new Set(employees.map(emp => emp.position).filter(Boolean))];

  const filteredEmployees = employees.filter(emp =>
    (filterDept === '' || emp.department === filterDept) &&
    (filterPosition === '' || emp.position === filterPosition) &&
    (emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="employee-container">
      <div className="filters">
        <button className='newBtn' onClick={() => { setShowModal(true); setIsEditing(false); setFormData({ name: '', email: '', phone: '', position: '', department: '', joiningDate: '', status: 'Active', attendance: {} }); }}>
          + Add Employee
        </button>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
          <option value="">All Departments</option>
          {uniqueDepartments.map((dept, i) => <option key={i} value={dept}>{dept}</option>)}
        </select>
        <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)}>
          <option value="">All Positions</option>
          {uniquePositions.map((pos, i) => <option key={i} value={pos}>{pos}</option>)}
        </select>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>NAME</th><th>EMAIL</th><th>PHONE</th>
              <th>POSITION</th><th>DEPARTMENT</th><th>JOINING DATE</th><th>STATUS</th><th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.length === 0 ? (
              <tr><td colSpan="8" className="no-data">No employee data found.</td></tr>
            ) : (
              paginatedEmployees.map((emp, index) => (
                <tr key={index} onClick={() => navigate(`/employee/${emp.id}`)}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department}</td>
                  <td>{emp.joiningDate}</td>
                  <td>{emp.status}</td>
                  <td>
                    <button className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(index + (currentPage - 1) * itemsPerPage);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="#1f1f1f">
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                      </svg>
                    </button>
                    <button className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(index + (currentPage - 1) * itemsPerPage);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                        width="24px" fill="#1f1f1f">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{isEditing ? "Edit Employee" : "Add New Employee"}</h3>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} />
            <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleInputChange} />
            <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleInputChange} />
            <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} />
            <select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="modal-buttons">
              <button onClick={handleAddOrUpdate}>{isEditing ? "Update" : "Save"}</button>
              <button className="cancel" onClick={() => { setShowModal(false); setIsEditing(false); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
