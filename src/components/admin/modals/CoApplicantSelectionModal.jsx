import React from 'react';
import { X, UserPlus, Users, ChevronRight } from 'lucide-react';

const CoApplicantSelectionModal = ({
  isOpen,
  onClose,
  coApplicants = [],
  onSelect
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gradient-to-r from-purple-50 to-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Select Co-applicant</h2>
              <p className="text-sm text-gray-500">Choose co-applicant to upload documents</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-200 rounded-full transition-all"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Co-applicant List */}
        <div className="p-6">
          {coApplicants.length === 0 ? (
            <div className="text-center py-8">
              <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No co-applicants found</p>
              <p className="text-sm text-gray-400 mt-1">This application has no co-applicants</p>
            </div>
          ) : (
            <div className="space-y-3">
              {coApplicants.map((coApplicant) => (
                <button
                  key={coApplicant.id}
                  onClick={() => onSelect(coApplicant)}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-purple-100">
                      <UserPlus className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{coApplicant.name}</p>
                      {coApplicant.relation && (
                        <p className="text-xs text-gray-500">Relation: {coApplicant.relation}</p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoApplicantSelectionModal;