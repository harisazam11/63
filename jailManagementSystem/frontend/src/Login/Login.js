import axios from 'axios';
import './Login.css';
import React, { useState, useEffect } from 'react'
import { decrypt } from 'n-krypta';
import { useNavigate } from 'react-router-dom';
import FgForm from './fgForm';
import { TbPasswordUser } from "react-icons/tb";

const LoginForm = () => {
    const navigate = useNavigate();
    const [loginCNIC, setCNIC] = useState([]);
    const [loginPassText, setPassText] = useState([]);
    // Data from Table
    const [Logindata, setLoginData] = useState([]);
    //   Switch to Dashboard page...
    const [isSwitchToForget, setswitchToForget] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/LoginScreenForm');
            setLoginData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    for (let i = 0; i < Logindata.length; i++) {
        const saltkey = "@#Aa12_-.+";
        const Decryptcnic = decrypt(Logindata[i].CNIC, saltkey);
        const DecryptPassword = decrypt(Logindata[i].Password, saltkey);
        const RoleData = Logindata[i].Role;
        console.log("CNIC: ", Decryptcnic);
        console.log("Password: ", DecryptPassword);
        console.log("Roles: ", RoleData);
    }

    // Encryption
    const submitHandleFtn = (e) => {
        e.preventDefault();
        const saltkey = "@#Aa12_-.+";
        let isLoggedIn = false;

        for (let i = 0; i < Logindata.length; i++) {
            const Decryptcnic = decrypt(Logindata[i].CNIC, saltkey);
            const DecryptPassword = decrypt(Logindata[i].Password, saltkey);
            const RoleData = Logindata[i].Role;

            if (loginCNIC === Decryptcnic && loginPassText === DecryptPassword) {
                isLoggedIn = true;
                if (RoleData === 'Admin') {
                    alert("You are logged in successfully as Admin");
                    navigate('/Dashboard', { state: { Role: "Admin" } });
                } else if (RoleData === 'Visitor') {
                    alert("You are logged in successfully as Visitor");
                    navigate('/EmployeeEmail', { state: { Role: "Visitor" } });
                } else if (RoleData === 'suser') {
                    alert("You are logged in successfully as User");
                    navigate('/EmpDelRecords', { state: { Role: "suser" } });
                } else {
                    alert("You are not accessible");
                    setPassText('');
                }
                break;
            }
        }

        if (!isLoggedIn) {
            alert("Incorrect CNIC or Password");
        }
    };
    // End submitHandle...

    // Go to Forget Form
    const GotoForgetForm = () => {
        //   navigate('/RegistrationForm');
        setswitchToForget(false);
    }
    return (
        <>
            <div style={{ backgroundColor: 'red', fontSize: '20px' }} className='loginContainer'>
                {isSwitchToForget ? (
                    <div>
                        <div className="login-box">
                            <h2>Login</h2>
                            <form>
                                <div className="user-box">
                                    <input type="text" required
                                        onChange={e => setCNIC(e.target.value)}
                                    />
                                    <label>CNIC</label>
                                </div>
                                <div className="user-box">
                                    <input type="password" required
                                        onChange={e => setPassText(e.target.value)}
                                    />
                                    <label>Password</label>
                                </div>
                                <div><i
                                    className='forgetPasswordText' onClick={GotoForgetForm}>
                                    <TbPasswordUser style={{ color: 'white' }} />Forget_Password</i>
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
                ) : (
                    <FgForm />
                )}
            </div>
        </>
    )
}

export default LoginForm;