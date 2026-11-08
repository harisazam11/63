// Store Data to Database
import axios from 'axios'; // same to fetch
import { useState } from 'react';
// import { FaGun } from "react-icons/fa6";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../JailerData.css';   // the Add jailer Form page CSS has been used
import { useNavigate } from 'react-router-dom';
import { SiShowtime } from "react-icons/si";
import { BsDatabaseFillAdd } from "react-icons/bs";
// import './layout.css';
// import { useNavigate } from 'react-router-dom';
const AddEmployeeData = () => {

  const [FullName, setFullName] = useState('');
  const [F_Name, setF_Name] = useState('');
  const [CNIC, setCNIC] = useState('');
  const [Address, setAddress] = useState('');
  const [City, setCity] = useState('');
  const [Status, setStatus] = useState('');
  const [Age, setAge] = useState('');
  const [Phone, setPhone] = useState('');
  const [DutyLocation, setDutyLocation] = useState('');
  const [JoiningDate, setJoiningDate] = useState('');
  
  const navigate = useNavigate();
  const handleSubmit =  (event) => {
   
    event.preventDefault();
    if (!FullName || !F_Name || !CNIC || !Address || !City || !Status || !Age || !Phone
      || !DutyLocation || !JoiningDate) {
      alert("Please fill in all the fields");
      return;
    }

     axios.post('http://localhost:5000/api/AddEmployee', 
    { FullName, F_Name, CNIC, Address, City, Status, Age, Phone, DutyLocation, JoiningDate})
      .then(res => {      
        console.log(res); 
        // clearScreen();
        }).catch(err => console.log(err));
        alert(`${FullName} Data Added Successfully`)
       GotoEmployeePage();    
  } 
  const  GotoEmployeePage =()=>{
       navigate('/Employee')
  }
  return (
    <div>
      {/* The JailerData.css is used for styling */}
        <div className='addJailerDataContainer'>  
          <div className='AddJailerFormImage'>
            <div className='AddJailerForm'>
              {/* <h1 className='AddJailerDataTextheading' style={{textDecorationLine: 'underline'}}>{<FaGun />} Add Employee</h1> */}
              <div style={{ marginLeft: '760px' }}>
                <button  style={{ padding: '10px', paddingLeft: '10px', fontWeight: 'bold', color: 'white', backgroundColor:'#7F27FF' }}
               onClick={GotoEmployeePage}><SiShowtime/> Show Data</button></div>
              <form >
                <hr />
                <label ><b>FullName</b></label>
                <input type="text" required 
                  onChange={e => setFullName(e.target.value)}
                />
                <label ><b>Father Name</b></label>
                <input type="text" required
                  onChange={e => setF_Name(e.target.value)}
                /> <br /><br />
                <label ><b>CNIC</b></label>
                <input type="text" required
                  onChange={e => setCNIC(e.target.value)}
                /><label ><b>Address</b></label>
                <input type="text" required
                  onChange={e => setAddress(e.target.value)}
                /><label><b>City</b></label>
                <input type="text" required
                  onChange={e => setCity(e.target.value)}
                />
                <label ><b>Status</b></label>
                <input type="text" required
                  onChange={e => setStatus(e.target.value)}
                /><label ><b>DOB</b></label>
                <input type="Date" required
                  onChange={e => setAge(e.target.value)}
                />
                <div ><label ><b>Phone</b></label>
                  <input type="text" required
                    onChange={e => setPhone(e.target.value)}
                  /><label ><b>Duty Location</b></label>
                  <input type="text" required
                    onChange={e => setDutyLocation(e.target.value)}
                  /><br /></div>
                <label ><b>joining Date</b></label>
                <input type="Date" required
                  onChange={e => setJoiningDate(e.target.value)}
                />
                <button className='AddRecordBtn'  onClick={handleSubmit}><BsDatabaseFillAdd/> Add Records</button>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
}
export default AddEmployeeData;