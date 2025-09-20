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
// import 'coinley-checkout/dist/style.css'

const App = () => {
  return (
    <>
      <Routes>
        {/* Home page without dashboard layout */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Dashboard routes with layout */}
        <Route path="/dashboard/*" element={
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </DashboardLayout>
        } />
      </Routes>
    </>
  );
};


export default App