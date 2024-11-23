import {
  FiFile,
  FiFileText,
  FiImage,
  FiMusic,
  FiVideo,
  FiPaperclip,
  FiArchive,
  FiCode
} from 'react-icons/fi';

const fileTypeConfig = {
  // Images
  'image/jpeg': { icon: FiImage, color: 'blue' },
  'image/png': { icon: FiImage, color: 'blue' },
  'image/gif': { icon: FiImage, color: 'blue' },
  'image/svg+xml': { icon: FiImage, color: 'blue' },
  'image/webp': { icon: FiImage, color: 'blue' },

  // Documents
  'application/pdf': { icon: FiFileText, color: 'red' },
  'application/msword': { icon: FiFileText, color: 'blue' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { icon: FiFileText, color: 'blue' },
  'application/vnd.ms-excel': { icon: FiFileText, color: 'green' },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { icon: FiFileText, color: 'green' },
  'application/vnd.ms-powerpoint': { icon: FiFileText, color: 'orange' },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': { icon: FiFileText, color: 'orange' },

  // Text
  'text/plain': { icon: FiFileText, color: 'gray' },
  'text/html': { icon: FiCode, color: 'purple' },
  'text/css': { icon: FiCode, color: 'blue' },
  'text/javascript': { icon: FiCode, color: 'yellow' },

  // Audio
  'audio/mpeg': { icon: FiMusic, color: 'purple' },
  'audio/wav': { icon: FiMusic, color: 'purple' },
  'audio/ogg': { icon: FiMusic, color: 'purple' },

  // Video
  'video/mp4': { icon: FiVideo, color: 'red' },
  'video/webm': { icon: FiVideo, color: 'red' },
  'video/ogg': { icon: FiVideo, color: 'red' },

  // Archives
  'application/zip': { icon: FiArchive, color: 'brown' },
  'application/x-rar-compressed': { icon: FiArchive, color: 'brown' },
  'application/x-7z-compressed': { icon: FiArchive, color: 'brown' },

  // Default
  'default': { icon: FiFile, color: 'gray' }
};

export default fileTypeConfig;
