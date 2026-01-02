// components/admin/EMIVoucherModal.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Clock,
  Repeat,
  AlertCircle,
  XCircle,
  CheckCircle,
  FileText,
  DollarSign,
  Percent,
  Hash
} from 'lucide-react';

// Mock loan database (replace with API call later)
const mockLoansDB = [
  {
    loanNumber: 'LN-2024-001',
    customerName: 'Rahul Sharma',
    loanAmount: 320000,
    tenure: 24,
    interestRate: '10.5%',
    emiAmount: 15000,
    planName: 'Personal Loan EMI',
    loanStatus: 'Active',
    approvedDate: '2024-01-15'
  },
  {
    loanNumber: 'LN-2024-002',
    customerName: 'Priya Patel',
    loanAmount: 8500000,
    tenure: 240,
    interestRate: '8.75%',
    emiAmount: 42000,
    planName: 'Home Loan EMI',
    loanStatus: 'Active',
    approvedDate: '2024-01-16'
  },
  {
    loanNumber: 'LN-2024-003',
    customerName: 'Amit Kumar',
    loanAmount: 900000,
    tenure: 60,
    interestRate: '9.25%',
    emiAmount: 16500,
    planName: 'Car Loan EMI',
    loanStatus: 'Active',
    approvedDate: '2024-01-17'
  },
  {
    loanNumber: 'LN-2024-004',
    customerName: 'Sneha Gupta',
    loanAmount: 700000,
    tenure: 36,
    interestRate: '11.2%',
    emiAmount: 22000,
    planName: 'Personal Loan EMI',
    loanStatus: 'Active',
    approvedDate: '2024-01-18'
  },
  {
    loanNumber: 'LN-2024-005',
    customerName: 'Rajesh Nair',
    loanAmount: 1500000,
    tenure: 48,
    interestRate: '12.5%',
    emiAmount: 35000,
    planName: 'Business Loan EMI',
    loanStatus: 'Active',
    approvedDate: '2024-01-19'
  }
];

