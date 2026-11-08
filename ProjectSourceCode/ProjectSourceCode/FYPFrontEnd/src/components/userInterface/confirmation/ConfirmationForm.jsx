import React, { useState } from "react";
import './Confirmation.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmationForm = () => {
    const navigate = useNavigate();
    const [FullName, setFullName] = useState('');
    const [CMS, setCMS] = useState('');
    const [CNIC, setCNIC] = useState('');
    const [Received, setReceived] = useState('');

    const handleReceived = (event) => {
        event.preventDefault(); // Prevent the form from submitting the default way

        if (!FullName || !CMS || !CNIC || !Received) {
            alert("Please fill all fields");
            return;
        }

        axios.post('/api/adminForm/ConfirmationReceivedDocument', { FullName, CMS, CNIC, Received})
            .then((response) => {
                console.log(response.data);
                alert('Form submitted successfully');
                navigate('/')
            })
            .catch((error) => {
                console.error("There was an error submitting the form!", error);
                alert('There was an error submitting the form. Please try again.');
            });
    };

    return (
        <div>
            <div style={{ fontSize: '20px' }} >
                <div>
                    <h2 className="contag">Confirmation Form</h2>
                    <hr />
                    <form  onSubmit={handleReceived}>
                        <div>
                            <label>Full Name</label>
                            <input
                                className="form-control"
                                required
                                autoComplete='off'
                                value={FullName}
                                onChange={e => setFullName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>CMS</label>
                            <input
                                className="form-control"
                                required
                                autoComplete='off'
                                value={CMS}
                                onChange={e => setCMS(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="input_Field">CNIC</label>
                            <input
                                className="form-control"
                                required
                                autoComplete='off'
                                value={CNIC}
                                onChange={e => setCNIC(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label className="input_Field">Have you received your Educational Document:</label>
                            <select
                                className="form-control"
                                value={Received}
                                onChange={e => setReceived(e.target.value)}
                            >
                                <option value="" disabled>Select an option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <button type="submit" className="subButton">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationForm;
