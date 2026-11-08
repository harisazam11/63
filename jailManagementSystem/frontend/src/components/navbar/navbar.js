import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { GiPrisoner } from "react-icons/gi";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { MdMarkEmailRead } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrUserNew } from "react-icons/gr";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";

import './layout.css';
const Navbar = () => {
  const location = useLocation();
  const [prevRole, setPrevRole] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);

  useEffect(() => {
    if (location.state && location.state.Role) {
      setCurrentRole(location.state.Role);
      setPrevRole(location.state.Role);
    } else {
      setCurrentRole(prevRole || "Visitor"); // Set to previous role if exists, otherwise default to Visitor
    }
  }, [location.state, prevRole]);

  // Check if the current location matches the login paths
  const isLoginOrRegistration = location.pathname === '/';
  
  return (
    <div>
      <div className="navbar" style={{borderBottom:"solid silver", color:'white'}}>
        {isLoginOrRegistration ? (
          <>
            <NavLink to="/" style={{textDecoration:'none' }} > Login</NavLink> 
          </>
        ) : (
          <>
            {console.log('Role :', currentRole)}
            {currentRole === "Admin"  && (
              <> 
                <NavLink to="/Dashboard" style={{textDecoration:'none'}}  ><MdMarkEmailRead/>Dashboard</NavLink>
                <NavLink to="/EmployeeEmail" style={{textDecoration:'none'}}  ><MdMarkEmailRead/>EMAIL</NavLink>
                <NavLink to="/Prisoner" style={{textDecoration:'none' }} ><GiPrisoner/>PRISONER</NavLink>           
                <NavLink to="/Employee" style={{textDecoration:'none'}}> <GiPoliceOfficerHead/>EMPLOYEES</NavLink> 
                <NavLink to="/EmpDelRecords" style={{textDecoration:'none'}}> <MdDelete/> EMP_DEL </NavLink>
                <NavLink to="/DelPrisrecords" style={{textDecoration:'none' }} ><GiPrisoner/>DEL_PRIS</NavLink>
                <NavLink to="/RegistraionForm" style={{textDecoration:'none' }} ><GrUserNew/> New_ACCOUNT</NavLink>
                <NavLink to="/AllAccount" style={{textDecoration:'none' }} ><FaUsersBetweenLines/> ALL_ACCOUNTS</NavLink>
              </>
            )}
            {currentRole === "suser" && (
              <>     
                <NavLink to="/Prisoner" style={{textDecoration:'none' }} > <GiPrisoner/> PRISONER </NavLink>           
                <NavLink to="/Employee" style={{textDecoration:'none'}}><GiPoliceOfficerHead/>EMPLOYEES</NavLink>
                <NavLink to="/EmployeeEmail" style={{textDecoration:'none' }} > <MdMarkEmailRead/> Email</NavLink> 
              </>
            )}           
            {currentRole === "Visitor" && (
              <> 
                <NavLink to="/Prisoner" style={{textDecoration:'none' }}><GiPrisoner/>PRISONER</NavLink>           
                <NavLink to="/Employee" style={{textDecoration:'none'}}><GiPoliceOfficerHead/>EMPLOYEES</NavLink>
              </>
            )}               
            
          </>
        )}
      </div>
      <NavLink to="/" style={{ textDecoration: 'none', position: 'fixed', bottom: 0, right: 0, color:'#7F27FF' }} className={"Logout"}>
  <MdOutlineLogout/> Logout
</NavLink>
    </div>
  );
}

export default Navbar;
