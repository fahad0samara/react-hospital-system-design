import React from 'react';
import PatientGrid from './PatientGrid';
import PatientTable from './PatientTable';

const PatientViews = ({
  viewMode,
  filteredPatients,
  darkMode,
  onViewDetails,
  onScheduleAppointment,
  onAddMedicalHistory,
  renderCardViewWithActions,
  renderListViewWithActions,
  renderGridViewWithActions,
  renderTableView
}) => {
  if (filteredPatients.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No patients found. Try adjusting your search or filters.
      </div>
    );
  }

  return (
    <div className={`mt-6 ${
      viewMode === 'card' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        : viewMode === 'list' 
          ? 'space-y-4'
          : viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'overflow-x-auto'
    }`}>
      {filteredPatients.map((patient) =>
        viewMode === 'card' ? (
          <div key={patient.id}>
            {renderCardViewWithActions(patient)}
          </div>
        ) : viewMode === 'list' ? (
          <div key={patient.id}>
            {renderListViewWithActions(patient)}
          </div>
        ) : viewMode === 'grid' ? (
          <div key={patient.id}>
            {renderGridViewWithActions(patient)}
          </div>
        ) : (
          renderTableView()
        )
      )}
    </div>
  );
};

export default PatientViews;
