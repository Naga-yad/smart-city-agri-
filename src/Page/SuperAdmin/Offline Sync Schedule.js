// src/pages/OfflineSyncSchedule.jsx
import React, { useState } from "react";
import { Form, Select, Button, message } from "antd";

export default function OfflineSyncSchedule() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Sync schedule set to:", values.schedule);
    message.success(`Sync schedule updated: ${values.schedule}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Offline Sync Schedule</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Select Sync Frequency"
          name="schedule"
          rules={[{ required: true, message: "Please select a schedule!" }]}
        >
          <Select placeholder="Choose a sync schedule">
            <Select.Option value="daily">Daily</Select.Option>
            <Select.Option value="weekly">Weekly</Select.Option>
            <Select.Option value="monthly">Monthly</Select.Option>
            <Select.Option value="manual">Manual</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Save Schedule
        </Button>
      </Form>
    </div>
  );
}
