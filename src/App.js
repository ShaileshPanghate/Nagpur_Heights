import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
// import Profile from "./components/profile/Profile";
import Inventory from "./components/inventory/Inventory";
import Invoice from "./components/invoice/Invoice";
import Tasks from "./components/tasks/Tasks";
import Settings from "./components/pages/setting/Settings";
import Help from "./components/help/Help";
import SignUp from "./components/signUp/SignUp";
import LogIn from "./components/logIn/LogIn";
import Quotation from "./components/quotation/Quotation";
import Projects from "./components/projects/Projects";
import Employee from "./components/employees/Employee";
import Leads from "./components/Leads/Leads";
import LeadDetails from "./components/Leads/LeadDetails";
import ProjectDetails from "./components/projects/ProjectDetails";

// import ProductTable from "./components/products/Products";
function App() {
  return (
    <Layout>
      <Routes>
      <Route path="/" element={<SignUp/>} />
        <Route path="/logIn" element={<LogIn/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/lead/:id" element={<LeadDetails />} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/project/:id" element={<ProjectDetails/>} />
        <Route path="/employees" element={<Employee/>} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/help-Support" element={<Help />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;
