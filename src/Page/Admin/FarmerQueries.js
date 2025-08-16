import React, { useState } from "react";
import { Table, Button, Modal, Input, message, Typography, Space, Card } from "antd";

export default function FarmerQueries() {
  const [queries, setQueries] = useState([
    {
      id: 1,
      farmer: "Abebe",
      question: "When should I plant teff this season?",
      response: "",
      status: "Pending",
    },
    {
      id: 2,
      farmer: "Kebede",
      question: "What is the best fertilizer for maize?",
      response: "Use DAP and Urea at recommended rates",
      status: "Answered",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuery, setCurrentQuery] = useState(null);
  const [responseText, setResponseText] = useState("");

  const handleRespond = (record) => {
    setCurrentQuery(record);
    setResponseText(record.response || "");
    setIsModalOpen(true);
  };

  const saveResponse = () => {
    if (!responseText.trim()) {
      message.error("Please enter a response!");
      return;
    }
    setQueries(
      queries.map((q) =>
        q.id === currentQuery.id
          ? { ...q, response: responseText, status: "Answered" }
          : q
      )
    );
    message.success("Response saved successfully!");
    setIsModalOpen(false);
  };

  const columns = [
    { title: "Farmer Name", dataIndex: "farmer", key: "farmer" },
    { title: "Question", dataIndex: "question", key: "question" },
    { title: "Response", dataIndex: "response", key: "response" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleRespond(record)}>
          {record.status === "Answered" ? "Edit Response" : "Respond"}
        </Button>
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
          style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}
        >
          <Typography.Title level={3} style={{ margin: 0, color: "#1890ff" }}>
            Farmer Queries
          </Typography.Title>
        </Space>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={queries}
          pagination={{ pageSize: 5 }}
          bordered
        />

        <Modal
          title={`Respond to ${currentQuery?.farmer || ""}`}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={saveResponse}
          okText="Save Response"
        >
          <Input.TextArea
            rows={4}
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Type your response here..."
          />
        </Modal>
      </Card>
    </div>
  );
}
