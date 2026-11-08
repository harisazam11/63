import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import './verifyingData.css';

const EditedForm = () => {
  const navigate = useNavigate();
  const [editedData, setEditedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/adminForm/EditedDataForm');
      const data = response.data;
      setEditedData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again later.');
    }
  };

  const goToHome = () => {
    navigate('/admin');
  };

//   Delete Data from Editableusers Table
  const DeleteEditedData =async(Student_ID)=>{
    try {
        await axios.delete('/api/adminForm/DeletedDataForm', { data: { Student_ID } });
        deleteAlert(); // call deleteAlert to go back to admin form
        fetchData(); // Refresh data after deletion
      } catch (error) {
        console.error('Error deleting User Account:', error);
        alert('Error deleting user account. Please try again later.');
      }
  }
// Delete Data and goto admin
const deleteAlert=()=>{
    alert("Data Deleted Successfully");
    navigate('/admin');
}

  return (
    <div>
      <div>
        <button onClick={goToHome} title="Go back to Home">
          <FaHome style={{ color: "darkblue", width: "50px", fontSize: '30px' }} />
        </button>
        Updated Users
      </div>
      <div className="AccountUsersContainer">
        <table>
          <caption>A list of Edited User Data.</caption>
          <thead>
            <tr>
              <th className="w-[100px] h-[50px]">SNO</th>
              <th className="w-[100px]">CMS</th>
              <th className="w-[100px]">Batch</th>
              <th className="w-[100px]">Apply for</th>
              <th className="w-[100px]">Department</th>
              <th className="w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {editedData.map((user, index) => (
              <tr key={index} className="h-[50px]">
                <td>{index + 1}</td>
                <td>{user.cms_id}</td>
                <td>{user.batch}</td>
                <td>{user.apply_for}</td>
                <td>{user.program_of_study}</td>
                <td>
                  <button>
                    <MdDeleteForever style={{ color: "darkblue", width: "50px", fontSize: '30px' }} onClick={()=>DeleteEditedData(user.Student_ID)} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditedForm;
