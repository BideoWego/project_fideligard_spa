import React from 'react';
import { Input } from 'reactstrap';

const Dates = ({ dates, onChangeDate, value }) => (
  <div className="Dates">
    <h2>Date: {dates[value]}</h2>
    <div className="row justify-content-between">
      <div className="col-4">
        {dates[0]}
      </div>
      <div className="col-4 text-right">
        {dates[dates.length - 1]}
      </div>
    </div>
    <Input
      type="range"
      min={0}
      max={dates.length - 1}
      step={1}
      value={value}
      onChange={onChangeDate} />
  </div>
);

export default Dates;

