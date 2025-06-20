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
                    <button className="edit-btn" onClick={() => handleEdit(index + (currentPage - 1) * itemsPerPage)}>
                      ✏️
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(index + (currentPage - 1) * itemsPerPage)}>
                      🗑️
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
