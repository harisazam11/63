import './admin.css';
import { Button } from '../ui/button';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiUsersThreeFill, PiScrollFill } from "react-icons/pi";
// import { GiFoldedPaper } from "react-icons/gi";
import { SiAdguard } from "react-icons/si";
import { FaRegEdit } from "react-icons/fa";

import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function StudentData() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [AlluserAccount, setAlluserAccount] = useState([]);
  // const [AllEditeduser, setAllEditeduser] = useState([]);
  // const [AllVarifieduser, setAllVarifeduser] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get('/api/adminForm'); // assuming your backend server serves the data at /api/adminForm
          setStudents(response.data);
        
        console.log("Students data..........",students)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);
// All Data collect from users
  // useEffect (()=>{
  //    fetchAlluserData();
  //    fetchAllEditeduser();
  //    fetchAllVarifiedduser();

  // },[])

  // const fetchAlluserData =async()=>{
  //   try{

  //     const response = await axios.get('/api/registrationForm/LoginScreenForm');
  //       setAlluserAccount(response.data);
  //   }
  //   catch(error){
  //     console.error('Error fetching student data:', error);
  //   }
  // }

  // const fetchAllEditeduser =async()=>{
  //   try{

  //     const response = await axios.get('/api/adminForm/EditedDataForm');
  //       setAllEditeduser(response.data);
  //   }
  //   catch(error){
  //     console.error('Error fetching student data:', error);
  //   }
  // }
  //  const fetchAllVarifiedduser =async()=>{
     
  //     try {
  //       const response = await axios.get('/api/VarifiedData/VarifiedStudent');
  //       setAllVarifeduser(response.data);
        
  //     } catch (error) {
  //       console.error('Error fetching Varified student data:', error);
        
  //     }
  //  }

  //  console.log("All User", AlluserAccount);
  //   console.log("All editd", AllEditeduser);


  if (loading) {
    return <div>Loading...</div>;
  }

  const openUserProfile = (student) => {
    const {Student_ID, cms_id, batch, apply_for, program_of_study } = student;
    const profileData = [{Student_ID, cms_id, batch, apply_for, program_of_study }];
    navigate('/verifyData', { state: { Role: profileData } });
  };
// Goto Verified Data Form
const GotoVerifiedDataForm =()=>{
  navigate('/VerifiedData');
}

// Goto Registration Form
const GotoRegistrationForm=()=>{
  navigate('/RegistrationForm');
}
// Go to All Account User form
const GotoAllAccountUser = ()=>{
  navigate('/AccountsUsers')
}
//  Go to Edited form which had been updated data
const GotoEditableUsers=()=>{
  navigate('/EditedForm')
}
const logoutFtn =()=>{
  navigate('/')
}

  return (
    <div className='AdminInterfaceOuterContainer'>
      {/* Dashboard in Admin Interface */}
      <div className='logout' onClick={logoutFtn}>logout</div>
      <div className="row" style={{ backgroundColor: 'white', padding: '10px', paddingBottom:'20px' , marginTop: '1px',boxShadow: '2px 2px 2px 2px', overflow:'hidden'  }}>
        <div className="col-sm-3">

          <div className="well" style={{ background: 'rgb(254,226,254)', marginRight: '4px' , boxShadow:'0px 5px 3px 4px' , cursor:'pointer'}} onClick={GotoAllAccountUser} >
            <div style={{ color: 'rgba(113, 99, 186, 255) '}} >
              <h1><PiScrollFill /><br /></h1>
              <h4 style={{ textAlign: 'center', fontSize: '20px' }}>All Users</h4>
            </div>
            <br />
            {/* <p style={{textAlign:'center', color:'green', fontSize:'25px'}}> {AlluserAccount.length-1}</p> */}
            
          </div>

        </div>
        <div className="col-sm-3">
          <div className="well" style={{ background: 'rgb(235,254,235)', paddingLeft: '12px', marginLeft: '3px', marginRight: '2px', boxShadow:'0px 5px 3px 4px', cursor:'pointer' }} onClick={GotoEditableUsers}>
            <div style={{ color: 'rgba(113, 99, 186, 255)' }}>
              <h1><FaRegEdit /></h1>
              <br />
              <h4 style={{ textAlign: 'center', fontSize: '20px' }}>Edited User</h4>
            </div>
            <br />
            {/* <p style={{textAlign:'center', color:'green', fontSize:'25px'}}> {AllEditeduser.length}</p> */}
          </div>
        </div>
        <div className="col-sm-3">
          <div className="well" style={{ background: 'rgb(236,236,254)', marginLeft: '3px', marginRight: '2px', boxShadow:'0px 5px 3px 4px', cursor:'pointer' }} onClick={GotoVerifiedDataForm}>
            <h1><SiAdguard /></h1>
            <br />
            <h4 style={{ textAlign: 'center', fontSize: '20px' }}>Verified</h4>
            <br />
            {/* <p style={{textAlign:'center', color:'green', fontSize:'25px'}}> {AllVarifieduser.length}</p> */}
          </div>
        </div>

        <div className="col-sm-3">
          <div className="well" style={{ background: 'rgb(251,233,233)', marginLeft: '3px', boxShadow:'0px 5px 3px 4px', cursor:'pointer' }} onClick={GotoRegistrationForm}>
            <div style={{ color: 'rgba(113, 99, 186, 255)' }}>
              <h1><PiUsersThreeFill /></h1>
              <br />
              <h4 style={{ textAlign: 'center', fontSize: '20px' }} >Add User</h4>
            </div>
            <br />
            {/* <p >Not Verified: <i style={{textAlign:'center', color:'green', fontSize:'25px'}}> {students.length}</i> </p> */}
          </div>          
        </div >

      </div>
      {/* Dashboard End */}
      {/* Student Data Display (Table) start */}
      <div className='AdminInterfaceContainer'>
        
        <div>
          <Table>
            <TableCaption>A list of your recent Students.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">SNO</TableHead>
                <TableHead className="w-[100px]">CMS</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Apply for</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={student.Student_ID} className='h-10'>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student.cms_id}</TableCell>
                  <TableCell>{student.batch}</TableCell>
                  <TableCell>{student.apply_for}</TableCell>
                  <TableCell>{student.program_of_study}</TableCell>
                  <TableCell>
                    <Button variant='mainButton' onClick={() => openUserProfile(student)}>
                      Open
                    </Button>
                    {/* <Button className='bg-red-800'>
                      <MdDeleteForever />
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Table Display Data End */}
    </div>
  );
}

export default StudentData;
