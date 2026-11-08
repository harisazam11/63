import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import './verifyingData.css';
import { decrypt } from "n-krypta";

const AccountsUsers = () => {
  const navigate = useNavigate();
  const [accountUsers, setAccountUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/registrationForm/LoginScreenForm');
      const decryptedData = response.data.map(user => ({
        ...user,
        CMS: decryptData(user.CMS),
        Password: decryptData(user.Password)
      }));
      setAccountUsers(decryptedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again later.');
    }
  };

  const decryptData = (data) => {
    const saltkey = "@#Aa12_-.+";
    return decrypt(data, saltkey);
  };

  const deleteAlert = () => {
    alert("Student Data has been deleted Successfully");
    navigate('/');
  };

  const deleteUserAccount = async (LID) => {
    try {
      await axios.delete('/api/registrationForm/DeleteUserAccount', { data: { LID } });
      deleteAlert();
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting User Account:', error);
      alert('Error deleting user account. Please try again later.');
    }
  };

  const goToHome = () => {
    navigate('/admin');
  };

  return (
    <div>
      <div>
        <button onClick={goToHome} title="Go back to Home">
          <FaHome style={{ color: "darkblue", width: "50px", fontSize: '30px' }} />
        </button> Total User
      </div>
      <div className="AccountUsersContainer">
        <table>
          <caption>A list of Users Account.</caption>
          <thead>
            <tr>
              <th className="w-[100px] h-[50px]">SNO</th>
              <th className="w-[100px] ">CMS</th>
              <th className="w-[100px] ">Password</th>
              <th className="w-[100px]">Role</th>
              <th className="w-[100px]"></th>
              <th className="w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accountUsers.map((user, index) => (
              user.LID !== '2' && user.CMS !=='013' && user.Password !=='`rd' &&(
                <tr key={index} className="h-[50px]">
                  <td>{index + 1}</td>
                  <td>{user.CMS}</td>
                  <td>{user.Password}</td>
                  <td>{user.Role}</td>
                  <td></td>
                  <td>
                    <button onClick={() => deleteUserAccount(user.LID)}>
                      <MdDeleteForever style={{ color: "darkblue", width: "50px", fontSize: '30px' }} />
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountsUsers;
