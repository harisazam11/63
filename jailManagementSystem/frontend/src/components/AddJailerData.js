// Store Data to Database
import axios from 'axios'; // same to fetch
import { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import './JailerData.css';
import { useNavigate } from 'react-router-dom';
// import { GiPrisoner } from "react-icons/gi";
import { SiShowtime } from "react-icons/si";
import { BsDatabaseFillAdd } from "react-icons/bs";

const AddPrisonerComponent = () => {

  const [FullName, setFullName] = useState('');
  const [F_Name, setF_Name] = useState('');
  const [CNIC, setCNIC] = useState('');
  const [Address, setAddress] = useState('');
  const [City, setCity] = useState('');
  const [Reason, setReason] = useState('');
  const [Description, setDescription] = useState('');
  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  const [Duration, setDuration] = useState('');
  const [Location, setLocation] = useState('');
  // const [GotoJailerShowFormData, setGotoJailerShowFormData] = useState(true);
  const navigate = useNavigate();

  const handleSubmit =  (event) => {
    event.preventDefault();
    if (!FullName || !F_Name || !CNIC || !Address || !City || !Reason || !Description || !StartDate
      || !EndDate || !Duration || !Location) {
      alert("Please fill in all the fields");
      return;
    }
     axios.post('http://localhost:5000/api/AddData', 
    { FullName, F_Name, CNIC, Address, City, Reason, Description, StartDate, EndDate, Duration, Location })
      .then(res => {
        console.log(res);    
      }).catch(err => console.log(err));
      alert("Data Added Successfully .....")
       GotoJailerShowFtn();
  } 
   const GotoJailerShowFtn =()=>{
       navigate('/Prisoner')
   }
  
  return (
    <div className='outerFormAdd'>
      <div className='SecondOuterFormAdd'>
      {/* {GotoJailerShowFormData ? ( */}
        <div className='addJailerDataContainer'>
          <div className='AddJailerFormImage'>
            <div className='AddJailerForm'>
              {/* <h1 className='AddJailerDataTextheading' style={{textDecorationLine: 'underline'}}>{<GiPrisoner />} Add Prisoner</h1> */}
              <div style={{ marginLeft: '760px' }}>
                <button 
                 style={{ padding: '10px', paddingLeft: '10px', fontWeight: 'bold', color: 'white',backgroundColor: "#7F27FF" }}
                  onClick={GotoJailerShowFtn}><SiShowtime/> Show Data</button></div>
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
                <label ><b>Reason</b></label>
                <input type="text" required
                  onChange={e => setReason(e.target.value)}
                /><label ><b>Description</b></label>
                <input type="text" required
                  onChange={e => setDescription(e.target.value)}
                />
                <div><label ><b>StartDate</b></label>
                  <input type="Date" required 
                    onChange={e => setStartDate(e.target.value)}
                  /><label ><b>End Date</b></label>
                  <input type="Date" required 
                    onChange={e => setEndDate(e.target.value)}
                  /><br /></div>
                <label ><b>Duration</b></label>
                <input type="text" required
                  onChange={e => setDuration(e.target.value)}
                /><label ><b>Location</b></label>
                <input type="text" required
                  onChange={e => setLocation(e.target.value)}
                />
                <button className='AddRecordBtn' onClick={handleSubmit}><BsDatabaseFillAdd/> Add Records</button>
              </form>
            </div>
          </div>
          </div>
        </div>
      {/* ) : (
        <JailerShowData />
      )} */}
    </div>
  );
}
export default AddPrisonerComponent;