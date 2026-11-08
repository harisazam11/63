import './Login.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { encrypt, decrypt } from 'n-krypta';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function ForgetForm() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState([]); // data from database

  const [CMS, setCMS] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [conPassword, setconPassword] = useState('');
  const [Emailing, setEmailing] = useState('');
  const saltkey = "@#Aa12_-.+";
  let UserCMS_email = '';
  let UserPassword_email = '';

  // Get Data from loginscreen for comparing (CMS)... 
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/registrationForm/LoginScreenForm');
      setLoginData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }; 
  //  Encryption  // 
  const encryptCMS = (CMS) => {  
    return encrypt(CMS, saltkey); // Add return statement here
  }
  const encryptPassword = (pass) => {
    return encrypt(pass, saltkey);
  }
  const encryptconPassword = (conpass) => {
    return encrypt(conpass, saltkey);
  }
    // check Data 
  const checkftn = () => {
    if (!CMS || !newPassword || !conPassword || !Emailing) {
      alert("Please fill all fields");
      return false;
    }
    
    else { 
         
      if (Emailing.includes('@student.buitms.edu.pk')) {
        for (var i = 0; i < loginData.length; i++) {
          const DecryptCMS = decrypt(loginData[i].CMS, saltkey);
          if (CMS === DecryptCMS) {
            console.log("matching....");         
            return updatePassword();
          }
        }                     
      } else {
          alert(`Please use the officially Buitems email format e.g., 123@student.buitms.edu.pk`);
      }

      //end loop
      alert("Sorry! this CMS are not founded...");
    }
  }
  // check and send data to express js
  const updatePassword = async () => {    
    const encryptedCMS = encryptCMS(CMS);
    const encryptedPassword = encryptPassword(newPassword);
    const ecryptedconPass = encryptconPassword(conPassword);
    
   UserCMS_email = CMS;
   UserPassword_email= newPassword;
    console.log("user Email : ", UserCMS_email);
    console.log("User Password Email : ", UserPassword_email);
    if (encryptedPassword === ecryptedconPass) {
      alert("Your password has been updated successfully...");
      try {
        await axios.put('/api/registrationForm/updatePassword', { encryptedCMS, encryptedPassword,  Emailing, UserCMS_email, UserPassword_email });
        console.log('Password updated successfully');
        navigate('/');        
      } catch (error) {
        console.error('Error updating password:', error);
      }
    } // end if
    else {
      alert("Password and confirm password not matching...");
      setNewPassword('');
      setconPassword('');
    }  // end else
  };

  // Go to login page
  const GotoLoginPageFtn =()=>{
    navigate('/');
  }

  return (
    <div >
      <div className="login-box">
        <div>
      <FaHome style={{fontSize:'20px', color:'darkblue'}} className='Homelogo' onClick={GotoLoginPageFtn}/>
      <h2> Forget Password</h2>
      </div>
        <div className='user-box'>
          <input type="text" required
            onChange={e => setCMS(e.target.value)}
          />
          <label>CMS</label>
        </div>
        <div className='user-box'>
          <input type="password" required
            onChange={e => setNewPassword(e.target.value)} />
          <label>New Password</label>
        </div>
        <div className='user-box'>
          <input type="password" required
            onChange={e => setconPassword(e.target.value)} />
          <label>Confirm Password</label>
        </div>
        <div className='user-box'>
          <input type="email" required
            onChange={e => setEmailing(e.target.value)} />
          <label>Email</label>
        </div>
        <button className='forgetBtn'
          onClick={checkftn}>
          UPDATE PASSWORD</button>
      </div>
    </div>
  );
}

export default ForgetForm;
