import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css'; // Import your CSS file for styling
import { MdDashboard } from "react-icons/md";
import { CgTranscript } from "react-icons/cg";
import { MdOutlineRotate90DegreesCcw } from "react-icons/md";
import logo from './buitems_logo1.jpg';
const NavigationBar = () => {
  return (
    <div className="sidebar">
      <div className='logo'> <img src={logo} alt="logo" /></div>
      <div className='main'>
        <ul>
          <li>
            <NavLink to="/contact" className="nav-link">
              <MdDashboard  />
              Dashboard 
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="nav-link">
              <CgTranscript className="nav-icon" />
              Transcript</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav-link">
              <MdOutlineRotate90DegreesCcw className="nav-icon" />
             Degree </NavLink>
          </li> <hr />
        
          <li>
            <NavLink to="/contact" className="nav-link">
              <MdDashboard className="nav-icon" />
              Delete Records</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav-link">
              <MdDashboard className="nav-icon" />
              Verified</NavLink>
          </li> <hr />
          <li>
            <NavLink to="/contact" className="nav-link">
              <MdDashboard className="nav-icon" />
              New User</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav-link">
              <MdDashboard className="nav-icon" />
              update user</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav-link">
              <MdDashboard className="nav-icon" />
              Email to TCS</NavLink>
          </li><li>
            <NavLink to="/contact" className="nav-link">
              <MdDashboard className="nav-icon" />
              Contact</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav-link">
              <MdDashboard className="nav-icon" />
              logout</NavLink>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default NavigationBar;
