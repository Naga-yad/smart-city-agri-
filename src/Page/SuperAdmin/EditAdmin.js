import React, { useState } from "react";

const EditAdmin = () => {
  const [admins, setAdmins] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
    { id: 3, name: "David Brown", email: "david@example.com", role: "Moderator" },
  ]);

  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", role: "Admin" });

  const handleEdit = (id) => {
    alert(`Edit admin with ID: ${id}`);
    // In real case, open a modal or form to edit
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      setAdmins(admins.filter((admin) => admin.id !== id));
    }
  };

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) {
      alert("Please fill in all fields!");
      return;
    }
    const newId = admins.length > 0 ? admins[admins.length - 1].id + 1 : 1;
    setAdmins([...admins, { id: newId, ...newAdmin }]);
    setNewAdmin({ name: "", email: "", role: "Admin" });
    alert("Admin added successfully!");
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Left side - Admin list */}
      <div
        style={{
          flex: 2,
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#1890ff", marginBottom: "16px" }}>Manage Admins</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={{ padding: "10px" }}>ID</th>
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>Email</th>
              <th style={{ padding: "10px" }}>Role</th>
              <th style={{ padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin) => (
                <tr key={admin.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{admin.id}</td>
                  <td style={{ padding: "10px" }}>{admin.name}</td>
                  <td style={{ padding: "10px" }}>{admin.email}</td>
                  <td style={{ padding: "10px" }}>{admin.role}</td>
                  <td style={{ padding: "10px" }}>
                    <button
                      onClick={() => handleEdit(admin.id)}
                      style={{
                        background: "#1890ff",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "8px",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
                      style={{
                        background: "red",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                  No admins found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Right side - Add new admin */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#52c41a", marginBottom: "16px" }}>Add Admin</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            placeholder="Name"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <select
            value={newAdmin.role}
            onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="Super Admin">Super Admin</option>
          </select>
          <button
            onClick={handleAddAdmin}
            style={{
              background: "#52c41a",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;
