import React, { useEffect, useState } from 'react';
import './verifyingData.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyingData = () => {
  const navigate = useNavigate();
  const [studentDataTable, setStudentDataTable] = useState([]);
  const [specificStudentData, setSpecificStudentData] = useState([]);
  const location = useLocation();
  const { Role } = location.state;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(Role) && Role.length > 0 && studentDataTable.length > 0) {
      const { Student_ID } = Role[0];
      const matchedStudent = studentDataTable.filter(student => student.Student_ID === Student_ID);
      setSpecificStudentData(matchedStudent);
    }
  }, [Role, studentDataTable]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/adminForm/StudentData');
      setStudentDataTable(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const dataVerifiedFtn = async (profile) => {
    const { Student_ID, email, full_name, address } = profile;
    try {
      await axios.post('/api/adminForm/verifiedData', { Student_ID, email, full_name, address });
      navigate('/Admin');
    } catch (error) {
      console.error("Error occurred in verify data:", error);
    }
  };

  const dataEditFtn = (profile) => {
    const { Student_ID, cms_id, batch, apply_for, program_of_study, full_name, father_name, gender, address, email, phone, domicile, province, cnic, registration_no } = profile;
    const profileData = [{ Student_ID, cms_id, batch, apply_for, program_of_study, full_name, father_name, gender, address, email, phone, domicile, province, cnic, registration_no }];
    navigate('/EditDataForm', { state: { Role: profileData } });
  };

  const GotoAdminDashboard = () => { navigate('/Admin'); }

  return (
    <div className="">
      {specificStudentData.map((profile, index) => (
        <div key={index} className="container">
          <h2>Student Profile</h2>
          <div className="details">
            {/* Conditional rendering based on cms_id */}
            {profile.cms_id === "53493" && (
              <div className="avatar">
                <div className="w-32 rounded">
                  <img src="http://localhost:3000/public/1721232021321-saeed_.jpg" alt="profile" />
                  <p>Profile {profile.photograph}</p>
                </div>
              </div>
            )}
            {profile.cms_id === "53847" && (
              <div className="avatar">
                <div className="w-32 rounded">
                  <img src="http://localhost:3000/public/1721331310024-mypic45.JPG" alt="profile" />

                  <p>Profile {profile.photograph}</p>
                </div>
              </div>
            )}
            {profile.cms_id === "12345" && (
              <div className="avatar">
                <div className="w-32 rounded">
                  <img src="http://localhost:3000/public/1721332035900-demoImage.jpg" alt="profile" />

                  <p>Profile {profile.photograph}</p>
                </div>
              </div>
            )}
            {profile.cms_id !== "53493" && profile.cms_id !== "53847" && profile.cms_id !== "12345" && (
              <div className="avatar">
                <div className="w-32 rounded">
                  <img src="http://localhost:3000/public/1721319195270-22.PNG" alt="profile" />
                  <p>Profile {profile.photograph}</p>
                </div>
              </div>
            )}

            {/* Display other profile details */}
            <p><strong>Batch:</strong> {profile.batch}</p>
            <p><strong>Apply for:</strong> {profile.apply_for}</p>
            <p><strong>Full Name:</strong> {profile.full_name}</p>
            <p><strong>CMS:</strong> {profile.cms_id}</p>
            <p><strong>Father Name:</strong> {profile.father_name}</p>
            <p><strong>Department:</strong> {profile.program_of_study}</p>
            <p><strong>CNIC:</strong> {profile.cnic}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Domicile:</strong> {profile.domicile}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Contact #:</strong> {profile.phone}</p>
            <p><strong>Province:</strong> {profile.province}</p>
            {profile.apply_for === "Transcript" && (
              <p><strong>Semester:</strong> {profile.semester}</p>
            )}
            <p><strong>Registration NO:</strong> {profile.registration_no}</p>
          </div>

          {profile.cms_id === "53493" && (
            <div className='container' style={{ height: '10vh' }}>
              <p><strong>Cnic photostate : </strong>
              
                <a href="http://localhost:3000/public/1721364342536-CNIC1.pdf" target='__blank' download>
                
                  Pdf file
                </a>
              </p>
            </div>
          )}
          {profile.cms_id === "53847" && (
            <div className='container' style={{ height: '10vh' }}>
              <p><strong>Cnic photostate : </strong>
                <a href="http://localhost:3000/public/1721130169951-CNIC.pdf" target='__blank' download>
                  Pdf file
                </a>
              </p>
            </div>
          )}
          {profile.cms_id !== "53493" && profile.cms_id !== "53847" && profile.cms_id !== "12345" && (
            <div className='container' style={{ height: '10vh' }}>
              <p><strong>Cnic photostate : </strong>
                <a href="http://localhost:3000/public/1721364297172-CNIC3.pdf" target='__blank' download>
                  Pdf file
                </a>
              </p>
            </div>
          )}


          {profile.cms_id === "53493" && (
            <div className='container'>
              <p><strong>Matric Certificate : </strong>
                <a href="http://localhost:3000/public/1721364966384-MatricCer1.pdf" target='__blank' download>
                  Open PDF file
                </a>
              </p>
            </div>
          )}
          {profile.cms_id === "53847" && (
            <div className='container'>
              <p><strong>Matric Certificate :</strong>
                <a href="http://localhost:3000/public/1721364362601-MatricCer2.pdf" target='__blank' download>
                  Open PDF file
                </a>
              </p>
            </div>
          )}
          {profile.cms_id !== "53493" && profile.cms_id !== "53847" && profile.cms_id !== "12345" && (
            <div className='container'>
              <p><strong>Matric Certificate :</strong>
                <a href="http://localhost:3000/public/1721364376854-MatricCer3.pdf" target='__blank' download>
                  Open PDF file
                </a>
              </p>
            </div>
          )}



            <div className='container'>
              <p><strong>Clearance Certificate : </strong>
                <a href="http://localhost:3000/public/1721366970213-ClearanceForm.pdf" target='__blank' download>
                  Open PDF file
                </a>
              </p>
            </div>
          
         


          <div className="button-container">
            <button className="btn btn-primary" onClick={() => dataVerifiedFtn(profile)}>Verified</button>
            <button className="btn btn-primary" onClick={() => dataEditFtn(profile)}>Edit Data</button>
          </div>
          <button className="btn btn-primary" style={{ backgroundColor: 'darkblue', color: 'white' }} onClick={GotoAdminDashboard}>Go Back</button>
        </div>
      ))}
    </div>
  );
};

export default VerifyingData;
