import React, { useState } from "react";
import { Table, Button, Modal, Typography, Card, Space, message } from "antd";

export default function FieldReports() {
  const [reports, setReports] = useState([
    {
      id: 1,
      officer: "Officer A",
      region: "Oromia",
      date: "2025-08-14",
      summary: "Teff planting delayed due to rain.",
      status: "Pending",
    },
    {
      id: 2,
      officer: "Officer B",
      region: "Amhara",
      date: "2025-08-13",
      summary: "Maize crops showing signs of nutrient deficiency.",
      status: "Reviewed",
    },
    {
      id: 3,
      officer: "Officer C",
      region: "SNNPR",
      date: "2025-08-12",
      summary: "Fertilizer shortage in local market observed.",
      status: "Pending",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);

  const handleView = (record) => {
    setCurrentReport(record);
    setIsModalOpen(true);
  };

  const markReviewed = (id) => {
    setReports(
      reports.map((r) =>
        r.id === id ? { ...r, status: "Reviewed" } : r
      )
    );
    message.success("Report marked as reviewed!");
  };

  const columns = [
    { title: "Officer Name", dataIndex: "officer", key: "officer" },
    { title: "Region", dataIndex: "region", key: "region" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Summary", dataIndex: "summary", key: "summary" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleView(record)}>
            View
          </Button>
          {record.status !== "Reviewed" && (
            <Button type="primary" onClick={() => markReviewed(record.id)}>
              Mark Reviewed
            </Button>
          )}
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
          style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}
        >
          <Typography.Title level={3} style={{ margin: 0, color: "#1890ff" }}>
            Field Reports
          </Typography.Title>
        </Space>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={reports}
          pagination={{ pageSize: 5 }}
          bordered
        />

        <Modal
          title={`Report by ${currentReport?.officer || ""}`}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={[
            <Button key="close" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>,
          ]}
        >
          <p><strong>Region:</strong> {currentReport?.region}</p>
          <p><strong>Date:</strong> {currentReport?.date}</p>
          <p><strong>Summary:</strong></p>
          <p>{currentReport?.summary}</p>
          <p><strong>Status:</strong> {currentReport?.status}</p>
        </Modal>
      </Card>
    </div>
  );
}
