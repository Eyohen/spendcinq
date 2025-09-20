// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Employees from './pages/Employees';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Contact from './pages/Contact';
// import 'coinley-checkout/dist/style.css'

const App = () => {
  return (
    <>
      <Routes>
        {/* Home page without dashboard layout */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/sign-in" element={<SignIn/>} />
      
      {/* Dashboard routes with layout */}
        <Route path="/dashboard" element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        } />
        <Route path="/dashboard/transactions" element={
          <DashboardLayout>
            <Transactions />
          </DashboardLayout>
        } />
        <Route path="/dashboard/analytics" element={
          <DashboardLayout>
            <Analytics />
          </DashboardLayout>
        } />
        <Route path="/dashboard/employees" element={
          <DashboardLayout>
            <Employees />
          </DashboardLayout>
        } />
        <Route path="/dashboard/billing" element={
          <DashboardLayout>
            <Billing />
          </DashboardLayout>
        } />
        <Route path="/dashboard/settings" element={
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        } />
      </Routes>
    </>
  );
};


export default App