import React, { useState } from 'react';
import { Building2, Save, RefreshCw, Upload } from 'lucide-react';

const CompanyDetails = () => {
  const [companyDetails, setCompanyDetails] = useState({
    name: 'Quick Loan Finance Ltd.',
    email: 'support@quickloan.com',
    phone: '+91 9876543210',
    address: '123 Business Tower, Sector 18, Noida, UP - 201301',
    website: 'www.quickloan.com',
    logo: null,
    favicon: null,
    panNumber: 'ABCDE1234F',
    gstNumber: '22ABCDE1234F1Z5',
    cinNumber: 'U67190MH2010PLC199123',
    registrationDate: '2015-03-15',
    businessType: 'NBFC',
    industry: 'Financial Services',
    contactPerson: 'Rajesh Sharma',
    contactPersonPhone: '+91 9876543211',
    contactPersonEmail: 'rajesh@quickloan.com'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setCompanyDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange(field, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Company details saved successfully!');
  };

  const resetForm = () => {
    setCompanyDetails({
      name: 'Quick Loan Finance Ltd.',
      email: 'support@quickloan.com',
      phone: '+91 9876543210',
      address: '123 Business Tower, Sector 18, Noida, UP - 201301',
      website: 'www.quickloan.com',
      logo: null,
      favicon: null,
      panNumber: 'ABCDE1234F',
      gstNumber: '22ABCDE1234F1Z5',
      cinNumber: 'U67190MH2010PLC199123',
      registrationDate: '2015-03-15',
      businessType: 'NBFC',
      industry: 'Financial Services',
      contactPerson: 'Rajesh Sharma',
      contactPersonPhone: '+91 9876543211',
      contactPersonEmail: 'rajesh@quickloan.com'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-blue-600" />
                Company Details
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your company information and branding
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Section Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
            <p className="text-gray-600 text-sm mt-1">
              Update your company details and branding assets
            </p>
          </div>

          <div className="p-6">
            {/* Brand Assets Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Assets</h3>
              <div className="flex flex-wrap gap-8">
                {/* Logo Upload */}
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center mb-3 overflow-hidden bg-gray-50">
                    {companyDetails.logo ? (
                      <img src={companyDetails.logo} alt="Company Logo" className="w-full h-full object-contain p-4" />
                    ) : (
                      <Building2 className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  <label className="cursor-pointer">
                    <span className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      <Upload className="w-4 h-4" />
                      Upload Logo
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload('logo', e.target.files[0])}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG • Max 2MB • 300x300px</p>
                </div>
                
                {/* Favicon Upload */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center mb-3 overflow-hidden bg-gray-50">
                    {companyDetails.favicon ? (
                      <img src={companyDetails.favicon} alt="Favicon" className="w-full h-full object-contain p-2" />
                    ) : (
                      <Building2 className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  <label className="cursor-pointer">
                    <span className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                      <Upload className="w-4 h-4" />
                      Upload Favicon
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload('favicon', e.target.files[0])}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">ICO, PNG • 32x32px</p>
                </div>
              </div>
            </div>

            {/* Company Information Form */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Company Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={companyDetails.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
                  <select
                    value={companyDetails.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="NBFC">NBFC</option>
                    <option value="Bank">Bank</option>
                    <option value="FinTech">FinTech</option>
                    <option value="Cooperative">Cooperative Society</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                  <input
                    type="text"
                    value={companyDetails.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registration Date</label>
                  <input
                    type="date"
                    value={companyDetails.registrationDate}
                    onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                {/* Contact Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={companyDetails.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={companyDetails.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    value={companyDetails.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                {/* Contact Person */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person Name</label>
                  <input
                    type="text"
                    value={companyDetails.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person Phone</label>
                  <input
                    type="tel"
                    value={companyDetails.contactPersonPhone}
                    onChange={(e) => handleInputChange('contactPersonPhone', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person Email</label>
                  <input
                    type="email"
                    value={companyDetails.contactPersonEmail}
                    onChange={(e) => handleInputChange('contactPersonEmail', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                {/* Legal Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                  <input
                    type="text"
                    value={companyDetails.panNumber}
                    onChange={(e) => handleInputChange('panNumber', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                  <input
                    type="text"
                    value={companyDetails.gstNumber}
                    onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CIN Number</label>
                  <input
                    type="text"
                    value={companyDetails.cinNumber}
                    onChange={(e) => handleInputChange('cinNumber', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Address *</label>
                <textarea
                  value={companyDetails.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Unsaved Changes</p>
                <p className="text-sm text-gray-600">Click save to update company details</p>
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
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
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
                      Save Changes
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

export default CompanyDetails;