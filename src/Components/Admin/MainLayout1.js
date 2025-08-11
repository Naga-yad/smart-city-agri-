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
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  // Map routes to keys for menu highlighting
  const selectedKey = location.pathname === '/' ? '/' : location.pathname;

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#e6f2e6' /* light fresh green */ }}>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: '#2e7d32', color: 'white' }}
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
    if (key !== 'signout') {
      navigate(key);
    }
  }}
  items={[
    {
      key: '/Admin',
      icon: <GiWheat style={{ color: '#a5d6a7' }} />,
      label: 'Dashboard',
    },
    {
      key: 'local-data',
      icon: <GiPlantSeed style={{ color: '#a5d6a7' }} />,
      label: 'Local Data Updates',
      children: [
        {
          key: 'fertilizer',
          icon: <GiSprout style={{ color: '#a5d6a7' }} />,
          label: 'Fertilizer Prices',
        },
        {
          key: 'weather',
          icon: <GiWateringCan style={{ color: '#a5d6a7' }} />,
          label: 'Weather Alerts',
        },
        {
          key: 'crop-tips',
          icon: <GiWheat style={{ color: '#a5d6a7' }} />,
          label: 'Crop Tips',
        },
      ],
    },
    {
      key: 'user-support',
      icon: <FaUsers style={{ color: '#a5d6a7' }} />,
      label: 'User Support & Feedback',
      children: [
        {
          key: 'queries',
          icon: <IoMdNotifications style={{ color: '#a5d6a7' }} />,
          label: 'Farmer Queries',
        },
        {
          key: 'reports',
          icon: <FaUserCircle style={{ color: '#a5d6a7' }} />,
          label: 'Field Reports',
        },
        {
          key: 'training',
          icon: <FaUserPlus style={{ color: '#a5d6a7' }} />,
          label: 'Community Training',
        },
      ],
    },
    {
      key: 'device-management',
      icon: <FaCog style={{ color: '#a5d6a7' }} />,
      label: 'Device & Distribution Management',
      children: [
        {
          key: 'distribution',
          icon: <GiSprout style={{ color: '#a5d6a7' }} />,
          label: 'SD Card/USB Distribution',
        },
        {
          key: 'tracking',
          icon: <FaUsersCog style={{ color: '#a5d6a7' }} />,
          label: 'Village Data Tracking',
        },
        {
          key: 'technical',
          icon: <AiOutlineDashboard style={{ color: '#a5d6a7' }} />,
          label: 'Report Technical Issues',
        },
      ],
    },
   {
           key: 'Settings',
           icon: <FaCog className='fs-4' />,  // Changed from FaCo to FaUsers (group icon)
           label: 'Settings',
           children: [
              {
            key:'Profile',
            icon: <FaUserCircle className='fs-4' />,  // Correct profile icon
            label: 'Profile',
                },
              ],
            },
  ]}
          style={{ backgroundColor: '#2e7d32' }}
        />
      </Sider>

      {/* Main Section */}
      <Layout>
      <header>
        <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end', // Align to right
          padding: '8px 16px',
          backgroundColor: '#a5d6a7',
          borderRadius: '0 0 8px 8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Notification Icon */}
          <div
            style={{
              position: 'relative',
              cursor: 'pointer',
              color: '#2e7d32',
              fontSize: '26px',
              transition: 'color 0.3s ease',
            }}
            title="Notifications"
            onMouseEnter={e => (e.currentTarget.style.color = '#1b5e20')}
            onMouseLeave={e => (e.currentTarget.style.color = '#2e7d32')}
          >
            <IoMdNotifications size={26} />
            <span
              style={{
                position: 'absolute',
                top: -8,
                right: 8,
                background: '#f57c00',
                borderRadius: '50%',
                padding: '5px 8px',
                fontSize: '12px',
                color: 'white',
                fontWeight: '700',
                boxShadow: '0 0 3px rgba(0,0,0,0.3)',
                userSelect: 'none',
              }}
            >
              3
            </span>
          </div>
      
          {/* Profile Info */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#81c784',
              padding: '6px 12px',
              borderRadius: '30px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              cursor: 'default',
              userSelect: 'none',
              maxWidth: '220px',
            }}
          >
            <img
              src=""
              alt="Admin"
              style={{
                borderRadius: '50%',
                width: 36,
                height: 36,
                border: '2px solid #2e7d32',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}
            />
            <div style={{ color: '#1b5e20' }}>
              <h5 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Super Admin</h5>
              <p style={{ margin: 0, fontSize: '13px', color: '#2e7d32' }}>admin@farmer.com</p>
            </div>
          </div>
        </div>
      </div>
      
      
              </header>
     

        <Content
          style={{
            margin: '20px',
            padding: '28px',
            backgroundColor: '#f1f8f1', // very light green
            borderRadius: borderRadiusLG,
            minHeight: 'calc(100vh - 84px)',
            boxShadow: '0 4px 10px rgba(46, 125, 50, 0.1)',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
