import './Login.css';
import cryptoRandomString from 'crypto-random-string';
import { encrypt } from 'n-krypta'; //For es6
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
const Getpassword = () => {
    const navigate = useNavigate();
    const saltkey = "@#Aa12_-.+";
    const [CMS, setCMS] = useState('');
    const [Email, setEmail] = useState('');
    const [passgenerate, setpassgenerate] = useState('');  // send this password to user through email
    const [encryptPass, setencryptPass] = useState('');
    const [encryptCMS, setencryptCMS] = useState('');
    // const [passSwitch, setPassSwitch] = useState(false);

useEffect(() => {
    passwordGenerator();  // generate password and store in useState (wait for all cases to be true)
}, []);

    const passwordGenerator = () => {
        const generatingPassword = cryptoRandomString({ length: 10, type: 'alphanumeric' });
        setpassgenerate(generatingPassword);
        const encryptingPassword = encrypt(generatingPassword, saltkey);
        setencryptPass(encryptingPassword);
        // setPassSwitch(true);       
    };
    
    const StoreintoDatabase = async() => {        
        alert("your account has been created...");       
        // use axios or any other library to make a POST request to backend API.
       await axios.post('/api/RegistrationForm', {CMS, passgenerate, Email, encryptPass, encryptCMS })
            .then(res => {
                console.log(res);
                navigate('/');
            }).catch(err => console.log(err));               
    }
    
    const submitForm =  (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (!CMS || !Email) {
            alert("Please fill in all the fields");
            return;
        } else {
            if (Email.includes('@student.buitms.edu.pk')) {
              alert(`Password has been sent to your email. Please check ${Email}, ${CMS}`);  
              StoreintoDatabase(); // Store data into the database            
                             
            } else {
                alert(`Please use the officially Buitems email format e.g., 123@student.buitms.edu.pk`);
            }
        }
    }
const handleCMSftn =(e)=>{
    const inputCMS = e.target.value;
    
    setCMS(inputCMS)   // send this CMS through email to user
        const encryptedCMS = encrypt(inputCMS, saltkey); 
        setencryptCMS( encryptedCMS);   // store encrypted CMS into Database
}

const gotoLoginPage =()=>{
    navigate('/')
}
    return (
        <div> 
            <div className='RegistrationContainer'>
                <div className="login-box" style={{ marginTop: '20px' }}>
                    <h2>Sign Up</h2>
                    <form >
                        <div className="user-box">
                            <input type="text"
                                onChange={handleCMSftn}
                            />
                            <label>CMS</label>
                        </div>
                        <div className="user-box">
                            <input type="email"
                                onChange={e => setEmail(e.target.value)}
                                placeholder='use buitems email(1234@buitems.com)'
                                value={Email}
                            />
                            <label>Email</label>
                        </div>
                        <button onClick={submitForm}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </button>
                        <br/> <br/> 
                                <i style={{alignItems:'center', width:'125%'}}><small>Already have an account! <i style={{color:'blue', whiteSpace:'break-spaces'}} onClick={gotoLoginPage} className='LoginText'> login</i> </small></i>          
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Getpassword;
