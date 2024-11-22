import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { FiSend, FiPaperclip, FiImage } from 'react-icons/fi';

const Messages = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');

  // Mock data for messages
  const [messages] = useState([
    {
      id: 1,
      sender: 'Dr. Sarah Wilson',
      content: 'Patient in Room 302 needs immediate attention.',
      timestamp: '10:30 AM',
      isDoctor: true,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 2,
      sender: 'Dr. James Chen',
      content: 'Lab results for Mrs. Johnson are ready. Everything looks normal.',
      timestamp: '10:32 AM',
      isDoctor: true,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 3,
      sender: 'Nurse Emily',
      content: 'Patient in 302 has been attended to. Vital signs are stable now.',
      timestamp: '10:35 AM',
      isDoctor: false,
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      id: 4,
      sender: 'Dr. Sarah Wilson',
      content: 'Thank you, Emily. Please keep monitoring and update me if there are any changes.',
      timestamp: '10:36 AM',
      isDoctor: true,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 5,
      sender: 'Dr. Michael Brown',
      content: 'Team meeting at 2 PM in Conference Room A to discuss the new treatment protocols.',
      timestamp: '10:40 AM',
      isDoctor: true,
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg'
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Messages" maxWidth="max-w-4xl">
      <div className="flex flex-col h-[600px]">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3">
              <img
                src={msg.avatar}
                alt={msg.sender}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${msg.isDoctor ? 'text-blue-600' : 'text-green-600'}`}>
                    {msg.sender}
                  </span>
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                </div>
                <div className="mt-1 bg-white rounded-2xl rounded-tl-none px-4 py-2 shadow-sm border border-gray-100">
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSend} className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiPaperclip className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiImage className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className={`p-2 rounded-xl ${
                message.trim()
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-100 text-gray-400'
              } transition-all`}
            >
              <FiSend className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Messages;
