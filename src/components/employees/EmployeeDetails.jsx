import React from 'react';
import { useParams } from 'react-router-dom';
import emp from './emp.json';
import './employee-details.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



const EmployeeDetails = () => {
    const { id } = useParams();
    const employee = emp.Employees.find(emp => emp.id === parseInt(id));

    if (!employee) return <p>Employee not found</p>;

    return (
        <div className="employee-details">
            <h2>{employee.name}</h2>
            <div className="details-grid">
                <div className="detail-item"><strong>Email:</strong> {employee.email}</div>
                <div className="detail-item"><strong>Phone:</strong> {employee.phone}</div>
                <div className="detail-item"><strong>Position:</strong> {employee.position}</div>
                <div className="detail-item"><strong>Department:</strong> {employee.department}</div>
                <div className="detail-item"><strong>Status:</strong> {employee.status}</div>
                <div className="detail-item"><strong>Joining Date:</strong> {employee.joiningDate}</div>
            </div>

            <h3>Attendance Calendar</h3>
            <Calendar
                tileContent={({ date, view }) => {
                    if (view === 'month') {
                        const formattedDate = date.toISOString().split('T')[0];
                        const status = employee.attendance[formattedDate];
                        if (status === 'Present') {
                            return <div style={{ color: 'green', fontSize: '0.7rem' }}>✔</div>;
                        } else if (status === 'Absent') {
                            return <div style={{ color: 'red', fontSize: '0.7rem' }}>✘</div>;
                        }
                    }
                    return null;
                }}
                tileClassName={({ date, view }) => {
                    if (view === 'month') {
                        const formattedDate = date.toISOString().split('T')[0];
                        const status = employee.attendance[formattedDate];
                        if (status === 'Present') {
                            return 'present-day';
                        }
                        if (status === 'Absent') {
                            return 'absent-day';
                        }
                    }
                    return null;
                }}
            />

        </div>
    );
};

export default EmployeeDetails;
