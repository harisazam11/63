import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { MdDelete } from "react-icons/md";
import { MdRestorePage } from "react-icons/md";
const DeleteEmployee = () => {
    const [Empdata, setEmpData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
// Get Data
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/DeleteEmployeeRecords');
            setEmpData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

// Delete Data
const DeleteEmployeeRecords = async (EID) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/permanentDelEmpRecords/${EID}`);
      console.log(response.data); 
      alert('Data Deleted permanently');
      window.location.reload();    
    } catch (error) {
      console.error('Error Deleting prisoner:', error);
    }     
  }; 

// Restore Records
  const RestoreEmployeeRecords = async (EmpId, fullName, fName, cnic, address, city,status, dob, phone, dutylocation, joiningdata) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/RestoredeleteEmployee/${EmpId}`,
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
        alert('Data Restored succesfully');
        window.location.reload();
        
    } catch (error) {
        console.error('Error Deleting prisoner:', error);
    }
};

  return (
    <div>

{/* <div> <h1 style={{ textAlign: 'center', textDecorationLine: 'underline', fontWeight: 'bolder' }}
                    className='EmployeeTextheading'><MdDelete />DELETED EMPLOYIES  </h1></div>                  */}
      <div>
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
                                title='Delete'
                                onClick={()=>DeleteEmployeeRecords(`${item.EID}`)}><MdDelete/></button>
                                <button className='btn btn-primary'
                                title='Restore'
                                style={{marginLeft:'5px'}}
                                onClick={()=>RestoreEmployeeRecords(`${item.EID}`,`${item.FullName}`,
                                `${item.F_Name}`,`${item.CNIC}`,`${item.Address}`,`${item.City}`,`${item.Status}`,
                                `${item.DOB}`,`${item.phone}`,`${item.DutyLocation}`,`${item.JoiningDate}`)}><MdRestorePage/></button>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
    </div>
  )
}

export default DeleteEmployee;
