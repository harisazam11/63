import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JailerData.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { IoMdSearch } from "react-icons/io";
import { CgUserAdd } from "react-icons/cg";

// import AddPrisonerComponent from './AddJailerData';

import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

function JailerShowData() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const [GotoAddJailerData, setGotoAddJailerData] = useState(true);
const navigate = useNavigate();
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getData');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // Search Entry
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search/${searchTerm}`);
      setData(response.data);
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };
  // Delete Data 
  const deletePrisoner = async (prisonerId, fullName, fName, cnic,address,
    city,reason,description,startDate,endDate,duration,location) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/deletePrisoner/${prisonerId}`,
      {
        data:{
          fullName,
          fName,
          cnic, 
          address,
          city,
          reason,
          description,
          startDate,
          endDate,
          duration,location
        },
      }
      );
      console.log(response.data); 
      alert('Data Deleted succesfully');
      // window.location.reload();
      // navigate('/Prisoner')
    } catch (error) {
      console.error('Error Deleting prisoner:', error);
    } 
  };

  const GotoAddJailerForm =()=>{
    // setGotoAddJailerData(false)
   
    navigate('/AddJailer');
  }

  return (
    <div>
      {/* {GotoAddJailerData ? ( */}
    <div className="AllTable">
      <div className='p-2'>
      <header className="App-header">
        
        <div className='input-group mb-2' >
          <input  style={{padding:'10px'}}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter Prisoner CNIC"
          />
          <button onClick={handleSearch} style={{backgroundColor:'#7F27FF'}} > 
          < IoMdSearch style={{fontSize:'20px'}}/></button>

          
          <div style={{marginLeft:'1100px',float:'right'}}><button  
          style={{padding:'10px', paddingLeft:'20px', fontWeight:'bold', color:'white', backgroundColor:'#7F27FF'}} 
          onClick={GotoAddJailerForm}>Add <CgUserAdd style={{fontSize:'30px'}}/></button></div>
        </div>  
        <div className='Prisonertable'>
          <table>
            <thead>
              <tr>
                <th>Prisoner ID</th>
                <th>Full Name</th>
                <th>Father Name</th>
                <th>CNIC</th>
                <th>Address</th>
                <th>City</th>
                <th>Case</th>
                <th>Description</th>
                <th>Start Data</th>
                <th>End </th>
                <th>Duration</th>
                <th>Location</th>
                <th></th>
              </tr> </thead> <tbody>
              {data.map((item) => (
                <tr key={item.PID}>
                  <td>{item.prisoner_id}</td>
                  <td>{item.FullName}</td>
                  <td>{item.F_Name} </td>
                  <td>{item.CNIC}</td>
                  <td>{item.Address}</td>
                  <td>{item.City}</td>
                  <td>{item.Reason}</td>
                  <td>{item.reason}</td>
                  <td>{item.StartDate}</td>
                  <td>{item.EndDate}</td>
                  <td>{item.Duration}</td>
                  <td>{item.location}</td>
                  <button style={{marginTop:'10px'}} onClick={() => deletePrisoner
                  (item.PID, `${item.FullName}`,`${item.F_Name}`,
                  `${item.CNIC}`,`${item.Address}`,
                  `${item.City}`,`${item.Reason}`,`${item.reason}`,
                  `${item.StartDate}`,`${item.EndDate}`,`${item.Duration}`,
                  `${item.location}`)} className='btn btn-danger' ><MdDelete /></button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
      </div>
    </div>
    {/* ):(
      <AddPrisonerComponent />
    )} */}
    </div>
  );
}

export default JailerShowData;