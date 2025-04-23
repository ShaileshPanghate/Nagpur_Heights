import React, { useState, useEffect } from 'react'
import './sidebar.css'
import { NavLink } from 'react-router-dom';
import logo from '../../assets/NAGPUR_HEIGHTS_LOGO.png';
import onlyLogo from '../../assets/onlyLogo.png'
import { FaHome, FaTasks, FaFileInvoice, FaUsers, FaBoxes, FaProjectDiagram, FaHandsHelping } from "react-icons/fa";


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //   const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    //   setIsLoggedIn(loggedIn);
    // }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);

    // if (!isLoggedIn) return null; 
    return (
        <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
            <NavLink to="/" end>
                < div className="logo" >
                    {isOpen ? <img src={logo} alt="l" width="220px"  /> : <img src={logo} alt="l" width="100px" className="shining-logo" />}
                </div>
            </NavLink>

            <div className="toggle-btn" onClick={toggleSidebar}>
                ☰
            </div>
            <div className="menu">
                <NavLink to="/dashboard" end>
                    <FaHome /> {isOpen && <span className="nav-text" >Home</span>}
                </NavLink>
                <NavLink to="/leads" end>
                    <FaUsers /> {isOpen && <span className="nav-text" >Leads</span>}
                </NavLink>
                <NavLink to="/projects">
                    <FaProjectDiagram /> {isOpen && <span className="nav-text">Projects</span>}
                </NavLink>
                <NavLink to="/employees">
                    <FaUsers /> {isOpen && <span className="nav-text">Employees</span>}
                </NavLink>
                <NavLink to="/tasks">
                    <FaTasks /> {isOpen && <span className="nav-text">Tasks</span>}
                </NavLink>
                <NavLink to="/quotation">
                    <FaFileInvoice /> {isOpen && <span className="nav-text">Quotation</span>}
                </NavLink>
                <NavLink to="/invoice">
                    <FaFileInvoice /> {isOpen && <span className="nav-text">Invoice</span>}
                </NavLink>
                <NavLink to="/inventory">
                    <FaBoxes /> {isOpen && <span className="nav-text">Inventory</span>}
                </NavLink>
                <NavLink to="/help-Support">
                    <FaHandsHelping /> {isOpen && <span className="nav-text">Help & Support</span>}
                </NavLink>
            </div>

        </div>
    )
}

export default Sidebar