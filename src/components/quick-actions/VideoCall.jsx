import React, { useState, useEffect } from 'react';
import { FiX, FiMic, FiMicOff, FiVideo, FiVideoOff } from 'react-icons/fi';

const VideoCall = ({ isOpen, onClose, patientName = "John Doe" }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callTime, setCallTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="w-full max-w-4xl p-6">
        <div className="relative">
          {/* Main video container */}
          <div className="aspect-video bg-gray-800 rounded-2xl overflow-hidden mb-4">
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 px-4 py-2 rounded-xl text-white flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>{formatTime(callTime)}</span>
            </div>
            
            {/* Patient name */}
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-4 py-2 rounded-xl text-white">
              {patientName}
            </div>

            {/* Doctor preview */}
            <div className="absolute bottom-4 right-4 w-48 aspect-video bg-gray-700 rounded-xl overflow-hidden border-2 border-white">
              {isVideoOff ? (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <FiVideoOff className="w-8 h-8" />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-600"></div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full ${
                isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
              } text-white transition-colors`}
            >
              {isMuted ? <FiMicOff className="w-6 h-6" /> : <FiMic className="w-6 h-6" />}
            </button>

            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-4 rounded-full ${
                isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
              } text-white transition-colors`}
            >
              {isVideoOff ? <FiVideoOff className="w-6 h-6" /> : <FiVideo className="w-6 h-6" />}
            </button>

            <button
              onClick={onClose}
              className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
