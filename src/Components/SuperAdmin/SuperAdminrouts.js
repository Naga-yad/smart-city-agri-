import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../../Page/SuperAdmin/Home';
import AllAdmins from '../../Page/SuperAdmin/AllAdmins';
import EditAdmin from '../../Page/SuperAdmin/EditAdmin';
import Profile from '../../Page/SuperAdmin/Profile';

const SuperAdminrouts = [
    <Route key="dashboard" path="dashboard" element={<Home />} />,
    <Route key="adminlist" path="AdminList" element={<AllAdmins />} />,
    <Route key="EditAdmin" path="EditAdmin" element={<EditAdmin />} />,
    <Route key="Profile" path="Profile" element={<Profile />} />,
];

export default SuperAdminrouts;
