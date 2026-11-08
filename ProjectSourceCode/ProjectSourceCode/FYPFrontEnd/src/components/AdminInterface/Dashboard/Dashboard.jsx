import './Dashboard.css';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

import { FcDeleteDatabase } from "react-icons/fc";
import { TbGitBranchDeleted } from "react-icons/tb";
import { MdDashboardCustomize, MdSupervisorAccount } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { PiScrollFill } from "react-icons/pi";
import { GiFoldedPaper } from "react-icons/gi";
import { SiAdguard } from "react-icons/si";
// import { MdDashboard } from "react-icons/md";
const Dashboard = () => {
  const [loginData, setLoginData] = useState([]); // data from database

  // const [Empdata, setEmpData] = useState([]);
  // const [EmpDeldata, setEmpDelData] = useState([]);
  // const [Prisdata, setPrisData] = useState([]);
  // const [PrisDeldata, setPrisDelData] = useState([]);
  // const [LoginData, setLoginData] = useState([]);

  useEffect(() => {
    fetchData();
}, []);

const fetchData = async () => {
    try {  
      const response = await axios.get('/api/registrationForm/LoginScreenForm');
      setLoginData(response.data);    
      console.log("login data from backend...",loginData);
        // const EmployeeData = await axios.get('http://localhost:5000/api/EmployeeData');// Employee Data
        // setEmpData(EmployeeData.data);
        // const PrisonerData = await axios.get('http://localhost:5000/api/getData');// Prisoner Data
        // setPrisData(PrisonerData.data);
        // const EmployeeDel = await axios.get('http://localhost:5000/api/DeleteEmployeeRecords');// Employee Delete Data
        // setEmpDelData(EmployeeDel.data);
        // const PrisonerDelData =  await axios.get('http://localhost:5000/api/getdelPrisonerRecords');// Prisoner Delete Data
        // setPrisDelData(PrisonerDelData.data);
        // const Login_Data = await axios.get('http://localhost:5000/api/LoginScreenForm');
        // setLoginData(Login_Data.data);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

  return (
    <div className='DashboardContainer'>
      
      <div className="col-sm-11">
      {/* <div className="DashboardText" style={{background:'white'}}>
        <h1 style={{color:'rgba(113, 99, 186, 255)'}}><MdDashboardCustomize />Admin </h1>
        <p>This is the Dashboard of System</p>
      </div> */}
      <div className="row" style={{backgroundColor:'white', padding:'20px'}}>
        <div className="col-sm-3"  >
          <div className="well" style={{background:'rgb(254,226,254)', marginRight:'4px'}}>
           <div style={{color:'rgba(113, 99, 186, 255)'}}> <h1><PiScrollFill /> </h1><h4>Degree</h4></div>
          <p style={{fontFamily:'bold'}}> Exist: <b style={{fontSize:'20px', color:'red'}}></b> 23 <i style={{float:'right', fontFamily:'bold'}}> Total: <b style={{fontSize:'20px', color:'green'}} >22</b></i></p>            
          </div>
        </div>
        <div className="col-sm-3" >
          <div className="well" style={{background:'rgb(235,254,235)',paddingLeft:'12px', marginLeft:'3px', marginRight:'2px'}}>
           <div style={{color:'rgba(113, 99, 186, 255)'}}> <h1><GiFoldedPaper /></h1><h4>Transcript</h4></div>
           <p style={{fontFamily:'bold'}}>Exist: <b style={{fontSize:'20px', color:'red'}}>22</b> <i style={{float:'right', fontFamily:'bold'}}>  Total: <b style={{fontSize:'20px', color:'green'}} >22</b> </i></p> 
          </div>
        </div>
        <div className="col-sm-3"  >
          <div className="well" 
          style={{background:'rgb(236,236,254)' 
          ,marginLeft:'3px', marginRight:'2px',
          }}>
            <SiAdguard/><h4>Varified</h4>
            <p style={{fontFamily:'bold'}}>Exist: <b style={{fontSize:'20px', color:'red'}}>11</b> <i style={{float:'right', fontFamily:'bold'}}> Total: <b style={{fontSize:'20px', color:'green'}} >22</b></i></p>  
          </div>
        </div> <br/>
        <div className="col-sm-3"  >
          <div className="well" style={{background:'rgb(251,233,233)', marginLeft:'3px',}}>
           <div style={{color:'rgba(113, 99, 186, 255)'}}> <h1><TbGitBranchDeleted /></h1><h4>New one:</h4></div>
           <p style={{fontFamily:'bold'}}>Exist: <b style={{fontSize:'20px', color:'red'}}>22</b>   
          <i style={{float:'right', fontFamily:'bold'}}> Total: <b style={{fontSize:'20px', color:'green'}} >33</b></i></p>  
          </div>
        </div> 
       
      </div>
      <div className='row2' style={{ marginTop:'1%' }}>      
        <div className="col-sm-12" style={{background:'rgba(113, 99, 186, 255)', color:'white', padding:'20px', overflow:'hidden'}}>
          <div className="DeletedPrisoner"  >
            <h3><b><MdSupervisorAccount />Exist Accounts :<b style={{fontSize:'35px', color:'red'}}> {loginData.length} </b></b>
           <b style={{float:'right'}}><PiUsersThreeFill/> Created Accounts: <b style={{ fontSize:'35px', color:'red'}}>{loginData[loginData.length -1 ]?.LID} </b></b>
            </h3>
          </div>
        </div>
        </div>
        </div> {/* 2nd row end    */}
      </div>
    
  )
}

export default Dashboard
