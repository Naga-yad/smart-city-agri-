import React from 'react';
import { Route } from 'react-router-dom';
import AdminDashboard from '../../Page/Admin/AdminDashboard';
import '../../Dashboard.css';
import MainLayout1 from './MainLayout1';



function AdminRouts() {   
  return (
    <>
      <Route path="/Admin" element={<MainLayout1 />}>
        <Route index element={<AdminDashboard />} />
     
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </>
  );
}

export default AdminRouts;