import React, { useState } from 'react';
import './Profile.css'; 

const Profile = () => {
  const [profileData, setProfileData] = useState({
    profilePhoto: '',
    phoneNumber: '',
    occupation: '',
    bio: '',
    statusText: '',
    secondaryEmail: '',
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    username: 'john_doe',
  });

  const [passwordData, setPasswordData] = useState({
    previousPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
  };

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    console.log('Personal Info updated:', personalInfo);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Password updated:', passwordData);
  };

  return (

    <div className="profile-page"> 
      <h1 className="page-title">Profile Page</h1>


      <section className="form-section">
        <h2>Profile Update</h2>
        <form onSubmit={handleProfileSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="profilePhoto">Profile Photo</label>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              onChange={handleProfileChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleProfileChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="occupation">Occupation</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={profileData.occupation}
              onChange={handleProfileChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={profileData.bio}
              onChange={handleProfileChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="statusText">Status</label>
            <input
              type="text"
              id="statusText"
              name="statusText"
              value={profileData.statusText}
              onChange={handleProfileChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="secondaryEmail">Secondary Email</label>
            <input
              type="email"
              id="secondaryEmail"
              name="secondaryEmail"
              value={profileData.secondaryEmail}
              onChange={handleProfileChange}
            />
          </div>
          <button type="submit" className="submit-button">
            Update Profile
          </button>
        </form>
      </section>

    
      <section className="form-section">
        <h2>Personal Information Update</h2>
        <form onSubmit={handlePersonalInfoSubmit} className="personal-info-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={personalInfo.firstName}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={personalInfo.lastName}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={personalInfo.username}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Update Personal Info
          </button>
        </form>
      </section>

      
      <section className="form-section">
        <h2>Password Update</h2>
        <form onSubmit={handlePasswordSubmit} className="password-form">
          <div className="form-group">
            <label htmlFor="previousPassword">Previous Password</label>
            <input
              type="password"
              id="previousPassword"
              name="previousPassword"
              value={passwordData.previousPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Update Password
          </button>
        </form>
      </section>
    </div>
  );
};

export default Profile;
