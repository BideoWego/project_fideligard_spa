import React from 'react';
import numeral from 'numeral';

const classNameFor = amount => amount > 0 ? 'text-success' : 'text-danger';

const USD = ({ amount, className }) => (
  <span className="USD">
    <span className={className ? className : classNameFor(amount)}>
      {numeral(amount).format('$0,0.00')}
    </span>
  </span>
);

export const USDDiff = ({ amount, className }) => {
  return (
    <span className="USDDiff">
      {amount === null ? "N/A" : (
        <span className={className ? className : classNameFor(amount)}>
          { amount > 0 ? '+' : ''}
          {numeral(amount).format('$0,0.00')}
        </span>
      )}
    </span>
  );
};

export default USD;
