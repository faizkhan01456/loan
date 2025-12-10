import React, { useState } from 'react';
import { 
  CreditCard, 
  Save, 
  RefreshCw, 
  Percent, 
  IndianRupee,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const LoanConfiguration = () => {
  const [loanConfig, setLoanConfig] = useState({
    // Interest Rates
    defaultInterestRate: 12.5,
    minInterestRate: 8.0,
    maxInterestRate: 24.0,
    latePaymentPenalty: 2.0,
    processingFee: 1.5,
    prepaymentCharge: 2.0,
    foreclosureCharges: 3.0,
    
    // Loan Amounts
    minLoanAmount: 5000,
    maxLoanAmount: 5000000,
    defaultLoanAmount: 100000,
    autoApprovalLimit: 100000,
    maxLoanPerCustomer: 1000000,
    
    // Tenure
    minTenure: 3,
    maxTenure: 60,
    defaultTenure: 12,
    tenureSteps: [3, 6, 12, 24, 36, 48, 60],
    
    // EMI Settings
    emiMethod: 'reducing_balance',
    emiRounding: 1,
    gracePeriodDays: 5,
    holidayProcessing: true,
    
    // Features
    prepaymentAllowed: true,
    foreclosureAllowed: true,
    topUpAllowed: true,
    loanTransferAllowed: false,
    coApplicantRequired: false,
    minCoApplicantIncome: 25000,
    
    // Risk Settings
    maxDbrRatio: 50.0,
    minIncomeRequirement: 15000,
    creditScoreMin: 650,
    employmentMinMonths: 6,
    
    // Categories
    loanCategories: [
      { name: 'Personal Loan', active: true, minAmount: 10000, maxAmount: 500000 },
      { name: 'Business Loan', active: true, minAmount: 50000, maxAmount: 5000000 },
      { name: 'Education Loan', active: true, minAmount: 50000, maxAmount: 1000000 },
      { name: 'Home Loan', active: false, minAmount: 1000000, maxAmount: 5000000 },
      { name: 'Vehicle Loan', active: true, minAmount: 50000, maxAmount: 2000000 }
    ]
  });

  const [isSaving, setIsSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState('interest');

  const handleInputChange = (field, value) => {
    setLoanConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleToggleChange = (field) => {
    setLoanConfig(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const updateLoanCategory = (index, updates) => {
    const updatedCategories = [...loanConfig.loanCategories];
    updatedCategories[index] = { ...updatedCategories[index], ...updates };
    handleInputChange('loanCategories', updatedCategories);
  };

  const saveSettings = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Loan configuration saved successfully!');
  };

  const resetForm = () => {
    setLoanConfig({
      defaultInterestRate: 12.5,
      minInterestRate: 8.0,
      maxInterestRate: 24.0,
      latePaymentPenalty: 2.0,
      processingFee: 1.5,
      prepaymentCharge: 2.0,
      foreclosureCharges: 3.0,
      minLoanAmount: 5000,
      maxLoanAmount: 5000000,
      defaultLoanAmount: 100000,
      autoApprovalLimit: 100000,
      maxLoanPerCustomer: 1000000,
      minTenure: 3,
      maxTenure: 60,
      defaultTenure: 12,
      tenureSteps: [3, 6, 12, 24, 36, 48, 60],
      emiMethod: 'reducing_balance',
      emiRounding: 1,
      gracePeriodDays: 5,
      holidayProcessing: true,
      prepaymentAllowed: true,
      foreclosureAllowed: true,
      topUpAllowed: true,
      loanTransferAllowed: false,
      coApplicantRequired: false,
      minCoApplicantIncome: 25000,
      maxDbrRatio: 50.0,
      minIncomeRequirement: 15000,
      creditScoreMin: 650,
      employmentMinMonths: 6,
      loanCategories: [
        { name: 'Personal Loan', active: true, minAmount: 10000, maxAmount: 500000 },
        { name: 'Business Loan', active: true, minAmount: 50000, maxAmount: 5000000 },
        { name: 'Education Loan', active: true, minAmount: 50000, maxAmount: 1000000 },
        { name: 'Home Loan', active: false, minAmount: 1000000, maxAmount: 5000000 },
        { name: 'Vehicle Loan', active: true, minAmount: 50000, maxAmount: 2000000 }
      ]
    });
  };

  const categories = [
    { id: 'interest', label: 'Interest & Fees', icon: Percent },
    { id: 'amount', label: 'Loan Amounts', icon: IndianRupee },
    { id: 'tenure', label: 'Tenure', icon: Calendar },
    { id: 'features', label: 'Features', icon: CheckCircle },
    { id: 'risk', label: 'Risk Settings', icon: AlertCircle },
    { id: 'loanTypes', label: 'Loan Types', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-green-600" />
                Loan Configuration
              </h1>
              <p className="text-gray-600 mt-2">
                Configure loan parameters, interest rates, and eligibility criteria
              </p>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="flex overflow-x-auto">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'border-green-600 text-green-700 bg-green-50'
                    : 'border-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            {/* Interest & Fees Section */}
            {activeCategory === 'interest' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Interest Rates & Fees</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      field: 'defaultInterestRate', 
                      label: 'Default Interest Rate (%)', 
                      icon: Percent,
                      min: 0, max: 100, step: 0.1 
                    },
                    { 
                      field: 'minInterestRate', 
                      label: 'Minimum Interest Rate (%)', 
                      icon: Percent,
                      min: 0, max: 100, step: 0.1 
                    },
                    { 
                      field: 'maxInterestRate', 
                      label: 'Maximum Interest Rate (%)', 
                      icon: Percent,
                      min: 0, max: 100, step: 0.1 
                    },
                    { 
                      field: 'latePaymentPenalty', 
                      label: 'Late Payment Penalty (%)', 
                      icon: AlertCircle,
                      min: 0, max: 100, step: 0.1 
                    },
                    { 
                      field: 'processingFee', 
                      label: 'Processing Fee (%)', 
                      icon: Percent,
                      min: 0, max: 100, step: 0.1 
                    },
                    { 
                      field: 'prepaymentCharge', 
                      label: 'Prepayment Charge (%)', 
                      icon: Percent,
                      min: 0, max: 100, step: 0.1 
                    },
                    { 
                      field: 'foreclosureCharges', 
                      label: 'Foreclosure Charges (%)', 
                      icon: Percent,
                      min: 0, max: 100, step: 0.1 
                    }
                  ].map(item => (
                    <div key={item.field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {item.label}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step={item.step}
                          min={item.min}
                          max={item.max}
                          value={loanConfig[item.field]}
                          onChange={(e) => handleInputChange(item.field, parseFloat(e.target.value))}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition pr-10"
                        />
                        <div className="absolute right-3 top-2.5 text-gray-500">
                          <item.icon className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loan Amounts Section */}
            {activeCategory === 'amount' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Loan Amount Configuration</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      field: 'minLoanAmount', 
                      label: 'Minimum Loan Amount', 
                      icon: IndianRupee 
                    },
                    { 
                      field: 'maxLoanAmount', 
                      label: 'Maximum Loan Amount', 
                      icon: IndianRupee 
                    },
                    { 
                      field: 'defaultLoanAmount', 
                      label: 'Default Loan Amount', 
                      icon: IndianRupee 
                    },
                    { 
                      field: 'autoApprovalLimit', 
                      label: 'Auto Approval Limit', 
                      icon: CheckCircle 
                    },
                    { 
                      field: 'maxLoanPerCustomer', 
                      label: 'Max Loan per Customer', 
                      icon: IndianRupee 
                    }
                  ].map(item => (
                    <div key={item.field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {item.label}
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-2.5 text-gray-500">
                          <IndianRupee className="w-5 h-5" />
                        </div>
                        <input
                          type="number"
                          min="0"
                          value={loanConfig[item.field]}
                          onChange={(e) => handleInputChange(item.field, parseInt(e.target.value))}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition pl-10"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tenure Section */}
            {activeCategory === 'tenure' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Tenure Configuration</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { field: 'minTenure', label: 'Minimum Tenure (Months)' },
                    { field: 'maxTenure', label: 'Maximum Tenure (Months)' },
                    { field: 'defaultTenure', label: 'Default Tenure (Months)' },
                    { field: 'gracePeriodDays', label: 'Grace Period (Days)' }
                  ].map(item => (
                    <div key={item.field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {item.label}
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={loanConfig[item.field]}
                        onChange={(e) => handleInputChange(item.field, parseInt(e.target.value))}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      />
                    </div>
                  ))}
                </div>

                {/* EMI Method */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EMI Calculation Method
                  </label>
                  <select
                    value={loanConfig.emiMethod}
                    onChange={(e) => handleInputChange('emiMethod', e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                  >
                    <option value="reducing_balance">Reducing Balance Method</option>
                    <option value="flat_rate">Flat Rate Method</option>
                    <option value="daily_reducing">Daily Reducing Balance</option>
                  </select>
                </div>

                {/* Tenure Steps */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Tenure Options (Months)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[3, 6, 12, 24, 36, 48, 60, 72, 84].map(month => (
                      <button
                        key={month}
                        type="button"
                        onClick={() => {
                          const steps = loanConfig.tenureSteps.includes(month)
                            ? loanConfig.tenureSteps.filter(m => m !== month)
                            : [...loanConfig.tenureSteps, month].sort((a, b) => a - b);
                          handleInputChange('tenureSteps', steps);
                        }}
                        className={`px-4 py-2 rounded-lg border ${
                          loanConfig.tenureSteps.includes(month)
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : 'bg-gray-100 text-gray-600 border-gray-300'
                        } hover:opacity-90 transition-opacity`}
                      >
                        {month} Months
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Features Section */}
            {activeCategory === 'features' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Loan Features & Options</h2>
                
                <div className="space-y-4">
                  {[
                    { field: 'prepaymentAllowed', label: 'Allow Prepayment', description: 'Enable early loan repayment' },
                    { field: 'foreclosureAllowed', label: 'Allow Foreclosure', description: 'Allow complete loan closure before term' },
                    { field: 'topUpAllowed', label: 'Allow Top-up', description: 'Enable additional loan on existing loan' },
                    { field: 'loanTransferAllowed', label: 'Allow Loan Transfer', description: 'Transfer loan to another lender' },
                    { field: 'coApplicantRequired', label: 'Require Co-Applicant', description: 'Mandatory co-applicant for high amount loans' },
                    { field: 'holidayProcessing', label: 'Holiday Processing', description: 'Process payments on holidays' }
                  ].map(item => (
                    <div key={item.field} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleChange(item.field)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          loanConfig[item.field]
                            ? 'bg-green-600 justify-end'
                            : 'bg-gray-300 justify-start'
                        } flex items-center p-1`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Co-applicant Income Requirement */}
                {loanConfig.coApplicantRequired && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Co-Applicant Monthly Income
                    </label>
                    <div className="relative w-64">
                      <div className="absolute left-3 top-2.5 text-gray-500">
                        <IndianRupee className="w-5 h-5" />
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={loanConfig.minCoApplicantIncome}
                        onChange={(e) => handleInputChange('minCoApplicantIncome', parseInt(e.target.value))}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition pl-10"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Risk Settings Section */}
            {activeCategory === 'risk' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Risk Management Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      field: 'maxDbrRatio', 
                      label: 'Max DBR Ratio (%)', 
                      description: 'Maximum Debt-to-Income ratio',
                      min: 0, max: 100, step: 0.1 
                    },
                    { 
                      field: 'minIncomeRequirement', 
                      label: 'Minimum Income (₹)', 
                      description: 'Minimum monthly income required',
                      icon: IndianRupee
                    },
                    { 
                      field: 'creditScoreMin', 
                      label: 'Minimum Credit Score', 
                      description: 'Lowest acceptable credit score',
                      min: 300, max: 900
                    },
                    { 
                      field: 'employmentMinMonths', 
                      label: 'Employment Duration (Months)', 
                      description: 'Minimum months in current job',
                      min: 0
                    }
                  ].map(item => (
                    <div key={item.field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {item.label}
                      </label>
                      <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                      <div className="relative">
                        {item.icon && (
                          <div className="absolute left-3 top-2.5 text-gray-500">
                            <IndianRupee className="w-5 h-5" />
                          </div>
                        )}
                        <input
                          type="number"
                          step={item.step || 1}
                          min={item.min || 0}
                          max={item.max}
                          value={loanConfig[item.field]}
                          onChange={(e) => handleInputChange(
                            item.field, 
                            item.field === 'maxDbrRatio' ? parseFloat(e.target.value) : parseInt(e.target.value)
                          )}
                          className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition ${
                            item.icon ? 'pl-10' : ''
                          }`}
                        />
                        {!item.icon && item.field === 'maxDbrRatio' && (
                          <div className="absolute right-3 top-2.5 text-gray-500">
                            <Percent className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loan Types Section */}
            {activeCategory === 'loanTypes' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Loan Types & Categories</h2>
                <p className="text-gray-600">Configure different loan products offered</p>
                
                <div className="space-y-4">
                  {loanConfig.loanCategories.map((category, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-gray-500" />
                          <h3 className="font-medium text-gray-900">{category.name}</h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateLoanCategory(index, { active: !category.active })}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            category.active
                              ? 'bg-green-600 justify-end'
                              : 'bg-gray-300 justify-start'
                          } flex items-center p-1`}
                        >
                          <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </button>
                      </div>
                      
                      {category.active && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Minimum Amount (₹)
                            </label>
                            <div className="relative">
                              <div className="absolute left-3 top-2.5 text-gray-500">
                                <IndianRupee className="w-5 h-5" />
                              </div>
                              <input
                                type="number"
                                min="0"
                                value={category.minAmount}
                                onChange={(e) => updateLoanCategory(index, { minAmount: parseInt(e.target.value) })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition pl-10"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Maximum Amount (₹)
                            </label>
                            <div className="relative">
                              <div className="absolute left-3 top-2.5 text-gray-500">
                                <IndianRupee className="w-5 h-5" />
                              </div>
                              <input
                                type="number"
                                min="0"
                                value={category.maxAmount}
                                onChange={(e) => updateLoanCategory(index, { maxAmount: parseInt(e.target.value) })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition pl-10"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    const newCategory = {
                      name: 'New Loan Type',
                      active: true,
                      minAmount: 10000,
                      maxAmount: 100000
                    };
                    handleInputChange('loanCategories', [...loanConfig.loanCategories, newCategory]);
                  }}
                  className="px-4 py-2 border border-dashed border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  + Add New Loan Type
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Loan Configuration</p>
                <p className="text-sm text-gray-600">Click save to update all loan settings</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={saveSettings}
                  disabled={isSaving}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors ${
                    isSaving
                      ? 'bg-green-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Configuration
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanConfiguration;