import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../../Page/SuperAdmin/Home';
import AllAdmins from '../../Page/SuperAdmin/AllAdmins';
import EditAdmin from '../../Page/SuperAdmin/EditAdmin';
import Profile from '../../Page/SuperAdmin/Profile';
import UploadDatasets from '../../Page/SuperAdmin/UploadDatasets';
import ApproveChanges from '../../Page/SuperAdmin/Approve Changes';
import OfflineSyncSchedule from '../../Page/SuperAdmin/Offline Sync Schedule';

const SuperAdminrouts = [
    <Route key="dashboard" path="dashboard" element={<Home />} />,
    <Route key="adminlist" path="AdminList" element={<AllAdmins />} />,
    <Route key="EditAdmin" path="EditAdmin" element={<EditAdmin />} />,
    <Route key="Profile" path="Profile" element={<Profile />} />,
    <Route key="upload-datasets" path="upload-datasets" element={<UploadDatasets />} />,
    <Route key="approve-changes" path="Approve Changes" element={<ApproveChanges />} />,
    <Route key="offline-sync-schedule" path="Offline Sync Schedule" element={<OfflineSyncSchedule />}/>,
];

export default SuperAdminrouts;
