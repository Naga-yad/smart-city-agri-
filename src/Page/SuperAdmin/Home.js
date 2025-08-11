import React from 'react';
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { Column } from '@ant-design/plots';
import '../../Dashboard.css';

const Dashboard = () => {
  const data = [
    { type: 'Jan', products: 30 },
    { type: 'Feb', products: 48 },
    { type: 'Mar', products: 28 },
    { type: 'Apr', products: 34 },
    { type: 'May', products: 30 },
    { type: 'Jun', products: 44 },
    { type: 'Jul', products: 48 },
    { type: 'Aug', products: 30 },
    { type: 'Sep', products: 28 },
    { type: 'Oct', products: 48 },
    { type: 'Nov', products: 44 },
    { type: 'Dec', products: 40 },
  ];

  const columnConfig = {
    data: data,
    xField: 'type',
    yField: 'products',
    color: '#4CAF50',
    label: {
      position: 'top',
      style: {
        fill: '#2E7D32',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: { alias: 'Month' },
      products: { alias: 'Crop Yield (tons)' },
    },
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h2>🌾 Farmer Assistance Dashboard</h2>
        <p>Helping farmers monitor yields, weather, and sales</p>
      </header>

      <div className="stats-row">
        <div className="stat-card green-border">
          <div>
            <p className="stat-label">Total Crop Yield</p>
            <h4 className="stat-value green-text">1,200 tons</h4>
          </div>
          <div className="stat-change red-text">
            <span><GoArrowDownRight /> 5%</span>
            <small>vs Last Month</small>
          </div>
        </div>

        <div className="stat-card yellow-border">
          <div>
            <p className="stat-label">Active Farmers</p>
            <h4 className="stat-value yellow-text">450</h4>
          </div>
          <div className="stat-change green-text">
            <span><GoArrowUpRight /> 12%</span>
            <small>vs Last Month</small>
          </div>
        </div>

        <div className="stat-card blue-border">
          <div>
            <p className="stat-label">Market Sales</p>
            <h4 className="stat-value blue-text">$320,000</h4>
          </div>
          <div className="stat-change green-text">
            <span><GoArrowUpRight /> 8%</span>
            <small>vs Last Month</small>
          </div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3>Crop Yield Statistics</h3>
          <Column {...columnConfig} />
        </div>
        <div className="chart-card">
          <h3>Weather & Soil Data</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;