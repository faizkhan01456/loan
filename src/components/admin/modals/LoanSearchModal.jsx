// components/LoanSearchModal.js
import React, { useState } from 'react';
import { 
  KeyRound, FolderOpen, Clock, AlertCircle, 
  Loader, XCircle
} from 'lucide-react';

const LoanSearchModal = ({ 
  isOpen, 
  onSearch, 
  recentSearches, 
  onRecentSearchClick, 
  searchError, 
  setSearchError,
  isSearching 
}) => {
  const [loanNumberInput, setLoanNumberInput] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(loanNumberInput);
    }
  };

  const handleSearch = () => {
    onSearch(loanNumberInput);
  };

  if (!isOpen) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <KeyRound className="text-blue-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Document Manager</h1>
            <p className="text-gray-600">
              Enter loan number to view and manage applicant & co-applicant documents
            </p>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <FolderOpen className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Enter Loan Number (e.g., LON-2024-001) or Application Number"
                value={loanNumberInput}
                onChange={(e) => {
                  setLoanNumberInput(e.target.value);
                  setSearchError('');
                }}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-32 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                disabled={isSearching}
              />
              <button
                onClick={handleSearch}
                disabled={isSearching || !loanNumberInput.trim()}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-lg font-medium transition-all ${
                  isSearching || !loanNumberInput.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <Loader className="animate-spin" size={18} />
                    <span>Searching...</span>
                  </div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
            
            {searchError && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle size={18} />
                  <span className="font-medium">{searchError}</span>
                </div>
              </div>
            )}
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((loanNum, index) => (
                  <button
                    key={index}
                    onClick={() => onRecentSearchClick(loanNum)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    <Clock size={14} />
                    <span className="font-mono">{loanNum}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Examples */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Example Loan Numbers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-mono text-sm text-blue-700 mb-1">LON-2024-001</div>
                <div className="text-xs text-gray-600">Rajesh Kumar - Home Loan</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-mono text-sm text-blue-700 mb-1">LON-2024-002</div>
                <div className="text-xs text-gray-600">Amit Sharma - Personal Loan</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-mono text-sm text-blue-700 mb-1">LON-2024-003</div>
                <div className="text-xs text-gray-600">Sunita Patel - Business Loan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            You can also search by: <span className="font-medium">Application Number</span>, <span className="font-medium">Loan ID</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanSearchModal;