import React, { useState } from 'react'
import './userInterface.css'
import PaymentMethod from './payment/Payment';
const CheckInformation = () => {
  const [gotopay, setgotopay] = useState(true);

  const switchToPaymentForm= ()=>{
    setgotopay(false)
  }

  return (
   <div>
     {gotopay ? (
   
    <div className='DataFormContianer'>
      <div className='DataFormContainer2'>
     
          <form className='DataForm'>
          <h1 className='text-3xl' style={{color:'#e48400'}}>Check Information</h1> 
  <div className="form-group mt-4" >
    <label for="formGroupExampleInput">Name</label>
    <input type="text" className="form-control" 
    id="formGroupExampleInput" 
    placeholder="Example input" 
    autoFocus/>
  </div>
  <div className="form-group mt-3" >
    <label for="formGroupExampleInput2">F/Name</label>
    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
  </div>
  <div className="form-group mt-4" >
    <label for="formGroupExampleInput">Name</label>
    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input" />
  </div>
  <div className="form-group mt-3" >
    <label for="formGroupExampleInput2">F/Name</label>
    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
  </div>
  <div className="form-group mt-4" >
    <label for="formGroupExampleInput">Name</label>
    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input" />
  </div>
  <div className="form-group mt-3" >
    <label for="formGroupExampleInput2">F/Name</label>
    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
  </div>
  <div className="form-group mt-4" >
    <label for="formGroupExampleInput">Name</label>
    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input" />
  </div>
  <div className="form-group mt-3" >
    <label for="formGroupExampleInput2">F/Name</label>
    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
  </div>
  <div className="form-group mt-4" >
    <label for="formGroupExampleInput">Name</label>
    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input" />
  </div>
  <div className="form-group mt-3" >
    <label for="formGroupExampleInput2">F/Name</label>
    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
  </div>

  <div class="form-group mt-3">
  <label for="formGroupExampleInput2">CNIC</label>
    <input type="file" class="form-control" aria-label="file example"  />
  </div>
  <div class="form-group mt-3">
  <label for="formGroupExampleInput2">Clearance Form</label>
    <input type="file" class="form-control" aria-label="file example"  />
  </div>
  <div class="form-group mt-3">
  <label for="formGroupExampleInput2">CNIC</label>
    <input type="file" class="form-control" aria-label="file example"  />
  </div>
  <div class="form-group mt-3">
  <label for="formGroupExampleInput2">CNIC</label>
    <input type="file" class="form-control" aria-label="file example"  />
  </div>

  <button className='btn btn-primary' 
  style={{
    background:'darkblue', color:'#e48400', float:'right', marginTop:'12px'
    }} onClick={switchToPaymentForm}>Next</button>
</form>
</div>     
    </div>
    ):(
      <PaymentMethod/>
    )}
    </div>
  )
}

export default CheckInformation;
