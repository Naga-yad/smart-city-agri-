import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Page/SuperAdmin/Home';
import AdminRouts from './Components/Admin/AdminRouts'; // Import Admin routes
import AdminDashboard from './Page/Admin/AdminDashboard';
import MainLayout1 from './Components/Admin/MainLayout1';  // renamed import
import SuperAdminMainLayout from './Components/SuperAdmin/MainLayout';  // renamed import
import SuperAdminrouts from './Components/SuperAdmin/SuperAdminrouts'; // Import SuperAdmin routes
import './App.css';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SuperAdminMainLayout />}>
            <Route index element={<Home />} />
            {SuperAdminrouts.map(route => route)}
          </Route>

          <Route path="/SuperAdmin" element={<SuperAdminMainLayout />}>
            <Route index element={<Home />} />
            {SuperAdminrouts.map(route => route)}
          </Route>

          <Route path="/Admin" element={<MainLayout1 />}>
            <Route index element={<AdminDashboard />} />
            {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
            {AdminRouts.map(route => route)}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;