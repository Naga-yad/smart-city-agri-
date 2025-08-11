import React from 'react';
import { Table, Tag, Space } from 'antd';

// Sample data for admins — replace with your API data later
const adminData = [
  {
    key: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Regional Admin',
    region: 'North Zone',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Operational Admin',
    region: 'South Zone',
    status: 'Inactive',
  },
  {
    key: '3',
    name: 'Ahmed Ali',
    email: 'ahmed.ali@example.com',
    role: 'Regional Admin',
    region: 'East Zone',
    status: 'Active',
  },
];

const AllAdmins= () => {
  // Define columns for the table
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
    <div style={{ padding: 24, backgroundColor: 'white', borderRadius: 8 }}>
      <h2>Admin List</h2>
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
