import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { decrypt } from 'n-krypta';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
const AllAccount = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState([]);

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

    const handleDelete = async (lid) => {
        try {
            await axios.delete(`http://localhost:5000/api/DeleteLoginScreenForm/${lid}`);
            // Update the state after successful deletion
            setLoginData(loginData.filter(item => item.LID !== lid));
            navigate('/');
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <div>
            <table style={{backgroundColor:'white', fontSize:'20px'}}>
                <thead > 
                    <tr >
                        <th></th>
                        <th></th>
                        <th>CNIC</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loginData.map((item) => {
                        const saltkey = "@#Aa12_-.+";
                        const decryptedCNIC = decrypt(item.CNIC, saltkey);
                        const decryptedPassword = decrypt(item.Password, saltkey);
                        return (
                            <tr key={item.LID}>
                                <td></td>
                                <td></td>
                                <td>{decryptedCNIC}</td>
                                <td>{decryptedPassword}</td>
                                <td>{item.Role}</td>
                                <td>
                                    <button onClick={() => handleDelete(item.LID)}><MdDeleteForever style={{color:'red'}}/></button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default AllAccount;
