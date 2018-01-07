import React from 'react';

const Dates = ({ dates, onChange, value }) => (
  <div className="Dates">
    <h2>Date: {dates[value]}</h2>
    <div class="row justify-content-between">
      <div class="col-4">
        {dates[0]}
      </div>
      <div class="col-4 text-right">
        {dates[dates.length - 1]}
      </div>
    </div>
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

