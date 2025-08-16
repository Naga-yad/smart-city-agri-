// src/pages/UploadDatasets.jsx
import React, { useState } from "react";
import { Upload, Button, message, Card, Typography, Space } from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";

export default function UploadDatasets() {
  const [fileList, setFileList] = useState([]);

  const handleUpload = () => {
    if (fileList.length === 0) {
      message.error("Please select a file first!");
      return;
    }
    // In real case, send file to backend API
    console.log("Uploading file:", fileList[0]);
    message.success("Dataset uploaded successfully!");
    setFileList([]);
  };

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
          maxWidth: 700,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Typography.Title
          level={2}
          style={{
            textAlign: "center",
            color: "#1890ff",
            marginBottom: 10,
          }}
        >
          Upload Datasets
        </Typography.Title>

        <Typography.Paragraph
          style={{
            textAlign: "center",
            fontSize: 16,
            color: "#555",
            marginBottom: 24,
          }}
        >
          <InfoCircleOutlined style={{ color: "#1890ff", marginRight: 8 }} />
          Select a dataset file (CSV, Excel, or JSON) to upload. This will be
          used for system analysis and updates.
        </Typography.Paragraph>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Upload
            beforeUpload={(file) => {
              setFileList([file]);
              return false; // prevent auto upload
            }}
            fileList={fileList}
            onRemove={() => setFileList([])}
          >
            <Button
              icon={<UploadOutlined />}
              style={{ borderRadius: 6, width: "100%" }}
            >
              Select File
            </Button>
          </Upload>

          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            style={{ borderRadius: 6, marginTop: 10, width: "100%" }}
          >
            Upload
          </Button>
        </Space>
      </Card>
    </div>
  );
}
