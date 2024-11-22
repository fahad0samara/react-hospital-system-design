import React from 'react';

const UserProfile = ({ user }) => {
  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(date);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="text-right text-sm">
        <p className="text-gray-600">{formatTime(new Date())}</p>
        <p className="text-gray-500">{formatDate(new Date())}</p>
      </div>
      <div className="flex items-center space-x-3 bg-white/30 backdrop-blur-lg rounded-full p-2">
        <div className="relative">
          <img
            src={user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="pr-4">
          <p className="text-sm font-semibold text-gray-800">{user.name}</p>
          <p className="text-xs text-gray-600">{user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
