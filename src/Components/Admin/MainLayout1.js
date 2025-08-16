import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoMdNotifications } from 'react-icons/io';
import { FaUsersCog, FaUsers, FaUserPlus, FaCog, FaUserCircle } from 'react-icons/fa';
import { GiWheat, GiPlantSeed, GiWateringCan, GiSprout } from 'react-icons/gi';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [adminProfile, setAdminProfile] = useState({
    name: 'Super Admin',
    email: 'admin@farmer.com',
    image: '', // optional profile image
  });

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = location.pathname;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: '#2e7d32' }}
      >
        <div
          style={{
            padding: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: '#a5d6a7',
            letterSpacing: '1px',
            borderBottom: '1px solid #4caf50',
            marginBottom: '20px',
            userSelect: 'none',
          }}
        >
          🌾 Farmer Assist
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => {
            if (key !== 'signout') navigate(key);
          }}
          items={[
            { key: '/Admin', icon: <GiWheat style={{ color: '#a5d6a7' }} />, label: 'Dashboard' },
            {
              key: 'user-management',
              icon: <FaUsers style={{ color: '#a5d6a7' }} />,
              label: 'User Management',
              children: [
                { key: '/ManageFarmers', icon: <FaUserCircle style={{ color: '#a5d6a7' }} />, label: 'Manage Farmers' },
                { key: '/drivers', icon: <FaUserPlus style={{ color: '#a5d6a7' }} />, label: 'Manage Drivers' },
              ],
            },
            {
              key: '/local-data-update',
              icon: <GiPlantSeed style={{ color: '#a5d6a7' }} />,
              label: 'Local Data Updates',
            },
            {
              key: 'user-support',
              icon: <FaUsers style={{ color: '#a5d6a7' }} />,
              label: 'User Support & Feedback',
              children: [
                { key: '/queries', icon: <IoMdNotifications style={{ color: '#a5d6a7' }} />, label: 'Farmer Queries' },
                { key: '/reports', icon: <FaUserCircle style={{ color: '#a5d6a7' }} />, label: 'Field Reports' },
                { key: '/training', icon: <FaUserPlus style={{ color: '#a5d6a7' }} />, label: 'Community Training' },
              ],
            },
            {
              key: 'device-management',
              icon: <FaCog style={{ color: '#a5d6a7' }} />,
              label: 'Device & Distribution Management',
              children: [
                { key: '/distribution', icon: <GiSprout style={{ color: '#a5d6a7' }} />, label: 'SD Card/USB Distribution' },
                { key: '/tracking', icon: <FaUsersCog style={{ color: '#a5d6a7' }} />, label: 'Village Data Tracking' },
                { key: '/technical', icon: <AiOutlineDashboard style={{ color: '#a5d6a7' }} />, label: 'Report Technical Issues' },
              ],
            },
            {
              key: '/Settings/Profile1',
              icon: <FaUserCircle style={{ color: '#a5d6a7' }} />,
              label: 'Profile',
            },
          ]}
          style={{ backgroundColor: '#2e7d32' }}
        />
      </Sider>

      {/* Main layout */}
      <Layout>
        {/* Header */}
        <Header
          style={{
            backgroundColor: '#a5d6a7',
            padding: '0 16px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 64,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 100,
          }}
        >
          {/* Notifications */}
          <button
            type="button"
            onClick={() => {
              // handle notifications click (navigate to notifications page if you have one)
              navigate('/notifications');
            }}
            title="Notifications"
            aria-label="Notifications"
            style={{
              position: 'relative',
              marginRight: 20,
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <IoMdNotifications size={26} />
            <span
              style={{
                position: 'absolute',
                top: -8,
                right: 0,
                background: '#f57c00',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                color: 'white',
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              3
            </span>
          </button>

          {/* Profile */}
          <button
            type="button"
            onClick={() => navigate('/Settings/Profile1')}
            title="Open profile"
            aria-label="Open profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: '#81c784',
              padding: '6px 12px',
              borderRadius: 30,
              cursor: 'pointer',
              border: 'none',
            }}
          >
            <img
              src={adminProfile.image || ''}
              alt={adminProfile.name ? `${adminProfile.name} avatar` : 'Admin avatar'}
              style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ textAlign: 'left' }}>
              <h5 style={{ margin: 0, fontSize: 14 }}>{adminProfile.name}</h5>
              <p style={{ margin: 0, fontSize: 12 }}>{adminProfile.email}</p>
            </div>
          </button>
        </Header>

        {/* Content */}
        <Content
          style={{
            margin: '20px',
            padding: 28,
            backgroundColor: '#f1f8f1',
            minHeight: 'calc(100vh - 64px)',
            borderRadius: borderRadiusLG,
            boxShadow: '0 4px 10px rgba(46, 125, 50, 0.1)',
          }}
        >
          <Outlet context={{ adminProfile, setAdminProfile }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;