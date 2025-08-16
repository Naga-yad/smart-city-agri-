import React from 'react';
import { Table, Tag } from 'antd';

// Sample data for admins — replace with your API data later
const adminData = [
  {
    key: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Regional Admin',
    region: 'Oromia - Adama - Kebele 05',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Operational Admin',
    region: 'Tigray - Mekelle - Kebele 12',
    status: 'Inactive',
  },
  {
    key: '3',
    name: 'Ahmed Ali',
    email: 'ahmed.ali@example.com',
    role: 'Regional Admin',
    region: 'Amhara - Bahir Dar - Kebele 03',
    status: 'Active',
  },
];

const AllAdmins = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Regional Admin', value: 'Regional Admin' },
        { text: 'Operational Admin', value: 'Operational Admin' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      sorter: (a, b) => a.region.localeCompare(b.region),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'volcano'}>
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  return (
    <div
      style={{
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s ease-in-out',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16, color: '#1890ff' }}>
        Admin List
      </h2>
      <Table
        columns={columns}
        dataSource={adminData}
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />
    </div>
  );
};

export default AllAdmins;