const EmiForm = ({ 
  isOpen, 
  onClose, 
  mode = 'add', 
  emiVoucher, 
  onEmiVoucherChange,
  emiPlans,
  calculateEmiPreview,
  formatCurrency = (amount) => `₹${amount?.toLocaleString() || '0'}`,
  formatDate,
  onSave
}) => {
  const [loanValidation, setLoanValidation] = useState({
    status: 'idle', // 'idle', 'validating', 'valid', 'invalid'
    message: ''
  });

  const [isLoanDetailsFetched, setIsLoanDetailsFetched] = useState(false);

  // Initialize form with empty values
  useEffect(() => {
    if (isOpen && mode === 'add') {
      // Reset form when opening in add mode
      onEmiVoucherChange('loanNumber', '');
      onEmiVoucherChange('customerName', '');
      onEmiVoucherChange('planName', '');
      onEmiVoucherChange('amount', '');
      onEmiVoucherChange('tenure', '');
      onEmiVoucherChange('interestRate', '');
      onEmiVoucherChange('loanAmount', '');
      onEmiVoucherChange('startDate', '');
      onEmiVoucherChange('emiTime', '');
      onEmiVoucherChange('frequency', 'monthly');
      setLoanValidation({ status: 'idle', message: '' });
      setIsLoanDetailsFetched(false);
    }
  }, [isOpen]);

  // Handle loan number validation and auto-fill
  const handleLoanNumberChange = async (loanNumber) => {
    onEmiVoucherChange('loanNumber', loanNumber);
    
    if (!loanNumber.trim()) {
      setLoanValidation({ status: 'idle', message: '' });
      setIsLoanDetailsFetched(false);
      return;
    }

    setLoanValidation({ status: 'validating', message: 'Validating loan number...' });

    // Simulate API call delay
    setTimeout(() => {
      const foundLoan = mockLoansDB.find(
        loan => loan.loanNumber.toLowerCase() === loanNumber.trim().toLowerCase()
      );

      if (foundLoan) {
        // Auto-fill loan details
        
        onEmiVoucherChange({
  customerName: foundLoan.customerName,
  planName: foundLoan.planName,
  amount: foundLoan.emiAmount,
  tenure: foundLoan.tenure,
  interestRate: foundLoan.interestRate,
  loanAmount: foundLoan.loanAmount,
});

        setLoanValidation({ 
          status: 'valid', 
          message: `Loan details fetched successfully! (${foundLoan.planName})` 
        });
        setIsLoanDetailsFetched(true);
      } else {
        // Clear all fields if invalid loan number
        onEmiVoucherChange('customerName', '');
        onEmiVoucherChange('planName', '');
        onEmiVoucherChange('amount', '');
        onEmiVoucherChange('tenure', '');
        onEmiVoucherChange('interestRate', '');
        onEmiVoucherChange('loanAmount', '');
        
        setLoanValidation({ 
          status: 'invalid', 
          message: 'Invalid loan number. Please enter a valid loan number from the approved loans list.' 
        });
        setIsLoanDetailsFetched(false);
      }
    }, 500);
  };

  // Format date for preview
  const formatPreviewDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate EMI preview message
  const getEmiPreview = () => {
    if (!emiVoucher.startDate || !emiVoucher.emiTime) return '';
    
    const formattedDate = formatPreviewDate(emiVoucher.startDate);
    const time = emiVoucher.emiTime || '';
    
    return `EMI of ${formatCurrency(emiVoucher.amount)} will be debited on ${formattedDate} at ${time} ${emiVoucher.frequency ? `(${emiVoucher.frequency})` : ''}`;
  };

  // Check if form is valid for submission
  const isFormValid = () => {
    return (
      isLoanDetailsFetched &&
      emiVoucher.startDate &&
      emiVoucher.emiTime &&
      emiVoucher.customerName &&
      emiVoucher.amount
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-blue-600">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {mode === 'add' ? 'Generate EMI from Loan' : 'Edit EMI Voucher'}
            </h3>
            <p className="text-sm text-white mt-1">
              Create EMI schedule based on existing loan
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <XCircle className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-8">
            {/* LOAN NUMBER INPUT */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-blue-600" />
                Loan Identification
              </h4>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Number *
                  <span className="text-xs text-gray-500 ml-2">
                    Enter approved loan number to fetch details
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={emiVoucher.loanNumber || ''}
                    onChange={(e) => handleLoanNumberChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                    placeholder="Enter loan number (e.g., LN-2024-001)"
                    disabled={mode === 'edit'} // Disable in edit mode
                  />
                  {loanValidation.status === 'validating' && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    </div>
                  )}
                  {loanValidation.status === 'valid' && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" />
                  )}
                </div>
                
                {/* Validation Messages */}
                {loanValidation.message && (
                  <div className={`mt-2 p-3 rounded-lg text-sm ${
                    loanValidation.status === 'valid' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : loanValidation.status === 'invalid'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    <div className="flex items-start gap-2">
                      {loanValidation.status === 'valid' ? (
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      <span>{loanValidation.message}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Loan Information Card (Read-only) */}
              {isLoanDetailsFetched && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                  <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Loan Details (Auto-filled)
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Customer</p>
                      <p className="font-medium text-gray-800">{emiVoucher.customerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Loan Amount</p>
                      <p className="font-medium text-gray-800">{formatCurrency(emiVoucher.loanAmount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Tenure</p>
                      <p className="font-medium text-gray-800">{emiVoucher.tenure} months</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Interest Rate</p>
                      <p className="font-medium text-gray-800">{emiVoucher.interestRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">EMI Amount</p>
                      <p className="font-medium text-blue-600">{formatCurrency(emiVoucher.amount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Plan</p>
                      <p className="font-medium text-gray-800">{emiVoucher.planName}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* EMI SCHEDULE SETTINGS (Editable Fields) */}
            {isLoanDetailsFetched && (
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  EMI Schedule Settings
                </h4>
                
                {/* EMI Preview */}
                {(emiVoucher.startDate || emiVoucher.emiTime) && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">EMI Schedule Preview</p>
                        <p className="text-sm text-blue-600 mt-1">
                          {getEmiPreview()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* EMI Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EMI Start Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={emiVoucher.startDate || ''}
                        onChange={(e) => onEmiVoucherChange('startDate', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min={new Date().toISOString().split('T')[0]} // Today or future
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      First EMI payment date
                    </p>
                  </div>

                  {/* EMI Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exact EMI Time (HH:MM) *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="time"
                        value={emiVoucher.emiTime || ''}
                        onChange={(e) => onEmiVoucherChange('emiTime', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Time when EMI will be debited
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Frequency *
                  </label>
                  <select
                    value={emiVoucher.frequency || 'monthly'}
                    onChange={(e) => onEmiVoucherChange('frequency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="halfYearly">Half-Yearly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    How often EMI payments will occur
                  </p>
                </div>
              </div>
            )}

            {/* READ-ONLY LOAN DETAILS (Conditional) */}
            {isLoanDetailsFetched && (
              <div className="mt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Loan Details (Read-only)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Name (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={emiVoucher.customerName || ''}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                      />
                    </div>
                  </div>

                  {/* EMI Plan (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EMI Plan Type
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={emiVoucher.planName || ''}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                      />
                    </div>
                  </div>

                  {/* EMI Amount (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EMI Amount
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={formatCurrency(emiVoucher.amount || 0)}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                      />
                    </div>
                  </div>

                  {/* Loan Amount (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Loan Amount
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={formatCurrency(emiVoucher.loanAmount || 0)}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                      />
                    </div>
                  </div>

                  {/* Tenure (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tenure (Months)
                    </label>
                    <input
                      type="text"
                      value={emiVoucher.tenure || ''}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                    />
                  </div>

                  {/* Interest Rate (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate
                    </label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={emiVoucher.interestRate || ''}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Validation Message */}
            {!isFormValid() && mode === 'add' && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Action Required</p>
                    <p className="text-sm text-yellow-600 mt-1">
                      {!isLoanDetailsFetched 
                        ? 'Please enter a valid loan number to fetch loan details.'
                        : 'Please select EMI Start Date and Time to proceed.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="text-sm text-gray-500">
            {mode === 'add' && isLoanDetailsFetched && (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Loan validated. Configure EMI schedule to proceed.</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={!isFormValid()}
              className={`px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all ${
                !isFormValid()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
              }`}
            >
              {mode === 'add' ? 'Generate EMI Schedule' : 'Update EMI Schedule'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiForm;