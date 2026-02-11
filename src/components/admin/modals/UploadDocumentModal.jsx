import React, { useState } from "react";
import { Upload, X, File, Plus, CheckCircle, AlertCircle } from "lucide-react";

const UploadDocumentModal = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [documentType, setDocumentType] = useState("");
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  // Document type configuration
 const documentTypes = [
  {
    id: "AADHAAR",
    label: "Aadhaar Card",
    requiresBoth: false, // backend single file
    accept: ".jpg,.jpeg,.png,.pdf",
    maxSize: 5 * 1024 * 1024
  },
  {
    id: "PAN",
    label: "PAN Card",
    requiresBoth: false,
    accept: ".jpg,.jpeg,.png,.pdf",
    maxSize: 2 * 1024 * 1024
  },
  {
    id: "SALARY_SLIP",
    label: "Salary Slip",
    requiresBoth: false,
    accept: ".pdf,.jpg,.jpeg,.png",
    maxSize: 5 * 1024 * 1024
  },
  {
    id: "BANK_STATEMENT",
    label: "Bank Statement",
    requiresBoth: false,
    accept: ".pdf",
    maxSize: 10 * 1024 * 1024
  },
  {
    id: "PHOTO",
    label: "Photo",
    requiresBoth: false,
    accept: ".jpg,.jpeg,.png",
    maxSize: 1 * 1024 * 1024
  }
];


  const selectedDocType = documentTypes.find(d => d.id === documentType);

  // Handle file selection
 const handleFileSelect = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  if (file.size > selectedDocType.maxSize) {
    alert("File too large");
    return;
  }

  setFiles([file]); // single file
};


  // Remove file
  const removeFile = (fileId) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  // Simulate upload progress
  const simulateUpload = () => {
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        files.forEach(file => {
          if (!newProgress[file.id]) {
            newProgress[file.id] = 0;
          }
          if (newProgress[file.id] < 100) {
            newProgress[file.id] = Math.min(newProgress[file.id] + 10, 100);
          }
        });
        return newProgress;
      });
    }, 200);

    setTimeout(() => clearInterval(interval), 2000);
  };

  // Handle submit
const handleSubmit = () => {
  if (!documentType) {
    alert("Select document type");
    return;
  }

  if (files.length === 0) {
    alert("Select file");
    return;
  }

  onSubmit({
    documentType,
    file: files[0]
  });
};



  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Upload Documents
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: PDF, JPG, PNG, JPEG (Max size varies by document type)
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Document Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Document Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {documentTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    setDocumentType(type.id);
                    setFiles([]);
                    setErrors({});
                  }}
                  className={`p-4 border rounded-xl text-left transition-all ${
                    documentType === type.id
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{type.label}</p>
                      <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                      {type.requiresBoth && (
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mt-2">
                          Front & Back Required
                        </span>
                      )}
                    </div>
                    {documentType === type.id && (
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* File Upload Area */}
          {selectedDocType && (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
  <input
    type="file"
    onChange={handleFileSelect}
    accept={selectedDocType.accept}
  />
</div>

          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!documentType || files.length === 0}
              className={`flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg transition-colors ${
                !documentType || files.length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-700'
              }`}
            >
              <Upload size={18} />
              Upload {files.length > 1 ? `${files.length} Documents` : 'Document'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;