import React, { useContext, useState } from 'react';
import './Payment.css';
import axios from 'axios';
import Thankyou from '../ThankYou/Thankyou';
import { StudentDataContext } from '../DataForm';

const PaymentMethod = () => {
  const { formData, updateFile } = useContext(StudentDataContext);
  const [gotoNext, setGotoNext] = useState(true);
  const [payData, setPayData] = useState({});

  console.log('Student Data:', formData);
  console.log('UpdateFile', updateFile);

  const handleChange = (event) => {
    setPayData({ ...payData, [event.target.name]: event.target.value });
  };

  const switchToThankYou = () => {
    setGotoNext(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!payData.CardNumber || !payData.ExpiryDate || !payData.CVVNumber || !payData.CardHolderName) {
      alert('Please fill in all the fields');
      return;
    } else {
      switchToThankYou();
    }

    try {
      const response = await axios.post('/api/studentForm/storedata', { stdData: formData });
      console.log(response);
      alert(`${formData.FullName} Data Added Successfully`);
    } catch (error) {
      console.error(error);
    }

    try {
      axios.post('/api/studentForm/upload', updateFile)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {gotoNext ? (
        <div>
          <div className='flex justify-center items-center h-screen'>
            <div className='CreditCardContainer'>
              <div className='bg-white rounded' style={{ padding: '1%' }}>
                <div className="cardDetails">
                  (<i><b> Dear {formData.FullName}!</b></i>)
                  <h1 style={{ fontWeight: 'bold' }}><i>Pay using Credit or Debit card </i></h1>
                  <div className="card-number">
                    <label> Card Number </label> <br />
                    <input type="text" className="cardNumber-inputField" placeholder="###-###-###" name='CardNumber' onChange={handleChange} />
                  </div>

                  <div className="ExpiryDate-number">
                    <label> Expiry Date </label><br />
                    <input type="text" className="ExpiryData-cardNumber-inputField" placeholder="DD-MM-YY" name='ExpiryDate' onChange={handleChange} />
                  </div>

                  <div className="cvv-number">
                    <label> CVV number </label><br />
                    <input type="text" className="cvv-Number-field" placeholder="xxx" name='CVVNumber' onChange={handleChange} />
                  </div>
                  
                  <div className="nameholder-number">
                    <label> Card Holder Name </label><br />
                    <input type="text" className="CardName-field" placeholder="Enter your Name" name='CardHolderName' onChange={handleChange} />
                  </div>
                  
                  <button type="button" className="submitbtn" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Thankyou />
      )}
    </div>
  );
};

export default PaymentMethod;
