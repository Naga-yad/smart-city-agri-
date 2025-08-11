import React, { useState } from 'react';

const EditAdmin = () => {
  // Dummy data for now
  const [admins, setAdmins] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
    { id: 3, name: 'David Brown', email: 'david@example.com', role: 'Moderator' },
  ]);

  const handleEdit = (id) => {
    alert(`Edit admin with ID: ${id}`);
    // You can navigate to a separate edit form or open a modal
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      setAdmins(admins.filter(admin => admin.id !== id));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Admins</h2>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.length > 0 ? (
            admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td>
                  <button onClick={() => handleEdit(admin.id)}>Edit</button>
                  <button onClick={() => handleDelete(admin.id)} style={{ marginLeft: '10px', color: 'red' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No admins found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EditAdmin;
