import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { decrypt } from 'n-krypta';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
const LoginForm = () => {
    const navigate = useNavigate();
  const [CMS, setCMS] = useState('');
  const [passText, setPassText] = useState('');

  const [Logindata, setLoginData] = useState([]);   // Data load from login table
  //   Switch to Dashboard page...
//   const [isSwitchToForget, setswitchToForget] = useState(true);

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
  for (let i = 0; i < Logindata.length; i++) {
      const saltkey = "@#Aa12_-.+";
      const DecryptCMS = decrypt(Logindata[i].CMS, saltkey);
      const DecryptPassword = decrypt(Logindata[i].Password, saltkey);
      const RoleData = Logindata[i].Role;
      console.log("CMS1: ", DecryptCMS);
      console.log("Password: ", DecryptPassword);
      console.log("Roles: ", RoleData);
  }

  // Encryption
  const submitHandleFtn = (e) => {
      e.preventDefault();
      const saltkey = "@#Aa12_-.+";
      let isLoggedIn = false;

      for (let i = 0; i < Logindata.length; i++) {
          const DecryptCMS = decrypt(Logindata[i].CMS, saltkey);
          const DecryptPassword = decrypt(Logindata[i].Password, saltkey);
          const RoleData = Logindata[i].Role;

          if (CMS === DecryptCMS && passText === DecryptPassword) {
              isLoggedIn = true;
              if (RoleData === 'Admin') {
                  alert("You are logged in successfully as Admin");
                //   navigate('/Dashboard', { state: { Role: "Admin" } });
                navigate('/Admin');
              }  else if (RoleData === 'Student') {
                  alert("You are logged in successfully as Student");
                  navigate('/DataForm');
                   
              } else {
                  alert("sorry your account has not been created first create your account");
                  setPassText('');
                  
              }
              break;
          }
      }

      if (!isLoggedIn) {
          alert("Incorrect CMS or Password.First you can create your account");  
      }
  };
  // End submitHandle...

  // Go to Forget Form
//   const GotoForgetForm = () => {
//       //   navigate('/RegistrationForm');
//       setswitchToForget(false);
//   }

// Go To Forget Form
// const GotoforgetPasswordFtn=()=>{
//     navigate('/ForgetForm')
// }

const createAccountForm =()=>{
    navigate('/createAccount')
}

  console.log(CMS, passText);
  return (
    <div >
      <>
            <div style={{fontSize: '20px' }} className='loginContainer'>                
                    <div>
                        <div className="login-box">
                            <h2>Login</h2>
                            <form>
                                <div className="user-box">
                                    <input type="text" required autoComplete='off' 
                                        onChange={e => setCMS(e.target.value)}
                                    />
                                    <label>CMS</label>
                                </div>
                                <div className="user-box">
                                    <input type="password" required autoComplete='off'
                                        onChange={e => setPassText(e.target.value)}
                                    />
                                    <label>Password</label>
                                </div>
                                {/* <div><small><i
                                     onClick={GotoforgetPasswordFtn} style={{float:'right', color:'blue'}} >
                                   Forget_Password</i></small>
                                </div> */}
                                <button onClick={submitHandleFtn}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Submit
                                </button>
                                <br/> <br/> 
                                <i style={{alignItems:'center', width:'125%'}}><small>You have no account? <i onClick={createAccountForm} style={{color:'blue' , whiteSpace:'break-spaces'}} className='SignupText'> Signup</i> </small></i>
                               
                                
                            </form>
                            
                        </div>
                    </div>
              
            </div>
        </>

    </div>
  );
};

export default LoginForm;
