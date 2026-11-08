import './Employee.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdSearch } from "react-icons/io";
import { CgUserAdd } from "react-icons/cg";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
// import {  MdOutlineLocalPolice } from "react-icons/md";


const Employee = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [Empdata, setEmpData] = useState([]);

   
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/EmployeeData');
            setEmpData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // searching Employee
    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/EmpSearch/${searchTerm}`);
            setEmpData(response.data);
        } catch (error) {
            console.error('Error searching data:', error);
        }
    };
    // Deleting Employee
    const deletePrisoner = async (EmpId, fullName, fName, cnic, address, city,status, dob, phone, dutylocation, joiningdata) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/deleteEmployee/${EmpId}`,
            {
                data: {
                  fullName,
                  fName,
                  cnic, 
                  address,
                  city,
                  status,
                  dob,
                  phone,
                  dutylocation,
                  joiningdata,
                },
              }
            );
            console.log("Name : ", fullName, );
            console.log(response.data);
            alert('Data Deleted succesfully');
            window.location.reload();
            navigate('/Prisoner')
        } catch (error) {
            console.error('Error Deleting prisoner:', error);
        }
    };
    const GotoAddEmployeePage = () => {
        navigate('/AddEmployee');
    }
    return (
        <>
            <div>
                {/* <div> <h1 style={{ textAlign: 'center', textDecorationLine: 'underline', fontWeight: 'bolder' }}
                    className='EmployeeTextheading'>{<MdOutlineLocalPolice style={{ color: 'red' }} />}EMPLOYIES RECORDS </h1></div> */}
                    
                <div className='input-group mb-2' >
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter Employee CNIC"
                    />
                    <button onClick={handleSearch} style={{backgroundColor:'#7F27FF', color:'white'}} > 
                    < IoMdSearch style={{ fontSize: '20px' }} /></button>

                    <div style={{ marginLeft: '880px' }}>
                        <button 
                        style={{ padding: '10px', paddingLeft: '20px', fontWeight: 'bold', color: 'white',
                    backgroundColor:'#7F27FF' }}
                            onClick={GotoAddEmployeePage} >Add <CgUserAdd style={{ fontSize: '30px' }} />
                            </button></div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Employee ID</th>  {/* Use for only Database*/}
                            <th>Full Name</th>
                            <th>Father Name</th>
                            <th>CNIC</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Status</th>   {/* Join by Status ID*/}
                            <th>DOB /Age</th>  {/* Calculate Age from DOB*/}
                            <th>Phone</th>
                            <th>DutyLocation</th>
                            <th>Joining Date</th>
                            <th></th>
                        </tr> </thead> <tbody>
                        {Empdata.map((item) => (
                            <tr key={item.EID}>
                                <td>{item.EID}</td>
                                <td>{item.FullName}</td>
                                <td>{item.F_Name} </td>
                                <td>{item.CNIC}</td>
                                <td>{item.Address}</td>
                                <td>{item.City}</td>
                                <td>{item.Status}</td>
                                <td>{item.DOB}</td>
                                <td>{item.Phone}</td>
                                <td>{item.DutyLocation}</td>
                                <td>{item.JoiningDate}</td>
                                {/* onClick={() => deletePrisoner(item.PID)} */}
                                <button className='btn btn-danger'
                                    onClick={() => deletePrisoner(
             item.EID, `${item.FullName}`,`${item.F_Name}`, `${item.CNIC}`, `${item.Address}`, 
             `${item.City}`, `${item.Status}`, `${item.DOB}`, `${item.Phone}`, 
             `${item.DutyLocation}`, `${item.JoiningDate}`)}><MdDelete/></button>
                            </tr>
                        ))}        
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Employee;
