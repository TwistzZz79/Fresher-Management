// App.js
import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import FooterComponent from './components/common/Footer';
import UserService from './components/service/UserService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import FresherPage from './components/userspage/FresherPage';
import AddFresherPage from './components/userspage/AddFresherPage';
import UpdateFresherPage from './components/userspage/UpdateFresherPage';
import CenterPage from './components/userspage/CenterPage';
import AddUpdateCenterPage from './components/userspage/AddUpdateCenterPage';
import CenterDetailsPage from './components/userspage/CenterDetailsPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar  isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Login handleLogin={handleLogin}/>} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/freshers" element={<FresherPage></FresherPage>} /> {/* Add FresherPage route */}
            <Route path="/centers" element={<CenterPage />} />


            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {UserService.adminOnly() && (
              <>
                <Route path="/register" element={<Register />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/add-fresher" element={<AddFresherPage></AddFresherPage>}></Route>
                <Route path="/update-fresher/:id" element={<UpdateFresherPage />} />
                <Route path="/add-center" element={<AddUpdateCenterPage />} />
                <Route path="/update-center/:id" element={<AddUpdateCenterPage />} />
                <Route path="/center/:id" element={<CenterDetailsPage />} />



              </>
            )}
            <Route path="*" element={<Navigate to="/login" />} />‰
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;