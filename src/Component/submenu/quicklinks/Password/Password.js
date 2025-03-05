import React, { useState } from 'react';
import './PasswordChangeForm.css';

const PasswordChangeForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (oldPassword === '') {
      setError('Please enter your old password.');
      return;
    }

    if (newPassword === '') {
      setError('Please enter a new password.');
      return;
    }

    if (confirmPassword !== newPassword) {
      setError('The new password and confirmation password do not match.');
      return;
    }
    const employeeCode = localStorage.getItem('empcode'); // or however you store it
  
    try {
      const response = await fetch('http://localhost:5000/quicklinks/passwordchange/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          employeeCode,
        }),
      });

      if (response.ok) {
        console.log('Password changed successfully!');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('An error occurred while changing the password. Please try again later.');
    }
  };

  return (
    <div className="password-change-form-container">
      <h2>Change Password</h2>
      <form className="password-change-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Re-Enter the password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChangeForm;
