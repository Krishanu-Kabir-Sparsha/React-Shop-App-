import React from 'react';

const UserProfile = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <label className="block font-semibold">Name:</label>
          <p className="text-gray-700">John Doe</p> {/* Replace with dynamic user data */}
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Email:</label>
          <p className="text-gray-700">john.doe@example.com</p> {/* Replace with dynamic user data */}
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Address:</label>
          <p className="text-gray-700">123 Main St, City, Country</p> {/* Replace with dynamic user data */}
        </div>
        <button className="btn btn-primary">Edit Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
