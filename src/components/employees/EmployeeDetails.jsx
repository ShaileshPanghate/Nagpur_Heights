import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import emp from './emp.json';
import './employee-details.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EmployeeDetails = () => {
    const { id } = useParams();
    const employeeData = emp.Employees.find(emp => emp.id === parseInt(id));

    const [employee, setEmployee] = useState(employeeData);
    const [selectedDate, setSelectedDate] = useState(null);

    if (!employee) return <p>Employee not found</p>;

    const handleDateClick = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setSelectedDate(formattedDate);
    };

    const markAttendance = (status) => {
        setEmployee((prev) => ({
            ...prev,
            attendance: {
                ...prev.attendance,
                [selectedDate]: status
            }
        }));
        setSelectedDate(null);
    };

    return (
        <div className="employee-details-wrapper">
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
                    onClickDay={handleDateClick}
                    tileContent={({ date, view }) => {
                        if (view === 'month') {
                            const formattedDate = date.toISOString().split('T')[0];
                            const status = employee.attendance?.[formattedDate];
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
                            const status = employee.attendance?.[formattedDate];
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

                {/* Attendance marking UI */}
                {selectedDate && (
                    <div className="attendance-mark-popup">
                        <p>Mark attendance for <strong>{selectedDate}</strong>:</p>
                        <button onClick={() => markAttendance('Present')}>Present</button>
                        <button onClick={() => markAttendance('Absent')}>Absent</button>
                        <button onClick={() => setSelectedDate(null)}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeDetails;
