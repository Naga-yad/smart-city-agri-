import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message, Typography, Card, Space, Select } from "antd";
import moment from 'moment';

export default function CommunityTraining() {
  const { Option } = Select;

  const [trainings, setTrainings] = useState([
    {
      id: 1,
      name: "Maize Planting Techniques",
      trainer: "Officer A",
      date: "2025-08-20",
      location: "Oromia - Adama",
      status: "Scheduled",
    },
    {
      id: 2,
      name: "Soil Fertility Management",
      trainer: "Officer B",
      date: "2025-08-22",
      location: "Amhara - Bahir Dar",
      status: "Scheduled",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingTraining, setEditingTraining] = useState(null);

  const openModal = (training = null) => {
    setEditingTraining(training);
    if (training) {
      form.setFieldsValue({ ...training, date: moment(training.date) });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const saveTraining = () => {
    form.validateFields().then((values) => {
      const newTraining = {
        ...values,
        id: editingTraining ? editingTraining.id : Date.now(),
        date: values.date.format("YYYY-MM-DD"),
      };
      if (editingTraining) {
        setTrainings(trainings.map(t => t.id === editingTraining.id ? newTraining : t));
        message.success("Training updated successfully!");
      } else {
        setTrainings([...trainings, newTraining]);
        message.success("Training added successfully!");
      }
      setIsModalOpen(false);
      setEditingTraining(null);
      form.resetFields();
    });
  };

  const cancelTraining = (id) => {
    setTrainings(trainings.map(t => t.id === id ? { ...t, status: "Cancelled" } : t));
    message.success("Training cancelled.");
  };

  const columns = [
    { title: "Training Name", dataIndex: "name", key: "name" },
    { title: "Trainer", dataIndex: "trainer", key: "trainer" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>Edit</Button>
          {record.status !== "Cancelled" && (
            <Button type="danger" onClick={() => cancelTraining(record.id)}>Cancel</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <Card style={{ maxWidth: 1000, margin: "0 auto", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <Typography.Title level={3} style={{ margin: 0, color: "#1890ff" }}>Community Training</Typography.Title>
          <Button type="primary" onClick={() => openModal()}>Add Training</Button>
        </Space>

        <Table rowKey="id" columns={columns} dataSource={trainings} pagination={{ pageSize: 5 }} bordered />

        <Modal
          title={editingTraining ? "Edit Training" : "Add Training"}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={saveTraining}
          okText={editingTraining ? "Update" : "Add"}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Training Name" rules={[{ required: true }]}>
              <Input placeholder="Enter training name" />
            </Form.Item>
            <Form.Item name="trainer" label="Trainer" rules={[{ required: true }]}>
              <Input placeholder="Enter trainer name" />
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="location" label="Location" rules={[{ required: true }]}>
              <Input placeholder="Enter region and kebele/city" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
