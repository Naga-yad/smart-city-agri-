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
  Popconfirm,
} from "antd";

export default function ManageDrivers() {
  const [drivers, setDrivers] = useState([
    { id: 1, name: "Driver A", vehicle: "Toyota Hilux", license: "AB12345" },
    { id: 2, name: "Driver B", vehicle: "Isuzu Truck", license: "CD67890" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [form] = Form.useForm();

  // Save (Add / Edit)
  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingDriver) {
        setDrivers(
          drivers.map((d) =>
            d.id === editingDriver.id ? { ...d, ...values } : d
          )
        );
        message.success("Driver updated successfully!");
      } else {
        setDrivers([...drivers, { id: Date.now(), ...values }]);
        message.success("Driver added successfully!");
      }
      setIsModalOpen(false);
      setEditingDriver(null);
      form.resetFields();
    });
  };

  // Delete
  const handleDelete = (id) => {
    setDrivers(drivers.filter((d) => d.id !== id));
    message.success("Driver deleted!");
  };

  // Columns
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Vehicle", dataIndex: "vehicle", key: "vehicle" },
    { title: "License Number", dataIndex: "license", key: "license" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingDriver(record);
              setIsModalOpen(true);
              form.setFieldsValue(record);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this driver?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
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
          width: "90%",
          maxWidth: 950,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Typography.Title level={3} style={{ color: "#1890ff", margin: 0 }}>
            Manage Drivers
          </Typography.Title>
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
              setEditingDriver(null);
              form.resetFields();
            }}
          >
            Add Driver
          </Button>
        </Space>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={drivers}
          pagination={{ pageSize: 5 }}
          bordered
          style={{ borderRadius: 8 }}
        />

        <Modal
          title={editingDriver ? "Edit Driver" : "Add Driver"}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingDriver(null);
          }}
          onOk={handleSave}
          okText={editingDriver ? "Update" : "Add"}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Driver Name"
              rules={[{ required: true, message: "Please enter driver name" }]}
            >
              <Input placeholder="Enter driver's full name" />
            </Form.Item>
            <Form.Item
              name="vehicle"
              label="Vehicle"
              rules={[{ required: true, message: "Please enter vehicle" }]}
            >
              <Input placeholder="e.g., Toyota Hilux" />
            </Form.Item>
            <Form.Item
              name="license"
              label="License Number"
              rules={[
                { required: true, message: "Please enter license number" },
              ]}
            >
              <Input placeholder="e.g., AB12345" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
