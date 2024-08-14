import React from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="logo">Ecom Course</div>
      <nav className="navigation">
        <ul>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/shopping">Shopping Cart</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
