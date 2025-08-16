import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
  Card,
  Typography,
  Space,
  Select,
} from "antd";
import dayjs from "dayjs";

export default function SdUsbDistribution() {
  const { Option } = Select;

  const [distributions, setDistributions] = useState([
    {
      id: 1,
      device: "SD Card",
      recipient: "Abebe",
      quantity: 10,
      date: "2025-08-14",
      status: "Distributed",
    },
    {
      id: 2,
      device: "USB Drive",
      recipient: "Kebede",
      quantity: 5,
      date: "2025-08-13",
      status: "Pending",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  const openModal = (record = null) => {
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue({
        ...record,
        date: dayjs(record.date, "YYYY-MM-DD"), // convert string to dayjs object
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const saveRecord = () => {
    form.validateFields().then((values) => {
      const newRecord = {
        ...values,
        id: editingRecord ? editingRecord.id : Date.now(),
        date: values.date.format("YYYY-MM-DD"), // convert dayjs object to string
      };

      if (editingRecord) {
        setDistributions(
          distributions.map((d) => (d.id === editingRecord.id ? newRecord : d))
        );
        message.success("Record updated successfully!");
      } else {
        setDistributions([...distributions, newRecord]);
        message.success("Record added successfully!");
      }

      setIsModalOpen(false);
      setEditingRecord(null);
      form.resetFields();
    });
  };

  const columns = [
    { title: "Device", dataIndex: "device", key: "device" },
    { title: "Recipient", dataIndex: "recipient", key: "recipient" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <Card
        style={{
          maxWidth: 1000,
          margin: "0 auto",
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
          <Typography.Title level={3} style={{ margin: 0, color: "#1890ff" }}>
            SD Card / USB Distribution
          </Typography.Title>
          <Button type="primary" onClick={() => openModal()}>
            Add Record
          </Button>
        </Space>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={distributions}
          pagination={{ pageSize: 5 }}
          bordered
        />

        <Modal
          title={editingRecord ? "Edit Distribution" : "Add Distribution"}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={saveRecord}
          okText={editingRecord ? "Update" : "Add"}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="device"
              label="Device"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select device">
                <Option value="SD Card">SD Card</Option>
                <Option value="USB Drive">USB Drive</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="recipient"
              label="Recipient"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter recipient name" />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true }]}
            >
              <Input type="number" placeholder="Enter quantity" />
            </Form.Item>
            <Form.Item
              name="date"
              label="Distribution Date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select status">
                <Option value="Pending">Pending</Option>
                <Option value="Distributed">Distributed</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
