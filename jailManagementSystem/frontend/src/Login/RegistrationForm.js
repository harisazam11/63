import './Login.css';
import React, { useState } from 'react'
import { encrypt } from 'n-krypta'; //For es6
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegistrationForm = () => {
    const navigate = useNavigate();
    const saltkey = "@#Aa12_-.+";
    const [CNIC, setCNIC] = useState('');
    const [PassText, setPassText] = useState('');
    const [ConPassText, setConPassText] = useState('');
    const [selectedRole, setSelectedRole] = useState(''); // Select option Field


    // Encryption
    const CNICFtn = (e) => {
        const cnic = encrypt(e.target.value, saltkey);
        setCNIC(cnic);
    }
    const PasswordFtn = (e) => {
        const PText = encrypt(e.target.value, saltkey);
        setPassText(PText);
    }
    const ConPasswordFtn = (e) => {
        const CPText = encrypt(e.target.value, saltkey);
        setConPassText(CPText);
    }
    // for selection field
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
      };
    // password confirmation 
    const submitHandleFtn = (e) => {
        e.preventDefault();
        if (PassText === ConPassText) {
            return StoreintoDatabase();
        }
        else {
            return alert("Password are not matching....");
        }
    }

    const StoreintoDatabase = () => {
        if (!CNIC || !PassText || !ConPassText) {
            alert("Please fill in all the fields");
            return;
        }
        axios.post('http://localhost:5000/api/RegistrationFrom',
            { CNIC, PassText,selectedRole })
            .then(res => {
                console.log(res);
            }).catch(err => console.log(err));
        clearScreen();
    }
    const clearScreen = () => {
        alert("Account has been created...");
        setCNIC('');
        setConPassText('');
        setPassText('');
        navigate('/');
    }

    return (
        <div className='RegistrationContainer'>
            <div className="login-box" style={{marginTop:'20px'}}>
                <h2>Registration</h2>
                <form>
                    <div className="user-box">
                        <input type="text" required
                            onChange={CNICFtn}
                        />
                        <label>CNIC</label>
                    </div>
                    <div className="user-box">
                        <input type="password" required
                            onChange={PasswordFtn}
                        />
                        <label>Password</label>
                    </div>
                    <div className="user-box">
                        <input type="password" required
                            onChange={ConPasswordFtn}
                        />
                        <label>Confirm Password</label>
                    </div>

                    <div  >
                        <label htmlFor="roleSelect" style={{color:'whitesmoke'}}>Select Role:
                        <select id="roleSelect"  onChange={handleRoleChange} className="role-select"
                       >
                            <option disabled selected >Select One</option>
                            <option value="Admin">Admin</option>
                            <option value="Visitor">Visitor</option>
                            <option value="suser">User</option>
                        </select> </label>
                       
                    </div>

                    <button onClick={submitHandleFtn}>
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