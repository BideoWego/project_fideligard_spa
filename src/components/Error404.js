import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import  { NavLink } from 'reactstrap';

const Error404 = ({ backUrl }) => (
  <div className="Error404">
    <div className="text-danger">
      <h1>Error: 404 Not Found</h1>
      <p>Oops!</p>
    </div>
    <NavLink to={backUrl} tag={RRNavLink}>Back to application</NavLink>
  </div>
);

export default Error404;
