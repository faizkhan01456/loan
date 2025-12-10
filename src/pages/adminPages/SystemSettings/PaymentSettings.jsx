import React, { useState } from 'react';
import { 
  Wallet, 
  Save, 
  RefreshCw, 
  Banknote, 
  CreditCard, 
  Smartphone,
  Mail,
  Percent,
  IndianRupee,
  Clock,
  Building,
  QrCode,
  Shield
} from 'lucide-react';

const PaymentSettings = () => {
  const [paymentSettings, setPaymentSettings] = useState({
    // Currency & Tax
    currency: 'INR',
    currencySymbol: '₹',
    taxRate: 18.0,
    gstInclusive: true,
    tdsDeduction: 10.0,
    serviceTax: 0.0,
    
    // Bank Details
    bankName: 'State Bank of India',
    accountNumber: '123456789012',
    accountHolderName: 'Quick Loan Finance Ltd.',
    accountType: 'current',
    ifscCode: 'SBIN0001234',
    branchName: 'Sector 18, Noida',
    bankAddress: 'Sector 18, Noida, Uttar Pradesh - 201301',
    
    // Digital Payments
    upiId: 'quickloan@sbi',
    qrCode: null,
    merchantId: 'MERCHANT123',
    paymentGateway: 'razorpay',
    
    // Payment Modes
    paymentModes: ['upi', 'netbanking', 'credit_card', 'debit_card', 'cash', 'cheque'],
    activePaymentModes: ['upi', 'netbanking', 'credit_card', 'debit_card'],
    
    // Processing Settings
    autoPaymentProcessing: true,
    manualApprovalRequired: false,
    paymentCutoffTime: '18:00',
    processingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    holidayProcessing: false,
    
    // Transaction Limits
    minTransactionAmount: 100,
    maxTransactionAmount: 500000,
    dailyTransactionLimit: 1000000,
    monthlyTransactionLimit: 5000000,
    
    // Fees & Charges
    transactionFee: 0.5,
    gatewayFee: 2.0,
    latePaymentFee: 50,
    chequeBounceCharge: 500,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleInputChange = (field, value) => {
    setPaymentSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleToggleChange = (field) => {
    setPaymentSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Payment settings saved successfully!');
  };

  const resetForm = () => {
    setPaymentSettings({
      currency: 'INR',
      currencySymbol: '₹',
      taxRate: 18.0,
      gstInclusive: true,
      tdsDeduction: 10.0,
      serviceTax: 0.0,
      bankName: 'State Bank of India',
      accountNumber: '123456789012',
      accountHolderName: 'Quick Loan Finance Ltd.',
      accountType: 'current',
      ifscCode: 'SBIN0001234',
      branchName: 'Sector 18, Noida',
      bankAddress: 'Sector 18, Noida, Uttar Pradesh - 201301',
      upiId: 'quickloan@sbi',
      qrCode: null,
      merchantId: 'MERCHANT123',
      paymentGateway: 'razorpay',
      paymentModes: ['upi', 'netbanking', 'credit_card', 'debit_card', 'cash', 'cheque'],
      activePaymentModes: ['upi', 'netbanking', 'credit_card', 'debit_card'],
      autoPaymentProcessing: true,
      manualApprovalRequired: false,
      paymentCutoffTime: '18:00',
      processingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      holidayProcessing: false,
      minTransactionAmount: 100,
      maxTransactionAmount: 500000,
      dailyTransactionLimit: 1000000,
      monthlyTransactionLimit: 5000000,
      transactionFee: 0.5,
      gatewayFee: 2.0,
      latePaymentFee: 50,
      chequeBounceCharge: 500,
    });
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Wallet },
    { id: 'bank', label: 'Bank Details', icon: Building },
    { id: 'digital', label: 'Digital Payments', icon: Smartphone },
    { id: 'modes', label: 'Payment Modes', icon: CreditCard },
    { id: 'processing', label: 'Processing', icon: Clock },
    { id: 'limits', label: 'Limits', icon: Shield },
    { id: 'fees', label: 'Fees & Charges', icon: Percent },
  ];

  const paymentModeConfig = [
    { id: 'upi', label: 'UPI', icon: Smartphone, bgColor: 'bg-purple-100', textColor: 'text-purple-800', borderColor: 'border-purple-300' },
    { id: 'netbanking', label: 'Net Banking', icon: Building, bgColor: 'bg-blue-100', textColor: 'text-blue-800', borderColor: 'border-blue-300' },
    { id: 'credit_card', label: 'Credit Card', icon: CreditCard, bgColor: 'bg-green-100', textColor: 'text-green-800', borderColor: 'border-green-300' },
    { id: 'debit_card', label: 'Debit Card', icon: CreditCard, bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', borderColor: 'border-yellow-300' },
    { id: 'cash', label: 'Cash', icon: Banknote, bgColor: 'bg-gray-100', textColor: 'text-gray-800', borderColor: 'border-gray-300' },
    { id: 'cheque', label: 'Cheque', icon: Wallet, bgColor: 'bg-red-100', textColor: 'text-red-800', borderColor: 'border-red-300' }
  ];

  const daysConfig = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-md">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Payment Settings
                </h1>
                <p className="text-gray-600 mt-1">
                  Configure payment gateways, bank details, and transaction settings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-700 bg-purple-50 font-semibold'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-purple-600' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 md:p-8">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-8">
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Wallet className="w-6 h-6 text-purple-600" />
                    </div>
                    General Payment Settings
                  </h2>
                  <p className="text-gray-600 mt-2">Configure basic payment preferences and tax settings</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Currency */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Currency
                    </label>
                    <div className="relative">
                      <select
                        value={paymentSettings.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value)}
                        className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:border-gray-400 appearance-none bg-white"
                      >
                        <option value="INR">Indian Rupee (₹)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">British Pound (£)</option>
                        <option value="AED">UAE Dirham (د.إ)</option>
                      </select>
                      <div className="absolute right-4 top-3.5 pointer-events-none">
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tax Rate */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Tax Rate (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={paymentSettings.taxRate}
                        onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value))}
                        className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:border-gray-400 pr-12"
                      />
                      <div className="absolute right-4 top-3.5 text-gray-500">
                        <Percent className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  {/* TDS Deduction */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      TDS Deduction (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="30"
                        value={paymentSettings.tdsDeduction}
                        onChange={(e) => handleInputChange('tdsDeduction', parseFloat(e.target.value))}
                        className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:border-gray-400 pr-12"
                      />
                      <div className="absolute right-4 top-3.5 text-gray-500">
                        <Percent className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* GST Inclusive Toggle */}
                <div className="bg-gradient-to-r from-purple-50 to-white p-5 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Percent className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">GST Inclusive Pricing</p>
                        <p className="text-sm text-gray-600">Include GST in all displayed prices</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleChange('gstInclusive')}
                      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
                        paymentSettings.gstInclusive
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                          : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                          paymentSettings.gstInclusive ? 'translate-x-8' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Details */}
            {activeTab === 'bank' && (
              <div className="space-y-8">
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building className="w-6 h-6 text-blue-600" />
                    </div>
                    Bank Account Details
                  </h2>
                  <p className="text-gray-600 mt-2">Manage your company's banking information</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { field: 'bankName', label: 'Bank Name', required: true },
                    { field: 'accountHolderName', label: 'Account Holder Name', required: true },
                    { field: 'accountNumber', label: 'Account Number', required: true },
                    { field: 'ifscCode', label: 'IFSC Code', required: true },
                    { field: 'branchName', label: 'Branch Name', required: true },
                    { 
                      field: 'accountType', 
                      label: 'Account Type', 
                      type: 'select', 
                      options: ['current', 'savings', 'overdraft'],
                      required: true 
                    }
                  ].map(item => (
                    <div key={item.field} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {item.label} {item.required && <span className="text-red-500">*</span>}
                      </label>
                      {item.type === 'select' ? (
                        <select
                          value={paymentSettings[item.field]}
                          onChange={(e) => handleInputChange(item.field, e.target.value)}
                          className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400 appearance-none bg-white"
                        >
                          {item.options.map(option => (
                            <option key={option} value={option}>
                              {option.charAt(0).toUpperCase() + option.slice(1)} Account
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={paymentSettings[item.field]}
                          onChange={(e) => handleInputChange(item.field, e.target.value)}
                          className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Bank Address */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Bank Address
                  </label>
                  <textarea
                    value={paymentSettings.bankAddress}
                    onChange={(e) => handleInputChange('bankAddress', e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
                    placeholder="Enter complete bank branch address"
                  />
                </div>
              </div>
            )}

            {/* Digital Payments */}
            {activeTab === 'digital' && (
              <div className="space-y-8">
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Smartphone className="w-6 h-6 text-green-600" />
                    </div>
                    Digital Payment Settings
                  </h2>
                  <p className="text-gray-600 mt-2">Configure digital payment methods and gateways</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      UPI ID
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Smartphone className="w-5 h-5 text-green-600" />
                      </div>
                      <input
                        type="text"
                        value={paymentSettings.upiId}
                        onChange={(e) => handleInputChange('upiId', e.target.value)}
                        className="flex-1 px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all hover:border-gray-400"
                        placeholder="yourname@bank"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Merchant ID
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.merchantId}
                      onChange={(e) => handleInputChange('merchantId', e.target.value)}
                      className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all hover:border-gray-400"
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Gateway
                    </label>
                    <select
                      value={paymentSettings.paymentGateway}
                      onChange={(e) => handleInputChange('paymentGateway', e.target.value)}
                      className="w-full md:w-1/2 px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all hover:border-gray-400 appearance-none bg-white"
                    >
                      <option value="razorpay">Razorpay</option>
                      <option value="paytm">Paytm</option>
                      <option value="cashfree">Cashfree</option>
                      <option value="instamojo">Instamojo</option>
                      <option value="ccavenue">CCAvenue</option>
                      <option value="paypal">PayPal</option>
                      <option value="stripe">Stripe</option>
                    </select>
                  </div>
                </div>
                
                {/* QR Code Upload */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    QR Code Image
                  </label>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8 p-6 bg-gradient-to-r from-green-50 to-white rounded-2xl border border-green-200">
                    <div className="flex flex-col items-center">
                      <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center bg-white shadow-sm">
                        {paymentSettings.qrCode ? (
                          <img src={paymentSettings.qrCode} alt="QR Code" className="w-full h-full object-contain p-6" />
                        ) : (
                          <div className="text-center">
                            <QrCode className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                            <p className="text-sm text-gray-500">No QR Code Uploaded</p>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex gap-3">
                        <label className="cursor-pointer">
                          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg">
                            <Mail className="w-4 h-4" />
                            Upload QR Code
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files[0]) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  handleInputChange('qrCode', reader.result);
                                };
                                reader.readAsDataURL(e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                        {paymentSettings.qrCode && (
                          <button
                            onClick={() => handleInputChange('qrCode', null)}
                            className="px-5 py-2.5 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">QR Code Specifications</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>PNG or JPG format</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Maximum file size: 2MB</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Square image recommended</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Minimum resolution: 500x500px</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Modes */}
            {activeTab === 'modes' && (
              <div className="space-y-8">
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <CreditCard className="w-6 h-6 text-yellow-600" />
                    </div>
                    Payment Modes Configuration
                  </h2>
                  <p className="text-gray-600 mt-2">Enable or disable payment methods for customers</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paymentModeConfig.map(mode => {
                    const isActive = paymentSettings.activePaymentModes.includes(mode.id);
                    return (
                      <div
                        key={mode.id}
                        onClick={() => {
                          const modes = isActive
                            ? paymentSettings.activePaymentModes.filter(m => m !== mode.id)
                            : [...paymentSettings.activePaymentModes, mode.id];
                          handleInputChange('activePaymentModes', modes);
                        }}
                        className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          isActive
                            ? `${mode.bgColor} ${mode.borderColor} transform scale-[1.02] shadow-md`
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2 rounded-lg ${isActive ? mode.bgColor : 'bg-gray-100'}`}>
                            <mode.icon className={`w-6 h-6 ${isActive ? mode.textColor : 'text-gray-500'}`} />
                          </div>
                          <div className={`w-8 h-5 rounded-full flex items-center p-0.5 ${
                            isActive ? 'bg-gradient-to-r from-green-500 to-emerald-500 justify-end' : 'bg-gray-300 justify-start'
                          }`}>
                            <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                          </div>
                        </div>
                        <div>
                          <p className={`font-medium ${isActive ? mode.textColor : 'text-gray-900'}`}>
                            {mode.label}
                          </p>
                          <p className={`text-sm mt-1 ${isActive ? 'opacity-90' : 'text-gray-600'}`}>
                            {isActive ? 'Enabled for customers' : 'Disabled'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="bg-gradient-to-r from-yellow-50 to-white p-5 rounded-xl border border-yellow-200">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <CreditCard className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Payment Mode Status</p>
                      <p className="text-sm text-gray-600">
                        {paymentSettings.activePaymentModes.length} of {paymentModeConfig.length} payment modes are currently active
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Processing Settings */}
            {activeTab === 'processing' && (
              <div className="space-y-8">
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    Payment Processing Settings
                  </h2>
                  <p className="text-gray-600 mt-2">Configure payment processing rules and schedules</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Cutoff Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={paymentSettings.paymentCutoffTime}
                        onChange={(e) => handleInputChange('paymentCutoffTime', e.target.value)}
                        className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all hover:border-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { 
                      field: 'autoPaymentProcessing', 
                      label: 'Auto Payment Processing', 
                      description: 'Automatically process scheduled payments',
                      icon: '🔄',
                      color: 'orange'
                    },
                    { 
                      field: 'manualApprovalRequired', 
                      label: 'Manual Approval Required', 
                      description: 'Require manual approval for all payments',
                      icon: '👨‍💼',
                      color: 'red'
                    },
                    { 
                      field: 'holidayProcessing', 
                      label: 'Holiday Processing', 
                      description: 'Process payments on bank holidays',
                      icon: '🎉',
                      color: 'green'
                    }
                  ].map(item => (
                    <div key={item.field} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 bg-${item.color}-100 rounded-lg`}>
                          <span className="text-lg">{item.icon}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleChange(item.field)}
                        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
                          paymentSettings[item.field]
                            ? `bg-gradient-to-r from-${item.color}-600 to-${item.color === 'orange' ? 'amber' : item.color}-600`
                            : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                            paymentSettings[item.field] ? 'translate-x-8' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Processing Days */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Processing Days
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {daysConfig.map(day => {
                      const isSelected = paymentSettings.processingDays.includes(day.id);
                      return (
                        <button
                          key={day.id}
                          type="button"
                          onClick={() => {
                            const days = isSelected
                              ? paymentSettings.processingDays.filter(d => d !== day.id)
                              : [...paymentSettings.processingDays, day.id];
                            handleInputChange('processingDays', days);
                          }}
                          className={`px-5 py-2.5 rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-600 shadow-md'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          {day.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Payments will be processed only on selected days
                  </p>
                </div>
              </div>
            )}

            {/* Transaction Limits */}
            {activeTab === 'limits' && (
              <div className="space-y-8">
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    Transaction Limits
                  </h2>
                  <p className="text-gray-600 mt-2">Set limits for payment transactions</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { field: 'minTransactionAmount', label: 'Min Transaction Amount', icon: IndianRupee },
                    { field: 'maxTransactionAmount', label: 'Max Transaction Amount', icon: IndianRupee },
                    { field: 'dailyTransactionLimit', label: 'Daily Transaction Limit', icon: IndianRupee },
                    { field: 'monthlyTransactionLimit', label: 'Monthly Transaction Limit', icon: IndianRupee }
                  ].map(item => (
                    <div key={item.field} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {item.label}
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-3.5 text-gray-500">
                          <IndianRupee className="w-5 h-5" />
                        </div>
                        <input
                          type="number"
                          min="0"
                          value={paymentSettings[item.field]}
                          onChange={(e) => handleInputChange(item.field, parseInt(e.target.value))}
                          className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all hover:border-gray-400 pl-12"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-white p-5 rounded-xl border border-red-200">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Security Limits</p>
                      <p className="text-sm text-gray-600">
                        These limits help prevent fraud and manage transaction risks. Any transaction outside these limits will require manual approval.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fees & Charges */}
            {activeTab === 'fees' && (
              <div className="space-y-8">
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Percent className="w-6 h-6 text-indigo-600" />
                    </div>
                    Fees & Charges
                  </h2>
                  <p className="text-gray-600 mt-2">Configure transaction fees and charges</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { field: 'transactionFee', label: 'Transaction Fee (%)', step: 0.1, max: 100 },
                    { field: 'gatewayFee', label: 'Gateway Fee (%)', step: 0.1, max: 100 },
                    { field: 'latePaymentFee', label: 'Late Payment Fee (₹)', step: 1 },
                    { field: 'chequeBounceCharge', label: 'Cheque Bounce Charge (₹)', step: 1 }
                  ].map(item => (
                    <div key={item.field} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {item.label}
                      </label>
                      <div className="relative">
                        {item.label.includes('%') ? (
                          <>
                            <input
                              type="number"
                              step={item.step}
                              min="0"
                              max={item.max}
                              value={paymentSettings[item.field]}
                              onChange={(e) => handleInputChange(item.field, parseFloat(e.target.value))}
                              className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all hover:border-gray-400 pr-12"
                            />
                            <div className="absolute right-4 top-3.5 text-gray-500">
                              <Percent className="w-5 h-5" />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="absolute left-4 top-3.5 text-gray-500">
                              <IndianRupee className="w-5 h-5" />
                            </div>
                            <input
                              type="number"
                              step={item.step}
                              min="0"
                              value={paymentSettings[item.field]}
                              onChange={(e) => handleInputChange(item.field, parseFloat(e.target.value))}
                              className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all hover:border-gray-400 pl-12"
                            />
                          </>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {item.label.includes('%') ? 'Percentage of transaction amount' : 'Fixed charge per occurrence'}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-white p-5 rounded-2xl border border-indigo-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <Percent className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Fee Structure Information</p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                          <span>Transaction Fee: Applied to all successful payments</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                          <span>Gateway Fee: Charged by payment gateway provider</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                          <span>Late Payment Fee: Applied after due date</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                          <span>Cheque Bounce Charge: For returned cheques</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg">
                  <Wallet className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Payment Configuration</p>
                  <p className="text-sm text-gray-600">Click save to update all payment settings</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={resetForm}
                  className="flex items-center gap-3 px-6 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-medium shadow-sm hover:shadow-md"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reset All
                </button>
                <button
                  onClick={saveSettings}
                  disabled={isSaving}
                  className={`flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl ${
                    isSaving
                      ? 'bg-gradient-to-r from-purple-400 to-indigo-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                  } text-white`}
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save All Settings
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

export default PaymentSettings;