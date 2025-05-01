import React from 'react';

const Statistics = () => {
  // Sample data
  const eventData = [
    { month: 'Jan', count: 10 },
    { month: 'Feb', count: 15 },
    { month: 'Mar', count: 7 },
    { month: 'Apr', count: 20 },
    { month: 'May', count: 13 },
    { month: 'Jun', count: 9 },
  ];

  const userVisitData = [
    { month: 'Jan', users: 25 },
    { month: 'Feb', users: 32 },
    { month: 'Mar', users: 18 },
    { month: 'Apr', users: 40 },
    { month: 'May', users: 30 },
    { month: 'Jun', users: 22 },
  ];

  const maxEventCount = Math.max(...eventData.map(e => e.count));

  return (
    <div className="container mt-5" style={{padding:"0px"}}>
      <h2 className="text-center mb-4">Admin Dashboard - Statistics Overview</h2>

      {/* Monthly User Visits Table */}
      <div className="row mb-5">
        <div className="col-md-6 offset-md-3">
          <h4 className="text-center mb-3">Monthly User Visits</h4>
          <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>Month</th>
                <th>No. of Users Visited</th>
              </tr>
            </thead>
            <tbody>
              {userVisitData.map((item, index) => (
                <tr key={index}>
                  <td>{item.month}</td>
                  <td>{item.users}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bar Graph for Event Count */}
      <h4 className="text-center mb-3">Monthly Event Overview</h4>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '250px' }}>
        {eventData.map((event, index) => (
          <div key={index} style={{ 
              height: `${(event.count / maxEventCount) * 100}%`, 
              width: '40px', 
              margin: '0 10px',
              backgroundColor: '#6610f2', 
              textAlign: 'center', 
              color: 'white',
              borderRadius: '5px',
              position: 'relative',
              transition: '0.3s'
            }}>
            <div style={{ position: 'absolute', top: '-20px', width: '100%', fontSize: '14px' }}>{event.count}</div>
            <div style={{ position: 'absolute', bottom: '-25px', width: '100%', fontSize: '14px' }}>{event.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
