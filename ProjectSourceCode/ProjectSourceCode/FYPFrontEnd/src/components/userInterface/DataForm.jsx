import React, { createContext, useState } from 'react';
import './userInterface.css';
import PaymentMethod from './payment/Payment';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const StudentDataContext = createContext();

const DataForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [UpdateFile, setUpdateFile] = useState(null);
  const [gotoNext, setgotoNext] = useState(true);
  const [formData, setformData] = useState({});
  const [CNIC, setCNIC] = useState(''); 

  const switchToCheckInformation = () => {
    setgotoNext(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check form for blanks
    if (!formData.FullName || !formData.FatherName) {
      alert('Please fill in all the fields');
      return;
    } else {
      // store file into updateFile usestate to send to payment.jsx
      const formDataFile = new FormData();
      formDataFile.append('image', file);
      formDataFile.append('CNIC', CNIC);

      axios.post('/api/studentForm/upload', formDataFile, CNIC)
  .then((response) => {
    console.log(response.data);
    setUpdateFile(formDataFile);
    switchToCheckInformation();
  })
  .catch((error) => {
    console.error("There was an error uploading the file!", error);
  });
    }
  };

  // file upload to public folder
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (event) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
  };

  const CNIChandleChange = (event) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
    setCNIC(event.target.value);
  }

  const logoutFtn=()=>{
    navigate('/')
  }

  return (
    <div>
      <div className="logout" onClick={logoutFtn}>logout</div>
      {gotoNext ? (
        <div className="DataFormContianer">
          <div className="DataFormContainer2">
            <form className="DataForm" onSubmit={handleSubmit}>
              <h1 className="text-3xl" style={{ color: '#e48400' }}>Student Infomation</h1>
              <hr />
              <section id="important-instructions">
                <h2>Important Instructions:</h2>
                <ol>
                  <li>Attach a copy of Matric Certificate for the issuance of Original Degree. DMC is not accepted.</li>
                  <li>Attach a copy of BUITEMS Registration Card.</li>
                  <li>Attach a copy of Clearance Certificate.</li>
                  <li>Attach a copy of C.N.I.C.</li>
                  <li>Attach a recent Passport Size Photograph.</li>
                </ol>
              </section>
              <hr />
              <div className="form-group mt-4">
                <label htmlFor="formGroupExampleInput" className="input_Field">Full Name</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Full Name according to your CNIC" name="FullName" autoFocus onChange={handleChange} />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="formGroupExampleInput2" className="input_Field">Father's Name</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Father Name" name="FatherName" onChange={handleChange} />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="formGroupExampleInput" className="input_Field">Email Address</label>
                <input type="email" className="form-control" id="formGroupExampleInput" placeholder="abcd@gmail.com" name="EmailAddress" onChange={handleChange} />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="formGroupExampleInput2" className="input_Field">Date Of Birth</label>
                <input type="date" className="form-control" id="formGroupExampleInput2" placeholder="Select DOB" name="DateOfBirth" onChange={handleChange} />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="formGroupExampleInput2" className="input_Field">CNIC</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Write CNIC here" name="CNIC" value={CNIC} onChange={CNIChandleChange} />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="formGroupExampleInput" className="input_Field">Local/Domicile (District name):</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Write District name here" name="LocalDomicile" onChange={handleChange} />
              </div>
              <div className="form-group mt-3">
                <label className="input_Field">Gender:</label>
                <select className="form-control" id="studyProgram" name="gender" onChange={handleChange}>
                  <option value="" disabled selected>Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="formGroupExampleInput2" className="input_Field">Province</label>
                <select className="form-control" id="Province" name="Province" onChange={handleChange}>
                  <option value="" disabled selected>Select Province</option>
                  <option value="Baluchistan">Baluchistan</option>
                  <option value="KPK">KPK</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                </select>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="formGroupExampleInput2" className="input_Field">City</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="write your City" name="City" onChange={handleChange} />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="formGroupExampleInput2" className="input_Field">Phone/Mobile:</label>
                <input type="tel" className="form-control" id="formGroupExampleInput2" placeholder="Mobile Number which is active in use" name="MobileNumber" onChange={handleChange} />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="formGroupExampleInput2" className="input_Field">Address</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="your postal Address" name="Address" onChange={handleChange} />
              </div>
              <section className="form-group mt-3">
                <fieldset>
                  <legend><h2 style={{ color: '#e48400' }}>Academic Information</h2></legend>
                  <hr />
                  <div className="form-group mt-3">
                    <label htmlFor="program" className="input_Field">Program of Study:</label>
                    <div className="program-search">
                      <select className="form-control" id="studyProgram" name="studyProgram" onChange={handleChange}>
                        <option value="" disabled selected>Select Program</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Petroleum and Gas Engineering">Petroleum and Gas Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Textile Engineering">Textile Engineering</option>
                        <option value="Fashion and Textile Design">Fashion and Textile Design</option>
                        <option value="Chemical Engineering">Chemical Engineering</option>
                        <option value="Mining Engineering">Mining Engineering</option>
                        <option value="Geological Engineering">Geological Engineering</option>
                        <option value="B. Architecture">B. Architecture</option>
                        <option value="Computer Engineering">Computer Engineering</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Telecommunication Engineering">Telecommunication Engineering</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Biotechnology">Biotechnology</option>
                        <option value="Environmental Science">Environmental Science</option>
                        <option value="Microbiology">Microbiology</option>
                        <option value="BS Business Administration">BS Business Administration</option>
                        <option value="BS Economics">BS Economics</option>
                        <option value="BS Public Administration">BS Public Administration</option>
                        <option value="BS Education">BS Education</option>
                        <option value="BS English">BS English</option>
                        <option value="BS Fine Arts">BS Fine Arts</option>
                        <option value="BS International Relations">BS International Relations</option>
                        <option value="BS Mass Communication">BS Mass Communication</option>
                        <option value="BS Psychology">BS Psychology</option>
                        <option value="BS Sociology">BS Sociology</option>
                        <option value="BS Chemistry">BS Chemistry</option>
                        <option value="BS Mathematics">BS Mathematics</option>
                        <option value="BS Physics">BS Physics</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Law Degree">Law Degree</option>
                      </select>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="ApplyforProgram" className="input_Field">Apply for:</label>
                      <select className="form-control" id="studyProgram" name="ApplyProgram" onChange={handleChange}>
                        <option value="" disabled selected>Select to apply for</option>
                        <option value="Degree">Degree</option>
                        <option value="Transcript">Transcript</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="formGroupExampleInput2" className="input_Field">Batch</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Write Batch e.g: fall-2020" name="Batch" onChange={handleChange} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="formGroupExampleInput2" className="input_Field">Semester:</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="only for Transcript" name="Semester" onChange={handleChange} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="formGroupExampleInput2" className="input_Field">CMS ID/Enrollment No:</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Write your CMS ID here" name="CMSID" onChange={handleChange} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="formGroupExampleInput2" className="input_Field">BUITEMS Registration No:</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Write your Registration Number" name="RegistrationNumber" onChange={handleChange} />
                  </div>
                </fieldset>
              </section>
              <br />
              <section id="attachments">
                <fieldset>
                  <legend><h2 style={{ color: '#e48400' }}>Attachments</h2></legend>
                  <hr />
                  <div className="form-group mt-3">
                    <label htmlFor="formGroupExampleInput2" className="input_Field">Matric Certificate:</label>
                    <input type="file" className="form-control" aria-label="file example" accept=".pdf, .jpg, .png" name="MatricCertificate" onChange={handleFile} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="formGroupExampleInput2" className="input_Field">Registration Card:</label>
                    <input type="file" className="form-control" aria-label="file example" accept=".pdf, .jpg, .png" name="RegistrationCard" onChange={handleFile} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="formGroupExampleInput2" className="input_Field">Clearance Certificate:</label>
                    <input type="file" className="form-control" aria-label="file example" accept=".pdf, .jpg, .png" name="ClearanceCertificate" onChange={handleFile} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="formGroupExampleInput2" className="input_Field">CNIC:</label>
                    <input type="file" className="form-control" aria-label="file example" accept=".pdf, .jpg, .png," name="CNICPhotostate" onChange={handleFile} />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="formGroupExampleInput2" className="input_Field">Photograph:</label>
                    <input type="file" className="form-control" aria-label="file example" accept=".pdf, .jpg, .png" name="Photograph" onChange={handleFile} />
                  </div>
                  
                </fieldset>
              </section>
              <button className="btn btn-primary" style={{ background: 'darkblue', color: '#e48400', float: 'right', marginTop: '12px' }} type="submit">Next</button>
            </form>
          </div>
        </div>
      ) : (
        // Send Data to Payment page and then store in Database...
        <StudentDataContext.Provider value={{ formData, UpdateFile }}>
          <PaymentMethod />
        </StudentDataContext.Provider>
      )}
    </div>
  );
};

export default DataForm;
export { StudentDataContext };
