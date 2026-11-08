import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JailerData.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
// import { IoMdSearch } from "react-icons/io";
// import { CgUserAdd } from "react-icons/cg";
// import { FaHandcuffs } from "react-icons/fa6";

// import AddPrisonerComponent from './AddJailerData';s
import { MdDeleteForever, MdRestorePage } from 'react-icons/md';

function JailDelRecords() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getdelPrisonerRecords');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Delete Data 
  const deletePrisoner = async (prisonerId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/delPrisonerRecord/${prisonerId}`);
      console.log(response.data); 
      alert('Data Deleted succesfully');
      window.location.reload();  
    } catch (error) {
      console.error('Error Deleting prisoner:', error);
    }};


    const ResetPrisoner = async (prisonerId, fullName, fName, cnic, address, city,reason, Description, StartDate, EndDate, Duration, Location) => {
        try {
             await axios.delete(`http://localhost:5000/api/RestoredeletePrisoner/${prisonerId}`,
            {
                data: {
                  fullName,
                  fName,
                  cnic, 
                  address,
                  city,
                  reason,
                  Description,
                  StartDate,
                  EndDate,
                  Duration,
                  Location,
                },
              }
            );
            console.log("Name : ", fullName);
            alert('Data Restored succesfully');
            window.location.reload();
            
        } catch (error) {
            console.error('Error Deleting prisoner:', error);
        }
    };


  return (
    <div>
    <div className="AllTable">
      <div className='p-2'>
      <header className="App-header">
        {/* <h1 style={{textAlign:'center', fontWeight:'bolder', textDecorationLine: 'underline' }} 
        className='jailMngSystemText' > {<FaHandcuffs/>}DELETED PRISONER RECORDS</h1> */}
        
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
                  <td>{item.PID}</td>
                  <td>{item.FullName}</td>
                  <td>{item.F_Name} </td>
                  <td>{item.CNIC}</td>
                  <td>{item.Address}</td>
                  <td>{item.City}</td>
                  <td>{item.Reason}</td>
                  <td>{item.Description}</td>
                  <td>{item.StartDate}</td>
                  <td>{item.EndDate}</td>
                  <td>{item.Duration}</td>
                  <td>{item.Location}</td>
                  <button onClick={() => deletePrisoner(item.PID)} className='btn btn-danger' ><MdDeleteForever/></button>
                  <button onClick={() => ResetPrisoner(item.PID,`${item.FullName}`,`${item.F_Name}`
                  ,`${item.CNIC}`,`${item.Address}`,`${item.City}`,`${item.Reason}`,`${item.Description}`
                  ,`${item.StartDate}`,`${item.EndDate}`,`${item.Duration}`,`${item.Location}`
                    )} className='btn btn-danger' ><MdRestorePage/></button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
      </div>
    </div>
    </div>
  );
}

export default JailDelRecords;