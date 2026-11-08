import axios from "axios";
import React, { useEffect, useState } from "react";

import '../AdminInterface/verifyingData.css';
import { useNavigate } from "react-router-dom";
// import { FaHome } from "react-icons/fa";
import { FaThList } from "react-icons/fa";
const ConfirmationStudentsDocumentation = () => {
    const navigate = useNavigate();
  const [varifiedValue, setVarifiedValue] = useState([]);
  const [loading, setLoading] = useState(true);

console.log("varifiedValue", varifiedValue);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get('/api/adminForm/getConfirmationReceivedDocument');
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

const GotoHomeftn = ()=>{
  navigate('/VerifiedData')
}
  


  return (
    <div>
      <div><button onClick={GotoHomeftn} title="Go back to Home"><FaThList style={{color:"darkblue", width:"50px", fontSize:'30px'}}/></button> Received Confirmation List</div>
      <table >
        
        <caption>A list of your recently verified students.</caption>
        <thead>
          <tr>
            <th className="w-[100px] h-[50px]">SNO</th>
            <th className="w-[100px] ">CMS</th>
            <th className="w-[100px] ">Name</th>
            <th className="w-[100px]">CNIC</th>
            <th></th>
            <th></th>
            <th></th>
            <th className="w-[300px]">Documents Recived</th>
            {/* <th className="w-[100px]">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {varifiedValue.map((student, index) => (
            <tr key={student.CID} className=" h-[50px]">
              <td>{index + 1}</td>
              <td>{student.CMS}</td>
              <td>{student.Name}</td>
              <td>{student.CNIC}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{student.Received}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default ConfirmationStudentsDocumentation;
