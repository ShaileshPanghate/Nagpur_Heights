import React from 'react';
import './leadActivityTable.css';

const LeadActivityTable = () => {
  const activityData = [
    {
      label: 'Lead Activities Overview',
      siteVisits: 0,
      outgoingNotAnswered: 0,
      outgoingAnswered: 1,
      incomingNotAnswered: 0,
      incomingAnswered: 0,
    },
  ];

  return (
    <div className="activity-table-wrapper">
      <table className="activity-table">
        <thead>
          <tr>
            <th>Lead Activities Overview</th>
            <th>Site Visits Conducted</th>
            <th>Outgoing Not Answered Calls</th>
            <th>Outgoing Answered Calls</th>
            <th>Incoming Not Answered Calls</th>
            <th>Incoming Answered Calls</th>
          </tr>
        </thead>
        <tbody>
          {activityData.map((activity, index) => (
            <tr key={index}>
              <td>{activity.label}</td>
              <td>{activity.siteVisits}</td>
              <td>{activity.outgoingNotAnswered}</td>
              <td>{activity.outgoingAnswered}</td>
              <td>{activity.incomingNotAnswered}</td>
              <td>{activity.incomingAnswered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadActivityTable;
