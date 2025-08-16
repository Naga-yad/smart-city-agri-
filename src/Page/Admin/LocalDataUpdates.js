import React, { useState } from "react";

export default function LocalDataTable() {
  // Sample offline data with region/month
  const localData = [
    {
      region: "Oromia",
      month: "August",
      fertilizer: [
        { type: "Urea", price: "1200 ETB/qtl" },
        { type: "DAP", price: "1500 ETB/qtl" },
      ],
      weather: "Rain expected throughout the month",
      tips: [
        "Plant teff seeds early for better yield",
        "Use compost to improve soil fertility",
      ],
    },
    {
      region: "Amhara",
      month: "September",
      fertilizer: [
        { type: "Urea", price: "1180 ETB/qtl" },
        { type: "DAP", price: "1480 ETB/qtl" },
      ],
      weather: "Mostly sunny, low rainfall",
      tips: [
        "Irrigate maize every 3 days",
        "Mulch around plants to retain soil moisture",
      ],
    },
    {
      region: "SNNPR",
      month: "August",
      fertilizer: [
        { type: "Urea", price: "1220 ETB/qtl" },
        { type: "DAP", price: "1520 ETB/qtl" },
      ],
      weather: "Heavy rainfall warning",
      tips: [
        "Use raised beds to prevent waterlogging",
        "Drain excess water from fields quickly",
      ],
    },
  ];

  const [filter, setFilter] = useState("");

  // Inline styles
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f7f9fc",
    padding: "20px",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#2c3e50",
  };

  const searchStyle = {
    marginBottom: "15px",
    padding: "8px",
    width: "250px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const thStyle = {
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#3498db",
    color: "white",
    borderBottom: "1px solid #ddd",
  };

  const tdStyle = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    verticalAlign: "top",
  };

  const trHoverStyle = {
    backgroundColor: "#f1f1f1",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>🌍 Local Data Updates</h2>

      {/* Search filter by region */}
      <input
        style={searchStyle}
        type="text"
        placeholder="Search by region..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Region / Kebele</th>
            <th style={thStyle}>Month</th>
            <th style={thStyle}>Fertilizer Prices</th>
            <th style={thStyle}>Weather Alerts</th>
            <th style={thStyle}>Crop Tips</th>
          </tr>
        </thead>
        <tbody>
          {localData
            .filter((row) =>
              row.region.toLowerCase().includes(filter.toLowerCase())
            )
            .map((row, index) => (
              <tr
                key={index}
                style={index % 2 === 0 ? {} : trHoverStyle} // Alternate row color
              >
                <td style={tdStyle}>{row.region}</td>
                <td style={tdStyle}>{row.month}</td>
                <td style={tdStyle}>
                  <ul style={{ margin: 0, paddingLeft: "18px" }}>
                    {row.fertilizer.map((f, i) => (
                      <li key={i}>
                        {f.type}: <strong>{f.price}</strong>
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={tdStyle}>{row.weather}</td>
                <td style={tdStyle}>
                  <ul style={{ margin: 0, paddingLeft: "18px" }}>
                    {row.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
