import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InterestedProjects from './InterestedProjects';
import LeadActivityTable from './LeadActivityTable';
import './leadDetails.css';
import LeadRequirement from './LeadRequirement';


const LeadDetails = () => {
    const { id } = useParams();
    const [lead, setLead] = useState(null);

    useEffect(() => {
        const storedLeads = JSON.parse(localStorage.getItem('crm-leads')) || [];
        const selected = storedLeads.find(lead => lead.id.toString() === id);
        setLead(selected);
        console.log(lead);
    }, [id]);

    if (!lead) return <div>Loading or Lead not found...</div>;

    return (
        <div className='leadDetails' >
            <h2>Lead Details</h2>
            <div className='lead-details-wrapper' >
                <div>
                    <div className='lead-details-container'>
                        <div style={{ display: 'flex', gap: '25px' }}>
                            <img src="" alt="" />
                            <div>
                                <p><strong>Name:</strong> {lead.name}</p>
                                <p><strong>Phone:</strong> {lead.phone}</p>
                            </div>
                        </div>
                        <p><strong>Email:</strong> {lead.email}</p>
                        <p><strong>Source:</strong> {lead.source}</p>
                        <p><strong>assignedTo:</strong> {lead.assignedTo}</p>
                        <p><strong>Status:</strong> {lead.status}</p>
                    </div>
                    <LeadRequirement />
                </div>
                <div className='activity-table-section'>
                    <LeadActivityTable />
                    <InterestedProjects />
                </div>
            </div>
        </div>
    );
};

export default LeadDetails;
