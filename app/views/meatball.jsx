import React from 'react';
import { Link } from 'react-router';

const Meatball = props => (
  <div>
    <div>Meatball</div>
    <Link to="/spaghetti">To Spaghetti</Link>
  </div>
);

Meatball.propTypes = {
  children: React.PropTypes.any,
};

export default Meatball;
