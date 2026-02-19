// components/DocumentPreviewDrawer.js
import React, { useState } from 'react';
import { 
  FileText, Eye, Download, CheckCircle, 
  XCircle, AlertCircle, Calendar, User,
  XCircle as XIcon
} from 'lucide-react';

const DocumentPreviewDrawer = ({ 
  isOpen, 
  onClose, 
  selectedDocument, 
  userRole,
  onVerify,
  onReject
}) => {
  const [officerRemarks, setOfficerRemarks] = useState('');
  
  const canVerify = userRole === 'EMPLOYEE' || userRole === 'BRANCH_ADMIN' || userRole === 'SUPER_ADMIN';

  const handleVerify = () => {
    if (selectedDocument) {
      onVerify(selectedDocument.id, officerRemarks);
      setOfficerRemarks('');
      onClose();
    }
  };

  const handleReject = () => {
    const reason = prompt('Please enter rejection reason:');
    if (reason && reason.trim() && selectedDocument) {
      onReject(selectedDocument.id, reason);
      setOfficerRemarks('');
      onClose();
    }
  };

  if (!isOpen || !selectedDocument) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full md:w-2/3 lg:w-1/2 bg-white shadow-xl">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Document Preview</h2>
              <p className="text-sm text-gray-500">
                {selectedDocument.applicantName} - {selectedDocument.name}
              </p>
              <p className="text-xs text-gray-400">Loan: {selectedDocument.loanNumber}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XIcon size={20} className="text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Document Preview */}
            <div className="mb-8">
              <div className="bg-gray-100 rounded-xl p-8 text-center mb-4">
                <FileText className="mx-auto text-gray-400 mb-4" size={64} />
                <p className="text-gray-700 font-medium">{selectedDocument.name}</p>
                <p className="text-sm text-gray-500 mt-1">{selectedDocument.fileType} • {selectedDocument.uploadDate}</p>
              </div>
              
              <div className="flex gap-4 justify-center">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  <Eye size={18} />
                  View Full Document
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors">
                  <Download size={18} />
                  Download
                </button>
              </div>
            </div>
            
            {/* Document Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Applicant</p>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      selectedDocument.applicantType === 'APPLICANT' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {selectedDocument.applicantType === 'APPLICANT' ? 'Primary' : 'Co-applicant'}
                    </span>
                    <p className="font-medium text-gray-900">{selectedDocument.applicantName}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedDocument.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' :
                    selectedDocument.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                    selectedDocument.status === 'REJECTED' ? 'bg-rose-100 text-rose-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {selectedDocument.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Uploaded By</p>
                  <p className="font-medium text-gray-900">{selectedDocument.uploadedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Upload Date</p>
                  <p className="font-medium text-gray-900">{selectedDocument.uploadDate}</p>
                </div>
              </div>
              
              {/* Verification Details */}
              {selectedDocument.verifiedBy && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Verification Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Verified By</p>
                      <p className="font-medium text-gray-900">{selectedDocument.verifiedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Verified Date</p>
                      <p className="font-medium text-gray-900">{selectedDocument.verifiedAt}</p>
                    </div>
                    {selectedDocument.remarks && (
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500 mb-1">Remarks</p>
                        <p className="font-medium text-gray-900">{selectedDocument.remarks}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Rejection Reason */}
              {selectedDocument.rejectionReason && (
                <div className="bg-rose-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Rejection Reason</h4>
                  <p className="text-gray-700">{selectedDocument.rejectionReason}</p>
                </div>
              )}
              
              {/* Officer Actions */}
              {canVerify && selectedDocument.status === 'PENDING' && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Officer Actions</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Remarks (Optional)
                      </label>
                      <textarea
                        value={officerRemarks}
                        onChange={(e) => setOfficerRemarks(e.target.value)}
                        rows={3}
                        placeholder="Add verification remarks..."
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <button
                        onClick={handleVerify}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                      >
                        <CheckCircle size={18} />
                        Verify Document
                      </button>
                      <button
                        onClick={handleReject}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg transition-colors"
                      >
                        <XCircle size={18} />
                        Reject Document
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewDrawer;