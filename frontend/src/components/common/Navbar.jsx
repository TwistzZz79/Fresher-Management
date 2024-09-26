import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';

function Navbar({isLoggedIn, onLogout}) {
   
    const isAdmin = UserService.isAdmin();

    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
            onLogout(false)
        }
    };

    return (
        <nav>
            <ul>
                {!isLoggedIn && <li><Link to="/">Fresher Management</Link></li>}
                {isLoggedIn && <li><Link to="/profile">Profile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {isLoggedIn && <li><Link to="/freshers">Fresher Management</Link></li>} 
                {isLoggedIn && <li><Link to="/centers">Centers</Link></li>} 
                {isLoggedIn && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;