import { FiFile, FiImage, FiFileText } from 'react-icons/fi';
import { SiMicrosoftexcel } from 'react-icons/si';
import { AiFillFilePdf } from 'react-icons/ai';

export const allowedFileTypes = {
  'application/pdf': {
    icon: AiFillFilePdf,
    color: 'text-red-500',
    name: 'PDF'
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    icon: SiMicrosoftexcel,
    color: 'text-green-600',
    name: 'Excel'
  },
  'application/vnd.ms-excel': {
    icon: SiMicrosoftexcel,
    color: 'text-green-600',
    name: 'Excel'
  },
  'text/csv': {
    icon: FiFileText,
    color: 'text-blue-500',
    name: 'CSV'
  },
  'image/jpeg': {
    icon: FiImage,
    color: 'text-purple-500',
    name: 'Image'
  },
  'image/png': {
    icon: FiImage,
    color: 'text-purple-500',
    name: 'Image'
  },
  'image/gif': {
    icon: FiImage,
    color: 'text-purple-500',
    name: 'Image'
  },
  'application/vnd.oasis.opendocument.text': {
    icon: FiFileText,
    color: 'text-blue-500',
    name: 'ODF'
  }
};

export const extensionMap = {
  'csv': 'text/csv',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'xls': 'application/vnd.ms-excel',
  'pdf': 'application/pdf',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif',
  'odt': 'application/vnd.oasis.opendocument.text'
};

export const getFileTypeInfo = (fileType) => {
  return allowedFileTypes[fileType] || {
    icon: FiFile,
    color: 'text-gray-500',
    name: 'Unknown'
  };
};
