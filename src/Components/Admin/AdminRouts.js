import React from 'react';
import { Route } from 'react-router-dom';
import AdminDashboard from '../../Page/Admin/AdminDashboard';
import '../../Dashboard.css';
import MainLayout1 from './MainLayout1';
import ManageFarmers from '../../Page/Admin/ManageFarmers';
import ManageDrivers from '../../Page/Admin/ManageDrivers';
import LocalDataUpdates from '../../Page/Admin/LocalDataUpdates';
import FarmerQueries from '../../Page/Admin/FarmerQueries';
import FieldReports from '../../Page/Admin/FieldReports';
import CommunityTraining from '../../Page/Admin/CommunityTraining';
import SdUsbDistribution from '../../Page/Admin/SdUsbDistribution';
import VillageDataTracking from '../../Page/Admin/VillageDataTracking';
import ReportTechnicalIssues from '../../Page/Admin/ReportTechnicalIssues';
import Profile from '../../Page/Admin/Profile';

const AdminRouts = [
   
    <Route key="/Admin" path="/Admin" element={<AdminDashboard />} />,
    <Route key="ManageFarmers"path="ManageFarmers" element={<ManageFarmers/>} />,
    <Route key="drivers" path="drivers" element={<ManageDrivers />} />,
    <Route key="local-data-update" path="local-data-update" element={<LocalDataUpdates />} />,
    <Route key="queries" path="queries" element={<FarmerQueries />} />,
    <Route key="reports" path="reports" element={<FieldReports />} />,
    <Route key="community-training" path="training" element={<CommunityTraining />} />,
    <Route key="distribution" path="distribution" element={<SdUsbDistribution />} />,
    <Route key="tracking" path="tracking" element={<VillageDataTracking />} />,
    <Route key="technical" path="technical" element={<ReportTechnicalIssues />} />,
    <Route key="profile" path="profile1" element={<Profile />} />,

];


export default AdminRouts;

// function AdminRouts() {   
//   return (
//     <>
//       <Route path="/Admin" element={<MainLayout1 />}>
//         <Route index element={<AdminDashboard />} />
     
//         <Route path="dashboard" element={<AdminDashboard />} />,
//           <Route key="farmers"path="farmers" element={< ManageFarmers/>} />,
//       </Route>
//     </>
//   );
// }

// export default AdminRouts;