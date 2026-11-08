import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import AddPrisonerComponent from '../AddJailerData';
// import LgScreen from './loginScreen';
import JailerShowData from '../JailerShowData';
import Employee from '../Employee/Employee';
import AddEmployeeData from '../Employee/AddEmployee';
import DeleteEmployee from '../Employee/DeleteEmployee';
import EmailPage from '../Employee/Email';
import JailDelRecords from '../JailDelRecords';
import LoginForm from '../../Login/Login';
import RegistrationForm from '../../Login/RegistrationForm';
import AllAccount from './AllAccount';
import Dashboard from '../Dashboard/Dashboard';

const LayoutScreens = () => {
  return (
    <BrowserRouter>
      <Navbar />   
      <Routes>
      <Route path="/" >
          <Route index element={<LoginForm/>} />  </Route> 
          <Route path="/RegistraionForm" >
          <Route index element={<RegistrationForm/>} />  </Route>  
          <Route path="/Dashboard" >
          <Route index element={<Dashboard/>} />  </Route>  
          {/* <Route path="/ForgetForm" >
          <Route index element={<FgForm/>} />  </Route>   */}
          <Route path="/EmployeeEmail" >
          <Route index element={<EmailPage/>} />  </Route> 
        <Route path="/Prisoner" >
          <Route index element={<JailerShowData/>} />  </Route>  
        <Route path="/DelPrisrecords" >
          <Route index element={<JailDelRecords/>} />  </Route>  
          <Route path="/Employee" >
          <Route index element={<Employee />} />  </Route> 
          <Route path="/AddJailer" >
          <Route index element={<AddPrisonerComponent />} />  </Route> 
          <Route path="/AddEmployee" >
          <Route index element={<AddEmployeeData />} />  </Route> 
          <Route path="/EmpDelRecords" >
          <Route index element={<DeleteEmployee/>} />  </Route> 
          <Route path="/AllAccount" >
          <Route index element={<AllAccount/>} />  </Route> 
          
      </Routes>
    </BrowserRouter>
  )
}
export default LayoutScreens;