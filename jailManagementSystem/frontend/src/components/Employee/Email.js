import React, { useState } from 'react';
import axios from 'axios';
import './Employee.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { TfiEmail } from "react-icons/tfi";

const EmailPage = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState(''); 
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/send-email', {
        email,
        subject,
        message,
      });
       alert("data send successfully...");
       setEmail('');
       setSubject('');
       setMessage('');
      console.log(response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="EmailContainer">
     
      <h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 120 120" id="mail"><defs><linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#008EE7"></stop><stop offset="100%" stop-color="#00D6FA"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><g><rect width="120" height="120" fill="url(#a)" rx="28"></rect><path fill="#FFF" d="M25.114 84.964l21.196-21.95 5.13 5.165a12.553 12.553 0 0 0 17.84 0l4.64-4.672L94.666 84.99c-.331.07-.675.106-1.027.106H26.26c-.394 0-.778-.046-1.146-.132zm73.392-46.215c.087.37.133.755.133 1.151v40.196c0 1.29-.489 2.466-1.29 3.353L76.033 61.378l22.472-22.63zM21.36 81.094V40.9c0-.868.221-1.685.61-2.397l22.226 22.382L22.482 83.37a4.983 4.983 0 0 1-1.122-2.277zm75.467-45.046L67.189 65.685c-3.905 3.906-10.237 3.906-14.142 0L23.26 35.9c.835-.627 1.874-.999 3-.999h67.378a4.98 4.98 0 0 1 3.188 1.148z"></path></g></g></svg>
        Email </h1>
      <div className="form-group">
    <label for="exampleFormControlInput1">Email:</label>
    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="write Email@example.com" 
   value={email} onChange={(e) => setEmail(e.target.value)}
   />
  </div> <b/><b/>
      <div className="form-group">
    <label for="exampleFormControlInput1">Subject</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="write Subject here" defaultValue={"this is from Jailer Management system"}
   value={subject} onChange={(e) => setSubject(e.target.value)} />
  </div>  
      <div className="form-group">
    <label for="exampleFormControlTextarea1">Message</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
    placeholder='Write Message here...'
    value={message} onChange={(e) => setMessage(e.target.value)}
    ></textarea>
  </div>
      <button onClick={handleSubmit} style={{backgroundColor:'#7F27FF', padding:'10px'}} ><TfiEmail style={{color:'silver'}}/> Send Email
      </button>
    
    </div>
  );
};

export default EmailPage;