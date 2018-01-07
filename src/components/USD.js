import React from 'react';
import numeral from 'numeral';

const classNameFor = amount => amount > 0 ? 'text-success' : 'text-danger';

const USD = ({ amount, className }) => (
  <div className="USD">
    <p className={className ? className : classNameFor(amount)}>
      {numeral(amount).format('$0,0.00')}
    </p>
  </div>
);

export default USD;
