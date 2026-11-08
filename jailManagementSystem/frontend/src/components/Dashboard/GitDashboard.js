import './Dashboard.css';
import React from 'react'

import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { GrUserWorker } from "react-icons/gr";
import { FaHandcuffs } from "react-icons/fa6";
import { FcDeleteDatabase } from "react-icons/fc";
import { TbGitBranchDeleted } from "react-icons/tb";
import { MdDashboardCustomize, MdSupervisorAccount } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
// import { MdDashboard } from "react-icons/md";
const GitDashboard = () => { 
  return (
    <div className='DashboardContainer' style={{background:'whitesmoke'}}>
      
      <div className="col-sm-11" style={{marginTop:'20px'}}>
      <div className="DashboardText" style={{background:'white'}}>
        <h1 style={{color:'rgba(113, 99, 186, 255)'}}><MdDashboardCustomize />Admin </h1>
        <p>This is the Dashboard of Jail Management System</p>
      </div>
      <div className="row" style={{backgroundColor:'white', padding:'20px'}}>
        <div className="col-sm-3"  >
          <div className="well" style={{background:'rgb(254,226,254)', marginRight:'4px'}}>
           <div style={{color:'rgba(113, 99, 186, 255)'}}> <h4><h1><GrUserWorker /></h1>Employee</h4></div>
          <p style={{fontFamily:'bold'}}> Exist: <b style={{fontSize:'20px', color:'red'}}>10</b>  <i style={{float:'right', fontFamily:'bold'}}> Total: <b style={{fontSize:'20px', color:'green'}} >20</b></i></p>            
          </div>
        </div>
        <div className="col-sm-3" >
          <div className="well" style={{background:'rgb(235,254,235)',paddingLeft:'12px', marginLeft:'3px', marginRight:'2px'}}>
           <div style={{color:'rgba(113, 99, 186, 255)'}}> <h4><h1><FaHandcuffs /></h1>Prisoner</h4></div>
           <p style={{fontFamily:'bold'}}>Exist: <b style={{fontSize:'20px', color:'red'}}>10</b> <i style={{float:'right', fontFamily:'bold'}}>  Total: <b style={{fontSize:'20px', color:'green'}} >20</b> </i></p> 
          </div>
        </div>
        <div className="col-sm-3"  >
          <div className="well" 
          style={{background:'rgb(236,236,254)' 
          ,marginLeft:'3px', marginRight:'2px',
          }}>
            <h4><h1><FcDeleteDatabase /></h1>Deleted Employee</h4>
            <p style={{fontFamily:'bold'}}>Exist: <b style={{fontSize:'20px', color:'red'}}>10</b> <i style={{float:'right', fontFamily:'bold'}}> Total: <b style={{fontSize:'20px', color:'green'}} >20</b></i></p>  
          </div>
        </div> <br/>
        <div className="col-sm-3"  >
          <div className="well" style={{background:'rgb(251,233,233)', marginLeft:'3px',}}>
           <div style={{color:'rgba(113, 99, 186, 255)'}}> <h4><h1><TbGitBranchDeleted /></h1>Deleted Prisoner</h4></div>
           <p style={{fontFamily:'bold'}}>Exist: <b style={{fontSize:'20px', color:'red'}}>10</b>   
          <i style={{float:'right', fontFamily:'bold'}}> Total: <b style={{fontSize:'20px', color:'green'}} >20</b></i></p>  
          </div>
        </div> 
       
      </div>
      <div className='row2' style={{ marginTop:'1%' }}>      
        <div className="col-sm-12" style={{background:'rgba(113, 99, 186, 255)', color:'white'  , padding:'20px', overflow:'hidden'}}>
          <div className="DeletedPrisoner"  >
            <h3><b><MdSupervisorAccount />Exist Accounts :<b style={{fontSize:'35px', color:'red'}}> 10 </b></b>
           <b style={{float:'right'}}><PiUsersThreeFill/> Created Accounts: <b style={{ fontSize:'35px', color:'red'}}>20 </b></b>
            </h3>            
          </div>
        </div>
        </div>
        </div> {/* 2nd row end    */}
      </div>
    
  )
}

export default GitDashboard
