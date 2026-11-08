import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from '../login/LoginForm';

// import NavigationBar from './NavigationBar';
import RegistrationForm from '../login/RegistrationForm';
import AdminInterface from '../AdminInterface/AdminInterface';
import DataForm from '../userInterface/DataForm';
import ForgetForm from '../login/ForgetForm';
import Dashboard from '../AdminInterface/Dashboard/Dashboard';
import Getpassword from '../login/Getpassword';
import VerifyingData from '../AdminInterface/VerifyingData';
import VarifiedDataForm from '../AdminInterface/VerifiedDataForm';
import EditDataForm from '../AdminInterface/EditDataForm';
import AccountsUsers from '../AdminInterface/AccountsUsers';
import EditedForm from '../AdminInterface/EditedData';
import ConfirmationStudentsDocumentation from '../AdminInterface/ConfirmStudentsDocumentation';
import ConfirmationForm from '../userInterface/confirmation/ConfirmationForm';

const LayoutScreens = () => {

  const isLoggedIn = true; // Replace with actual login state management

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <div><h1>Error 404</h1> </div> ;
  }
  //   const isHomePage = (pathname) => {
  // return pathname ==='/' || pathname ==='/RegistrationForm' || pathname ==='/ForgetForm' || pathname ==='/DataForm';
  //   };

  return (
    <div>
      <BrowserRouter>
        <div className="container">
          {/* Conditionally render NavigationBar based on current route */}
          <Routes>
            <Route
            // render={({ location }) =>
            //   !isHomePage(location.pathname) && <NavigationBar />
            // }
            />
            <Route path="/createAccount" element={<Getpassword />} />
            <Route path="/" >
              <Route index element={<LoginForm />} />  </Route>
            <Route path="/Dashboard" element={<Dashboard />} className="content" />

            {/* <Route path="/Admins" element={<NavigationBar />} className="content" /> */}

            <Route path="/RegistrationForm" element={<RegistrationForm />} />
            <Route path="/ForgetForm" element={<ForgetForm />} />

            <Route path="/DataForm" element={<DataForm />} />
            <Route path="/Admin" element={<AdminInterface />} />
            <Route path="/VerifyData" element={<VerifyingData />} />
            <Route path="/VerifiedData" element={<VarifiedDataForm />} />
            <Route path="/EditDataForm" element={<EditDataForm />} />
            <Route path="/AccountsUsers" element={<AccountsUsers/>} />
            <Route path='/EditedForm' element = {<EditedForm/>}/>
            <Route path='/ConfirmationForm' element = {<ConfirmationForm/>}/>
            
            <Route path='/ConfirmationStudentsDocumentation' element = {<ConfirmationStudentsDocumentation/>}/>
           {/* Add a default route for handling unknown paths */}
           <Route path="*" element={<LoginForm/> } />
            
            {/* <Route path="/" element={<DataForm/>} /> */}
            {/* <Route path="*" element={"error"}  /> */}
          </Routes>
        </div>
      </BrowserRouter></div>
  );
};

export default LayoutScreens;
