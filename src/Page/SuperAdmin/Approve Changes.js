// src/pages/ApproveChanges.jsx
import React, { useState } from "react";
import { Table, Button, Space, message, Card } from "antd";

export default function ApproveChanges() {
  const [data, setData] = useState([
    { id: 1, name: "Fertilizer Prices Update", date: "2025-08-12" },
    { id: 2, name: "Weather Data Update", date: "2025-08-11" },
  ]);

  const approveChange = (id) => {
    setData(data.filter((item) => item.id !== id));
    message.success("Change approved!");
  };

  const rejectChange = (id) => {
    setData(data.filter((item) => item.id !== id));
    message.error("Change rejected.");
  };

  const columns = [
    { title: "Change Name", dataIndex: "name", key: "name" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => approveChange(record.id)}
            style={{ borderRadius: 6 }}
          >
            Approve
          </Button>
          <Button
            danger
            onClick={() => rejectChange(record.id)}
            style={{ borderRadius: 6 }}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: 24,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <Card
        style={{
          width: "80%",
          maxWidth: 900,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          background: "#fff",
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 600,
            marginBottom: 20,
            color: "#1890ff",
            textAlign: "center",
          }}
        >
          Approve Changes
        </h2>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Card>
    </div>
  );
}
