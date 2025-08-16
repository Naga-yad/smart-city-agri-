import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Card,
  Typography,
  Space,
} from "antd";

export default function ManageFarmers() {
  const [farmers, setFarmers] = useState([
    { id: 1, name: "Abebe", region: "Oromia", city: "Adama", kebele: "05" },
    { id: 2, name: "Kebede", region: "Amhara", city: "Bahir Dar", kebele: "03" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const addFarmer = async () => {
    try {
      const values = await form.validateFields();
      setFarmers([...farmers, { id: Date.now(), ...values }]);
      setIsModalOpen(false);
      form.resetFields();
      message.success("✅ Farmer added successfully!");
    } catch (errorInfo) {
      message.error("❌ Please fill in all required fields!");
    }
  };

  const columns = [
    { title: "👨‍🌾 Name", dataIndex: "name", key: "name" },
    {
      title: "📍 Address",
      key: "address",
      render: (_, record) =>
        `${record.region}, ${record.city}, Kebele ${record.kebele}`,
    },
  ];

  return (
    <div
      style={{
        padding: 24,
        display: "flex",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e0f7fa, #f5f7fa)",
        minHeight: "100vh",
      }}
    >
      <Card
        style={{
          width: "90%",
          maxWidth: 900,
          borderRadius: 16,
          boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
          padding: "20px 30px",
          backgroundColor: "#ffffff",
        }}
      >
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Typography.Title
            level={3}
            style={{
              color: "#1890ff",
              margin: 0,
              fontWeight: 700,
              letterSpacing: "0.5px",
            }}
          >
            👩‍🌾 Manage Farmers
          </Typography.Title>
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            style={{
              borderRadius: 8,
              fontWeight: 500,
              background: "linear-gradient(90deg, #1890ff, #40a9ff)",
              boxShadow: "0 3px 8px rgba(24, 144, 255, 0.3)",
            }}
          >
            + Add Farmer
          </Button>
        </Space>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={farmers}
          pagination={{ pageSize: 5 }}
          bordered
          style={{ borderRadius: 12, overflow: "hidden" }}
        />

        <Modal
          title="➕ Add New Farmer"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={addFarmer}
          okText="Add Farmer"
          cancelText="Cancel"
          okButtonProps={{ style: { borderRadius: 6 } }}
          cancelButtonProps={{ style: { borderRadius: 6 } }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Farmer Name"
              rules={[{ required: true, message: "Please enter farmer name" }]}
            >
              <Input placeholder="e.g., Abebe" />
            </Form.Item>
            <Form.Item
              name="region"
              label="Region"
              rules={[{ required: true, message: "Please enter region" }]}
            >
              <Input placeholder="e.g., Oromia" />
            </Form.Item>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "Please enter city" }]}
            >
              <Input placeholder="e.g., Adama" />
            </Form.Item>
            <Form.Item
              name="kebele"
              label="Kebele"
              rules={[{ required: true, message: "Please enter kebele number" }]}
            >
              <Input placeholder="e.g., 05" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
