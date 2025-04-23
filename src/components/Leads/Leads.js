import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './lead.css';

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const leadsPerPage = 5; // you can adjust this

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        source: '',
        status: 'New',
        assignedTo: '',
    });
    const employees = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" }
    ];

    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('crm-leads')) || [];
        setLeads(stored);

    }, []);

    useEffect(() => {
        localStorage.setItem('crm-leads', JSON.stringify(leads));
        console.log(leads)
    }, [leads]);

    const indexOfLastLead = currentPage * leadsPerPage;
    const indexOfFirstLead = indexOfLastLead - leadsPerPage;
    const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);

    const totalPages = Math.ceil(leads.length / leadsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAdd = () => {
        if (!formData.name || !formData.email || !formData.phone) {
            return alert('Please fill Name, Email, and Phone');
        }

        const newLead = { ...formData, id: Date.now() };
        setLeads(prev => [...prev, newLead]);
        resetForm();
    };

    const handleEdit = (lead) => {
        setFormData(lead);
        setEditingId(lead.id);
    };

    const handleUpdate = () => {
        setLeads(leads.map(lead => (lead.id === editingId ? { ...formData, id: editingId } : lead)));
        setEditingId(null);
        resetForm();
    };

    const handleDelete = (id) => {
        setLeads(leads.filter(lead => lead.id !== id));
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', source: '', status: 'New' });
    };

    const handleRowClick = (id) => {
        navigate(`/lead/${id}`);
    };

    return (
        <div className="lead-container">
            <div className="lead-form">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                <input type="text" name="source" placeholder="Source (e.g., Website, Referral)" value={formData.source} onChange={handleChange} />
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Lost">Lost</option>
                    <option value="Converted">Converted</option>
                </select>
                <select name="assignedTo" value={formData.assignedTo} onChange={handleChange}>
                    <option value="">Assign to Employee</option>
                    {employees.map(emp => (
                        <option key={emp.id} value={emp.name}>{emp.name}</option>
                    ))}
                </select>

                {editingId ? (
                    <button onClick={handleUpdate}>Update Lead</button>
                ) : (
                    <button className='newBtn' onClick={handleAdd}>+ Add Lead</button>
                )}
            </div>

            <div className="table-wrapper">
                <table className="lead-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Source</th>
                            <th>Status</th>
                            <th>Assigned To</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLeads.map((lead, index) => (
                            <tr key={lead.id} onClick={() => handleRowClick(lead.id)} className="clickable-row">
                                <td>{indexOfFirstLead + index + 1}</td>
                                <td>{lead.name}</td>
                                <td>{lead.email}</td>
                                <td>{lead.phone}</td>
                                <td>{lead.source}</td>
                                <td>{lead.status}</td>
                                <td>{lead.assignedTo}</td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <button className="edit-btn" onClick={() => handleEdit(lead)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                            fill="#1f1f1f">
                                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                        </svg>
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDelete(lead.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                            width="24px" fill="#1f1f1f">
                                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                        </svg></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination-controls">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>

            </div>
        </div>
    );
};

export default Leads;
