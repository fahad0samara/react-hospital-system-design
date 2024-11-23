import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import DocumentHeader from './components/DocumentHeader';
import DocumentFilters from './components/DocumentFilters';
import DocumentList from './components/DocumentList';
import DocumentReport from './components/DocumentReport';
import FileUploadModal from './FileUploadModal';
import ErrorBoundary from '../../components/ErrorBoundary';

const INITIAL_FILTER_CONFIG = {
  searchTerm: '',
  priority: 'all',
  tags: [],
  dateRange: {
    start: null,
    end: null
  },
  sortBy: 'date', // 'date', 'name', 'priority'
  sortOrder: 'desc' // 'asc', 'desc'
};

const Documents = () => {
  const { darkMode } = useTheme();
  const [documents, setDocuments] = useLocalStorage('hospital-documents', []);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [filterConfig, setFilterConfig] = useState(INITIAL_FILTER_CONFIG);
  const [isLoading, setIsLoading] = useState(false);

  // Memoized available tags
  const availableTags = useMemo(() => 
    [...new Set(documents.flatMap(doc => doc.tags || []))],
    [documents]
  );

  // Document management handlers
  const handleUpload = useCallback((newDocument) => {
    setDocuments(prevDocs => [...prevDocs, { 
      ...newDocument, 
      uploadDate: new Date().toISOString() 
    }]);
    setShowUploadModal(false);
  }, [setDocuments]);

  const handleDelete = useCallback((documentToDelete) => {
    setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== documentToDelete.id));
  }, [setDocuments]);

  const handleUpdateDocument = useCallback((updatedDoc) => {
    setDocuments(prevDocs => 
      prevDocs.map(doc => doc.id === updatedDoc.id ? updatedDoc : doc)
    );
  }, [setDocuments]);

  // Memoized filtered and sorted documents
  const processedDocuments = useMemo(() => {
    let filtered = documents.filter(doc => {
      // Search term filter
      if (filterConfig.searchTerm) {
        const searchLower = filterConfig.searchTerm.toLowerCase();
        const matchesName = doc.name?.toLowerCase().includes(searchLower);
        const matchesDescription = doc.description?.toLowerCase().includes(searchLower);
        const matchesTags = doc.tags?.some(tag => tag.toLowerCase().includes(searchLower));
        if (!matchesName && !matchesDescription && !matchesTags) {
          return false;
        }
      }

      // Priority filter
      if (filterConfig.priority !== 'all' && doc.priority !== filterConfig.priority) {
        return false;
      }

      // Tags filter
      if (filterConfig.tags.length > 0 && !filterConfig.tags.some(tag => doc.tags?.includes(tag))) {
        return false;
      }

      // Date range filter
      if (filterConfig.dateRange.start && filterConfig.dateRange.end) {
        const docDate = new Date(doc.uploadDate);
        const startDate = new Date(filterConfig.dateRange.start);
        const endDate = new Date(filterConfig.dateRange.end);
        if (docDate < startDate || docDate > endDate) {
          return false;
        }
      }

      return true;
    });

    // Sort documents
    filtered.sort((a, b) => {
      const order = filterConfig.sortOrder === 'asc' ? 1 : -1;
      
      switch (filterConfig.sortBy) {
        case 'name':
          return order * (a.name || '').localeCompare(b.name || '');
        case 'priority': {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return order * (priorityOrder[b.priority] - priorityOrder[a.priority]);
        }
        case 'date':
        default:
          return order * (new Date(b.uploadDate) - new Date(a.uploadDate));
      }
    });

    return filtered;
  }, [documents, filterConfig]);

  // Filter management
  const handleFilterChange = useCallback((updates) => {
    setFilterConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilterConfig(INITIAL_FILTER_CONFIG);
  }, []);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        {showReport ? (
          <DocumentReport 
            documents={documents}
            onBack={() => setShowReport(false)}
          />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <DocumentHeader 
              onUploadClick={() => setShowUploadModal(true)}
              onReportClick={() => setShowReport(true)}
              documentCount={documents.length}
            />
            
            <DocumentFilters
              filterConfig={filterConfig}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              availableTags={availableTags}
            />

            <DocumentList
              documents={processedDocuments}
              onDelete={handleDelete}
              onUpdate={handleUpdateDocument}
              isLoading={isLoading}
            />

            {showUploadModal && (
              <FileUploadModal
                onClose={() => setShowUploadModal(false)}
                onUpload={handleUpload}
              />
            )}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

// PropTypes for child components
DocumentHeader.propTypes = {
  onUploadClick: PropTypes.func.isRequired,
  onReportClick: PropTypes.func.isRequired,
  documentCount: PropTypes.number.isRequired
};

DocumentFilters.propTypes = {
  filterConfig: PropTypes.shape({
    searchTerm: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    dateRange: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string
    }).isRequired,
    sortBy: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired,
  availableTags: PropTypes.arrayOf(PropTypes.string).isRequired
};

DocumentList.propTypes = {
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      uploadDate: PropTypes.string.isRequired,
      priority: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default Documents;
