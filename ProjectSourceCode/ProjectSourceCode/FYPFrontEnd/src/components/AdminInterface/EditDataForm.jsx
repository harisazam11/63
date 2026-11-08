import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './verifyingData.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const EditDataForm = () => {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState([]);
    // Data come from VerifyingData.jsx
    const location = useLocation();
    const { Role } = location.state;

    useEffect(() => {
        if (Role) {
            setStudentData(Role);
        }
    }, [Role]);
    
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedStudentData = [...studentData];
        updatedStudentData[index] = { ...updatedStudentData[index], [name]: value };
        setStudentData(updatedStudentData);
    };

    // Edit the wrong data in Edit form
    const UpdateDataftn = async (event) => {
        event.preventDefault();
        try {
            for (let student of studentData) {
                await axios.put('/api/adminForm/updateData', student);
            }
            alert("Data Updated Successfully");
            navigate('/Admin');
        } catch (error) {
            console.log("Error occurred in Updated data:", error);
        }
    };

    const GotoBackftn = () => {
        navigate('/Admin');
    };

    console.log("registratinnnnnnnnn", studentData);
    return (
        <div>
            <div>
                <button onClick={GotoBackftn} title="Go back to Home">
                    <FaHome style={{color:"darkblue", width:"50px", fontSize:'30px'}}/>
                </button>
            </div>  
            <div>
                <form onSubmit={UpdateDataftn}>
                    {studentData.map((profile, index) => (
                        <div key={index}>
                            <div className="EditInputContainer">
                                <label className="EditLabelField">CMS:</label>
                                <input
                                    className='EditInputField'
                                    type="text"
                                    name="cms_id"
                                    value={profile.cms_id}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="EditInputContainer">
                                <label className="EditLabelField">Name:</label>
                                <input
                                    className='EditInputField'
                                    type="text"
                                    name="full_name"
                                    value={profile.full_name}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="EditInputContainer">
                                <label className="EditLabelField">Father Name:</label>
                                <input
                                    className='EditInputField'
                                    type="text"
                                    name="father_name"
                                    value={profile.father_name}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="EditInputContainer">
                                <label className="EditLabelField">Gender:</label>
                                <input
                                    className='EditInputField'
                                    type="text"
                                    name="gender"
                                    value={profile.gender}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="EditInputContainer">
                                <label className="EditLabelField">Address:</label>
                                <input
                                    className='EditInputField'
                                    type="text"
                                    name="address"
                                    value={profile.address}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="EditInputContainer">
                                <label className="EditLabelField">Batch:</label>
                                <input
                                    className='EditInputField'
                                    type="text"
                                    name="batch"
                                    value={profile.batch}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="EditInputContainer">
                                <label className="EditLabelField">Apply for:</label>
                                <input
                                    className='EditInputField'
                                    type="text"
                                    name="apply_for"
                                    value={profile.apply_for}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="EditInputContainer">
                                <label className="EditLabelField">Department:</label>
                                <input
                                    className='EditInputField'
                                    type="text"
                                    name="program_of_study"
                                    value={profile.program_of_study}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="EditInputContainer">
                                <label className="EditLabelField">Email:</label>
                                <input
                                    className='EditInputField'
                                    type="text"
                                    name="email"
                                    value={profile.email}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="EditInputContainer">
                                <label className="EditLabelField">Phone:</label>
                                <input
                                    className='EditInputField'
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="EditInputContainer">
                                <label className="EditLabelField">Domicile:</label>
                                <input
                                    className='EditInputField'
                                    type="text"
                                    name="domicile"
                                    value={profile.domicile}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="EditInputContainer">
                                <label className="EditLabelField">Province:</label>
                                <input
                                    className='EditInputField'
                                    type="text"
                                    name="province"
                                    value={profile.province}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="EditInputContainer">
                                <label className="EditLabelField">CNIC:</label>
                                <input
                                    className='EditInputField'
                                    type="text"
                                    name="cnic"
                                    value={profile.cnic}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="EditInputContainer">
                                <label className="EditLabelField">Registration NO:</label>
                                <input
                                    className='EditInputField'
                                    type="text"
                                    name="registration_no"
                                    value={profile.registration_no}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="button-container">
                        <button className="btn btn-primary" type="submit">Update</button>           
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDataForm;
