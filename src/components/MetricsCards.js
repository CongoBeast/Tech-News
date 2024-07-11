import React  from 'react';


// const metrics = [
//   { label: 'Number of Posts', value: 10 },
//   { label: 'Number of Drafts', value: 5 },
//   { label: 'Posts this week', value: 5 },
//   { label: 'Other Metric', value: 7 },
// ];

function MetricsCards({ metrics }) {
  return (
    <div className="row mb-4">
      {metrics.map((metric, index) => (
        <div key={index} className="col-md-2 mx mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <p className="card-title">{metric.label}</p>
              <h1 className="card-text">{metric.value}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MetricsCards;
