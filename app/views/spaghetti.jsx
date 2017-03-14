import React from 'react';
import { Link } from 'react-router';

const Spaghetti = props => (
  <div>
    <div>Spaghetti</div>
    <Link to="/">To Meatball</Link>
  </div>
);

Spaghetti.propTypes = {
  children: React.PropTypes.any,
};

export default Spaghetti;
