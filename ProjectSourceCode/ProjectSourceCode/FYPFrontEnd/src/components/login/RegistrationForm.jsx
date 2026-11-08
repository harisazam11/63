import './Login.css';
import React, { useState } from 'react';
import { encrypt } from 'n-krypta'; // For es6
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const saltkey = "@#Aa12_-.+";
  const [CMS, setCMS] = useState('');
  const [PassText, setPassText] = useState('');
  const [ConPassText, setConPassText] = useState('');
  const [selectedRole, setSelectedRole] = useState(''); // Select option Field
  const [userEmail, setUserEmail] = useState('');
  // State without encryption for email sending...
  const [Emailpassword, setEmailPassword] = useState('');
  const [EmailCMS, setEmailCMS] = useState('');

  const CMSFtn = (e) => {
    setEmailCMS(e.target.value);
    const CMS = encrypt(e.target.value, saltkey);
    setCMS(CMS);
  }
  const PasswordFtn = (e) => {
    setEmailPassword(e.target.value);
    const PText = encrypt(e.target.value, saltkey);
    setPassText(PText);
  }
  const ConPasswordFtn = (e) => {
    const CPText = encrypt(e.target.value, saltkey);
    setConPassText(CPText);
  }
  
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };
  
  const EmailFtn = (e) => {
    setUserEmail(e.target.value);
  };

  const submitHandleFtn = (e) => {
    e.preventDefault();
    if (PassText !== ConPassText) {
      return alert("Password and confirm password do not match.");
    }
    if (!CMS || !PassText || !ConPassText || !userEmail || !selectedRole) {
      return alert("Please fill in all the fields.");
    }
    StoreintoDatabase();
  }

  const StoreintoDatabase = () => {
    axios.post('/api/RegistrationForm/RegisterAdmin', { CMS, PassText, selectedRole, userEmail, EmailCMS, Emailpassword })
      .then(res => {
        console.log(res);
        alert("Account has been created...");
        navigate('/admin');
      })
      .catch(err => {
        console.error(err);
        alert("Error in registration. Please try again.");
      });
  }

  const GotoHomeftn = () => {
    navigate('/admin');
  }

  return (
    <div className='RegistrationContainer'>
      <div className="login-box" style={{ marginTop: '20px' }}>
        <div>
          <h2>
            <button onClick={GotoHomeftn} title="Go back to Home">
              <FaHome style={{ color: "darkblue", width: "50px", fontSize: '30px' }} />
            </button>
            Registration
          </h2>
        </div>
        <form onSubmit={submitHandleFtn}>
          <div className="user-box">
            <input type="text" required autoComplete="off" onChange={CMSFtn} />
            <label>user ID</label>
          </div>
          <div className="user-box">
            <input type="password" required autoComplete="off" onChange={PasswordFtn} />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input type="password" required autoComplete="off" onChange={ConPasswordFtn} />
            <label>Confirm Password</label>
          </div>
          <div className="user-box">
            <input type="email" required autoComplete="off" onChange={EmailFtn} />
            <label>Email</label>
          </div>
          <div>
            <label htmlFor="roleSelect" style={{ color: 'darkblue' }}>Select Role:
              <select id="roleSelect" onChange={handleRoleChange} className="role-select" required>
                <option value="" disabled selected>Select One</option>
                <option value="Admin">Admin</option>
                <option value="Student">Student</option>
              </select>
            </label>
          </div>
          <button type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm;
