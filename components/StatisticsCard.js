import React from 'react';

const StatisticsCard = ({ title, count }) => {
  return (
    <div className="statistics-card">
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  );
};

export default StatisticsCard;
