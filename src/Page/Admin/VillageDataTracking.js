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

export default function VillageDataTracking() {
  const [villages, setVillages] = useState([
    {
      id: 1,
      name: "Abebe Village",
      region: "Oromia",
      kebele: "05",
      population: 1200,
      mainCrops: "Teff, Maize",
      reportsSubmitted: 10,
    },
    {
      id: 2,
      name: "Tigray Village",
      region: "Tigray",
      kebele: "03",
      population: 950,
      mainCrops: "Wheat",
      reportsSubmitted: 8,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  const openModal = (record = null) => {
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue({ ...record });
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
      };

      if (editingRecord) {
        setVillages(
          villages.map((v) => (v.id === editingRecord.id ? newRecord : v))
        );
        message.success("Village data updated!");
      } else {
        setVillages([...villages, newRecord]);
        message.success("Village data added!");
      }

      setIsModalOpen(false);
      setEditingRecord(null);
      form.resetFields();
    });
  };

  const columns = [
    { title: "Village Name", dataIndex: "name", key: "name" },
    { title: "Region", dataIndex: "region", key: "region" },
    { title: "Kebele", dataIndex: "kebele", key: "kebele" },
    { title: "Population", dataIndex: "population", key: "population" },
    { title: "Main Crops", dataIndex: "mainCrops", key: "mainCrops" },
    {
      title: "Reports Submitted",
      dataIndex: "reportsSubmitted",
      key: "reportsSubmitted",
    },
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
            Village Data Tracking
          </Typography.Title>
          <Button type="primary" onClick={() => openModal()}>
            Add Village
          </Button>
        </Space>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={villages}
          pagination={{ pageSize: 5 }}
          bordered
        />

        <Modal
          title={editingRecord ? "Edit Village" : "Add Village"}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={saveRecord}
          okText={editingRecord ? "Update" : "Add"}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Village Name"
              rules={[{ required: true, message: "Please enter village name" }]}
            >
              <Input placeholder="Enter village name" />
            </Form.Item>
            <Form.Item
              name="region"
              label="Region"
              rules={[{ required: true, message: "Please enter region" }]}
            >
              <Input placeholder="e.g., Oromia" />
            </Form.Item>
            <Form.Item
              name="kebele"
              label="Kebele"
              rules={[{ required: true, message: "Please enter kebele" }]}
            >
              <Input placeholder="e.g., 05" />
            </Form.Item>
            <Form.Item
              name="population"
              label="Population"
              rules={[{ required: true, message: "Please enter population" }]}
            >
              <Input type="number" placeholder="Enter population" />
            </Form.Item>
            <Form.Item
              name="mainCrops"
              label="Main Crops"
              rules={[{ required: true, message: "Please enter main crops" }]}
            >
              <Input placeholder="e.g., Teff, Maize" />
            </Form.Item>
            <Form.Item
              name="reportsSubmitted"
              label="Reports Submitted"
              rules={[{ required: true, message: "Please enter number of reports" }]}
            >
              <Input type="number" placeholder="Enter number of reports submitted" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
