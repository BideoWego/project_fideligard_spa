import React from 'react';

const Dates = ({ dates, onChange, value }) => (
  <div className="Dates">
    <h2>Date</h2>
    <h3>{dates[value]}</h3>
    <input
      type="range"
      min="0"
      max={dates.length - 1}
      step="1"
      value={value}
      onChange={onChange} />
  </div>
);

export default Dates;

