import './Login.css';
import React, { useState, useEffect } from 'react'
import { decrypt, encrypt } from 'n-krypta'; //For es6
import axios from 'axios';

const ForgetForm = () => {

    const [loginData, setLoginData] = useState([]); // data from database

    const saltkey = "@#Aa12_-.+";

    const [CNIC, setCNIC] = useState('');  // data of frontend

    const [NewPassText, setNewPassText] = useState('');
    const [ConPassText, setConPassText] = useState('');
    const [updateCNIC, setupdateCNIC] = useState('');

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

    // password confirmation 
    const submitHandleFtn = (e) => {
        e.preventDefault();
        for (var i = 0; i < loginData.length; i++) {
            const Decryptcnic = decrypt(loginData[i].CNIC, saltkey);
            if (CNIC === Decryptcnic) {
                console.log("password match...");
                const encryptCNIC = encrypt(CNIC, saltkey);
                const encryptPass = encrypt(NewPassText, saltkey);
                setCNIC(encryptCNIC);
                setupdateCNIC(encryptCNIC);
                setNewPassText(encryptPass);
                console.log('update enc CNIC ', updateCNIC);
                console.log("encr CNIC", CNIC)
                console.log("encrypt password", NewPassText);
                updatePassword(updateCNIC);
            }
        }
    }
    // end submitHandleFtn

    // update value
    const updatePassword = async () => {
        await axios.put('http://localhost:5000/api/updatePassword', { updateCNIC, NewPassText })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error updating password:', error);
            });
    };



    console.log("Given Password (C): ", ConPassText);


    // Encryption
    const CNICFtn = (e) => {
        // const cnic = encrypt(e.target.value, saltkey);
        setCNIC(e.target.value);
    }
    const PasswordFtn = (e) => {
        // const PText = encrypt(e.target.value, saltkey);
        setNewPassText(e.target.value);
    }
    const ConPasswordFtn = (e) => {
        // const CPText = encrypt(e.target.value, saltkey);
        setConPassText(e.target.value);
    }



    //     if (!CNIC || !PassText || !ConPassText) {
    //         alert("Please fill in all the fields");
    //         return;
    //     }


    return (
        <div>
            <div className="login-box">
                <h2>Forget Password</h2>
                <form>
                    <div className="user-box">
                        <input type="text" placeholder="CNIC"
                            onChange={CNICFtn} />

                        <label>CNIC</label>
                    </div>
                    <div className="user-box">
                        <input type="password" placeholder="New Password"
                            onChange={PasswordFtn} />
                        <label>New Password</label>
                    </div>
                    <div className="user-box">
                        <input type="password" required
                            onChange={ConPasswordFtn}
                        />
                        <label>Confirm Password</label>
                    </div>
                    <button onClick={submitHandleFtn}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgetForm;