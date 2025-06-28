import React from 'react'
import './navbar.css'
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { FaCog } from 'react-icons/fa';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [isLogIn, setIsLogIn] = useState(true);

    console.log(setIsLogIn)
    const location = useLocation();

    // Extract the last segment of the pathname (e.g., 'dashboard' from '/dashboard')
    const pathSegments = location.pathname.split('/').filter(Boolean); // removes empty strings
    // const pageName = pathSegments[pathSegments.length - 1] || 'SignUP';
    const pageName =  pathSegments[0] || 'SignUp'; 

    // Capitalize first letter
    const capitalizedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);


    return (
        <div className="main">
            <div className="navbar">

                <p className="heading" style={{fontSize: '25px'}} > {capitalizedPageName}</p>
               <div style={{display: 'flex', gap: '20px'}}>
               <h3 style={{fontFamily: 'Roboto'}}>{isLogIn ? "Welcome User" : "Login"}</h3>
                <button className="settings-icon" onClick={() => setOpen(!open)}>
                    <FaCog size={24} />
                </button>
               </div>
                {open && (
                    <div className="settings-panel">
                        <h3 >CRM Settings</h3>
                        <div className="setting-option disabled">
                            <label>Dark Mode</label>
                            <input type="checkbox" />
                        </div>
                        <div className="setting-option disabled">
                            <label>Notifications</label>
                            <input type="checkbox" />
                        </div>
                        <div className="setting-option disabled" >
                            <label>Language</label>
                            <select>
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Spanish</option>
                            </select>
                        </div>
                        <div className="setting-option">
                            <button className="logout-btn">{isLogIn ? "Logout" : "Login"}</button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Navbar