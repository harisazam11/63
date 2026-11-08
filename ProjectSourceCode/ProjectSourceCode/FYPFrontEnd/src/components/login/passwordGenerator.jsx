import './Login.css';
import cryptoRandomString from 'crypto-random-string';
import React from 'react'

const PasswordGenerator = () => {
    
    const ccc = cryptoRandomString({length: 10, type: 'alphanumeric'});
  return (
    <div>
     <code>{ccc}</code>
    </div>
  )
}

export default PasswordGenerator;

