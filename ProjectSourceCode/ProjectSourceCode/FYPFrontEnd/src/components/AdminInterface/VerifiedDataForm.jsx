import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { HiClipboardDocumentList } from "react-icons/hi2";
import './verifyingData.css';

const VarifiedDataForm = () => {
    const navigate = useNavigate();
  const [varifiedValue, setVarifiedValue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get('/api/VarifiedData/VarifiedStudent');
        setVarifiedValue(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Varified student data:', error);
        setLoading(false);
      }
    }
    
    fetchStudents();
  }, []);

  // If Data not loaded then show the following message...
  if (loading) {
    return <div>Loading...</div>;
  }

// Delete Alert Message
const DeleteAlert =()=>{

    alert("Student Data has been deleted Successfully")

    //    Delete Data and go to Admin Dashboard
       navigate('/admin')
    return;
}
const GotoHomeftn = ()=>{
  navigate('/admin')
}
  
const DeleteUserProfile=(stdID)=>{
    
    try {
        axios.put('/api/VarifiedData/VarifiedStudent', {stdID});
        DeleteAlert();
      } catch (error) {
        console.error('Error fetching Varified student data:', error);
        setLoading(false);
      }
    
}

// Confirmation Student List
const GotoRecivedDocumentftn=()=>{
   navigate('/ConfirmationStudentsDocumentation');
}

  return (
    <div>
      <div><button onClick={GotoHomeftn} title="Go back to Home"><FaHome style={{color:"darkblue", width:"50px", fontSize:'30px'}}/></button> Varified Students List</div>
      <div><button onClick={GotoRecivedDocumentftn} className="RighButton" title="Checked Confirm Student list"><HiClipboardDocumentList style={{color:"darkblue", fontSize:'30px',width:'50px', float:'right'}}/></button> </div>
      
          
      
      <table >
        <caption>A list of your recently verified students.</caption>
        <thead>
          <tr>
            <th className="w-[100px] h-[50px]">SNO</th>
            <th className="w-[100px] ">CMS</th>
            <th className="w-[100px] ">Batch</th>
            <th className="w-[100px]">Apply for</th>
            <th className="w-[300px]">Department</th>
            <th className="w-[100px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {varifiedValue.map((student, index) => (
            <tr key={student.Student_ID} className=" h-[50px]">
              <td>{index + 1}</td>
              <td>{student.cms_id}</td>
              <td>{student.batch}</td>
              <td>{student.apply_for}</td>
              <td>{student.program_of_study}</td>
              <td>
                {/* Example button for opening user profile */}
                <button onClick={() => DeleteUserProfile(student.Student_ID)}><MdDeleteForever style={{color:"darkblue", width:"50px", fontSize:'30px'}}/></button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default VarifiedDataForm;
