import './Login.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { encrypt , decrypt} from 'n-krypta';

function FgForm() {

  const [loginData, setLoginData] = useState([]); // data from database

  const [CNIC, setCNIC] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [conPassword, setconPassword] = useState('');
  const saltkey = "@#Aa12_-.+";


  // Get Data from loginscreen for comparing (CNIC)... 
  useEffect(() => {
    fetchData();
}, []);
const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/ForgetForm');
        setLoginData(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

//  Encryption  // 
  const encryptCNIC = (cnic) => {
    return encrypt(cnic, saltkey);
  }
  const encryptPassword = (pass) => {
    return encrypt(pass, saltkey);
  }
  const encryptconPassword =(conpass)=>{
    return encrypt(conpass, saltkey);
  }

// check Data 
  const checkftn =()=>{
    if (!CNIC || !newPassword) {
      alert("Please fill all fields");
      return false;
    }
    else{
    for (var i = 0; i < loginData.length; i++) {
      const Decryptcnic = decrypt(loginData[i].CNIC, saltkey);
      if (CNIC === Decryptcnic) {
         console.log("matching....");
         return updatePassword();
         
      }
    } //end loop
    alert("CNIC are not founded...");
       }
  }

  // check and send data to express js
  const updatePassword = async () => {     
      const encryptedCNIC = encryptCNIC(CNIC);
      const encryptedPassword = encryptPassword(newPassword);
      const ecryptedconPass = encryptconPassword(conPassword);
      console.log("password ", encryptedPassword);
      console.log("confirm password : ", ecryptedconPass);
     if(encryptedPassword === ecryptedconPass){
      alert("Your password has been updated successfully...");
      try {
        await axios.put('http://localhost:5000/api/updatePassword', { encryptedCNIC, encryptedPassword });
        console.log('Password updated successfully');
        window.location.reload();
      } catch (error) {
        console.error('Error updating password:', error);
      }
          } // end if
     else{
            alert("Password and confirm password not matching...");
            setNewPassword('');
            setconPassword('');
     }  // end else
  };

  return (
    <div >
      <div className="login-box">
        <h2>Forgot Password</h2>
        <div className='user-box'>
          <input type="text" required
            value={CNIC} onChange={e => setCNIC(e.target.value)}
          />
          <label>CNIC</label>
        </div>
        <div className='user-box'>
          <input type="password" required
            value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          <label>New Password</label>
        </div>
        <div className='user-box'>
          <input type="password" required
            value={conPassword} onChange={e => setconPassword(e.target.value)} />
          <label>Confirm Password</label>
        </div>
        <button className='forgetBtn' onClick={checkftn} style={{
          padding:'10px' ,
          color:'#7F27FF'
        }}>
          UPDATE PASSWORD</button>
      </div>
    </div>
  );
}

export default FgForm;
