import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaEdit, FaSave, FaTimes, FaUserCircle } from 'react-icons/fa';
import { GiFarmTractor } from 'react-icons/gi';

const Profile = () => {
    const { updateProfileInHeader } = useOutletContext();

  const [profile, setProfile] = useState({
    name: "Seniya Sultan",
    email: "Seniya@gmail.com",
    phone: "+519345678",
    address: "welo sefr ",
    region: "Addis Abeba",
    profileImage: {
      url: null,
      public_id: null
    },
    superAdminDetails: {
      role: "SuperAdmin"
    }
  });

  const [editMode, setEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => setEditMode(!editMode);

  const handleSave = () => {
    updateProfileInHeader(profile);
    setEditMode(false);
    setImageFile(null);
    alert('Profile updated locally (no backend)');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setProfile(prev => ({
        ...prev,
        profileImage: {
          ...prev.profileImage,
          url: reader.result
        }
      }));
      reader.readAsDataURL(file);
    } else {
      alert("Only JPG/PNG images are allowed and must be smaller than 2MB.");
    }
  };

  const profileFields = [
    { key: 'name', label: 'Full Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Phone', type: 'tel' },
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'region', label: 'Region', type: 'text' },
    { key: 'role', label: 'Role', type: 'text', disabled: true }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f0fdf4, #fef9c3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '42rem',
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          background: 'linear-gradient(to right, #15803d, #84cc16)',
          padding: '2rem',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: 'white'
          }}>
            <GiFarmTractor style={{ fontSize: '2.5rem', animation: 'bounce 1s infinite' }} />
          </div>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: '-0.02em'
          }}>Super Admin Profile</h2>
          <p style={{
            color: '#bbf7d0',
            marginTop: '0.5rem'
          }}>Farmer Assistant Management System</p>
        </div>

        <div style={{ padding: '2.5rem' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '2.5rem'
          }}>
            <label htmlFor="profileImageUpload" style={{ position: 'relative', cursor: editMode ? 'pointer' : 'default' }}>
              <div style={{
                width: '11rem',
                height: '11rem',
                background: 'linear-gradient(to right, #dcfce7, #fef9c3)',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}>
                {profile.profileImage?.url ? (
                  <img
                    src={profile.profileImage.url}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <FaUserCircle style={{
                    fontSize: '5rem',
                    color: '#86efac'
                  }} />
                )}
                {editMode && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    opacity: 1,
                    transition: 'opacity 0.3s'
                  }}>
                    <FaEdit />
                  </div>
                )}
              </div>
              <input
                id="profileImageUpload"
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                disabled={!editMode}
              />
            </label>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {profileFields.map((field, index) => (
              <div key={index}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {field.label}
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={field.type}
                    name={field.key}
                    value={profile[field.key] || ''}
                    onChange={handleInputChange}
                    disabled={!editMode || field.disabled}
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: editMode ? '2px solid #bbf7d0' : '2px solid transparent',
                      borderRadius: '0.75rem',
                      color: field.disabled ? '#6b7280' : '#1f2937',
                      fontStyle: field.disabled ? 'italic' : 'normal',
                      backgroundColor: !editMode ? '#f9fafb' : 'white',
                      outline: 'none'
                    }}
                  />
                  {!editMode && (
                    <div style={{
                      position: 'absolute',
                      insetBlock: 0,
                      right: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      pointerEvents: 'none'
                    }}>
                      <FaEdit style={{ color: '#9ca3af' }} />
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', paddingTop: '1.5rem' }}>
              {editMode ? (
                <>
                  <button
                    type="button"
                    onClick={handleSave}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem 2rem',
                      background: 'linear-gradient(to right, #16a34a, #84cc16)',
                      color: 'white',
                      borderRadius: '0.75rem',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                    }}
                  >
                    <FaSave style={{ marginRight: '0.75rem' }} /> Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleEdit}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem 2rem',
                      background: '#4b5563',
                      color: 'white',
                      borderRadius: '0.75rem',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                    }}
                  >
                    <FaTimes style={{ marginRight: '0.75rem' }} /> Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleEdit}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem 2rem',
                    background: 'linear-gradient(to right, #22c55e, #a3e635)',
                    color: 'white',
                    borderRadius: '0.75rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                  }}
                >
                  <FaEdit style={{ marginRight: '0.75rem' }} /> Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
