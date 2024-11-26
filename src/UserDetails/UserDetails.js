import React, { useState, useEffect } from 'react';
import './UserDetails.css';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setUpdatedUser(user); // Initialize with selected user data
    setEditing(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSaveChanges = () => {
    fetch(`http://localhost:5000/users/${updatedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(response => response.json())
      .then(data => {
        setUsers(users.map(user => user.id === data.id ? data : user));
        setSelectedUser(data);
        setEditing(false);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setUsers(users.filter(user => user.id !== id));
          setSelectedUser(null);
        })
        .catch(error => console.error('Error deleting user:', error));
    }
  };

  const handleActivateDeactivate = (id, status) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ active: status }),
    })
      .then(response => response.json())
      .then(data => {
        setUsers(users.map(user => user.id === data.id ? data : user));
        if (selectedUser && selectedUser.id === data.id) {
          setSelectedUser(data);
        }
      })
      .catch(error => console.error('Error updating user status:', error));
  };

  // const handlePasswordReset = (email) => {
  //   fetch('http://localhost:5000/reset-password', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email }),
  //   })
  //     .then(response => response.json())
  //     .then(data => alert('Password reset email sent'))
  //     .catch(error => console.error('Error sending password reset:', error));
  // };

  // const handleBanUser = (id) => {
  //   fetch(`http://localhost:5000/users/${id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ banned: true }),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       setUsers(users.map(user => user.id === data.id ? data : user));
  //       if (selectedUser && selectedUser.id === data.id) {
  //         setSelectedUser(data);
  //       }
  //     })
  //     .catch(error => console.error('Error banning user:', error));
  // };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="user-details">
      <h1>All Users</h1>
      <div className="user-list">
        {users.length > 0 ? (
          <ul>
            {users.map(user => (
              <li key={user.id} className="user-item">
                <h2>{user.userName}</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phoneNo}</p>
                <button onClick={() => handleUserClick(user)}>
                  View Details
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {selectedUser && (
        <div className="user-detail-view">
          <h2>Details for {selectedUser.userName}</h2>
          {editing ? (
            <div>
              <h3>Edit Profile</h3>
              <label>Email:
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleEditChange}
                />
              </label>
              <label>Phone:
                <input
                  type="tel"
                  name="phoneNo"
                  value={updatedUser.phoneNo}
                  onChange={handleEditChange}
                />
              </label>
              <div className="button-group">
  <button className="save-button" onClick={handleSaveChanges}>
    Save Changes
  </button>
  <button className="cancel-button" onClick={() => setEditing(false)}>
    Cancel
  </button>
</div>

            </div>
          ) : (
            <div>
              <h3>Profile Info</h3>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phoneNo}</p>

              <h3>Order History</h3>
              {selectedUser.orderHistory.length > 0 ? (
                <ul>
                  {selectedUser.orderHistory.map(order => (
                    <li key={order.id}>
                      <p><strong>Order Date:</strong> {order.orderDate}</p>
                      <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
                      <ul>
                        {order.products.map(product => (
                          <li key={product.id}>
                            <p><strong>Product:</strong> {product.name}</p>
                            <p><strong>Quantity:</strong> {product.quantity}</p>
                            <p><strong>Price:</strong> ${product.price}</p>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders found.</p>
              )}

              <h3>Activity Log</h3>
              <p>Activity logs are not implemented yet.</p>

              <div className="user-actions">
                <button onClick={() => setEditing(true)}>Edit User</button>
                <button onClick={() => handleDeleteUser(selectedUser.id)}>Delete User</button>
                <button onClick={() => handleActivateDeactivate(selectedUser.id, !selectedUser.active)}>
                  {selectedUser.active ? 'Deactivate' : 'Activate'} User
                </button>
                {/* <button onClick={() => handlePasswordReset(selectedUser.email)}>Reset Password</button>
                <button onClick={() => handleBanUser(selectedUser.id)}>Ban User</button> */}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
