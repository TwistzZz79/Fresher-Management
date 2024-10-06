// components/UserManagementPage.js
import React, { useState, useEffect, useTransition } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import {useTranslation} from 'react-i18next'

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const {t}=useTranslation();

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await UserService.getAllUsers(token);
      //   console.log(response);
      setUsers(response.usersList); // Assuming the list of users is under the key 'UsersList'
    } catch (error) {
      console.error(t('Error fetching Users'), error);
    }
  };


  const deleteUser = async (userId) => {
    try {
      // Prompt for confirmation before deleting the user
      const confirmDelete = window.confirm(t('Are you sure you want to delete this user?'));

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      console.log(token);
      if (confirmDelete) {
        console.log("Vào đây");
        await UserService.deleteUser(userId, token);
        // After deleting the user, fetch the updated list of users
        fetchUsers();
      }
    } catch (error) {
      console.error(t('Error deleting user:'), error);
    }
  };

  return (
    <div className="user-management-container">
      <h2>{t('Users Management Page')}</h2>
      <button className='reg-button btn'> <Link to="/register">{t('Add User')}</Link></button>
      <table>
        <thead>
          <tr>
            <th>{t('ID')}</th>
            <th>{t('Name')}</th>
            <th>{t('Email')}</th>
            <th>{t('Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className='delete-button btn' onClick={() => deleteUser(user.id)}>{t('Delete')}</button>
                <button className='btn'><Link to={`/update-user/${user.id}`}>
                {t('Update')}
                  
                </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagementPage;