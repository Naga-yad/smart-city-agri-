import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message, Space } from "antd";

export default function ReportTechnicalIssues() {
  const { Option } = Select;
  const [issues, setIssues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  const openModal = (record = null) => {
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const saveIssue = () => {
    form.validateFields().then((values) => {
      const newRecord = {
        ...values,
        id: editingRecord ? editingRecord.id : Date.now(),
      };

      if (editingRecord) {
        setIssues(issues.map((i) => (i.id === editingRecord.id ? newRecord : i)));
        message.success("Issue updated!");
      } else {
        setIssues([...issues, newRecord]);
        message.success("Issue reported!");
      }

      setIsModalOpen(false);
      setEditingRecord(null);
      form.resetFields();
    });
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Priority", dataIndex: "priority", key: "priority" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>Edit</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Report Technical Issues</h2>
      <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>
        Report Issue
      </Button>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={issues}
        pagination={{ pageSize: 5 }}
        bordered
      />

      <Modal
        title={editingRecord ? "Edit Issue" : "Report Issue"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={saveIssue}
        okText={editingRecord ? "Update" : "Submit"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter issue title" }]}
          >
            <Input placeholder="Enter issue title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter issue description" }]}
          >
            <Input.TextArea rows={4} placeholder="Describe the issue" />
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: "Please select priority" }]}
          >
            <Select placeholder="Select priority">
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select status">
              <Option value="Pending">Pending</Option>
              <Option value="Resolved">Resolved</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
