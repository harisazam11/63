import React from 'react';
import './Thankyou.css';
import ThanksImage from './1.jpeg';
import { useNavigate } from 'react-router-dom';
const Thankyou = () => {
  const navigate = useNavigate();
  const gotologin =()=>{
    navigate('/')
  }
  return (
    <div>
        <div className="container">
            <img src={ThanksImage} alt="Image" />
            <div className="centered" style={{ fontSize: '70px', fontWeight: 'bolder', color: 'darkblue', textShadow: '0 0 10px #e48400' }}>
  <h1>THANK YOU</h1>
  
</div>
<h2 className='logout' onClick={gotologin}>Logout</h2>        
      </div>
    </div>
  );
};

export default Thankyou;
