import React, { useState } from 'react';
import {
  Building,
  User,
  Users,
  DollarSign,
  FileText,
  Home,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Scale,
  Shield,
  ClipboardCheck,
  BookOpen,
  Landmark,
  FileCheck,
  FileX,
  FileWarning,
  Save,
  ChevronRight,
  Gavel,
  ShieldCheck,
  ShieldAlert,
  Banknote,
  Lock,
  Search,
  Award,
  MessageSquare,
  FileSearch,
  ClipboardList
} from 'lucide-react';

// Reusable Components
const Card = ({ children, title, icon: Icon }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <div className="flex items-center mb-6">
      {Icon && <Icon className="w-6 h-6 text-blue-600 mr-3" />}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

const Badge = ({ children, color = 'blue', icon: Icon }) => {
  const colorClasses = {
    green: 'bg-green-100 text-green-800 border-green-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    gray: 'bg-gray-100 text-gray-800 border-gray-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  return (
    <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${colorClasses[color]} flex items-center gap-1.5`}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </span>
  );
};

const VerificationItem = ({ title, status, verifiedBy, date }) => {
  const statusConfig = {
    verified: { color: 'green', icon: CheckCircle, label: 'Verified' },
    pending: { color: 'yellow', icon: AlertCircle, label: 'Pending' },
    rejected: { color: 'red', icon: XCircle, label: 'Rejected' },
    not_required: { color: 'gray', icon: FileX, label: 'Not Required' }
  };

  const { color, icon: Icon, label } = statusConfig[status];

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <FileText className="w-5 h-5 text-gray-500" />
        <div>
          <p className="font-medium text-gray-800">{title}</p>
          {verifiedBy && (
            <p className="text-sm text-gray-500">By {verifiedBy} on {date}</p>
          )}
        </div>
      </div>
      <Badge color={color} icon={Icon}>
        {label}
      </Badge>
    </div>
  );
};

const RiskIndicator = ({ label, riskLevel, description }) => {
  const riskConfig = {
    high: { color: 'red', icon: ShieldAlert },
    medium: { color: 'yellow', icon: AlertCircle },
    low: { color: 'green', icon: ShieldCheck },
    none: { color: 'gray', icon: CheckCircle }
  };

  const { color, icon: Icon } = riskConfig[riskLevel];

  return (
    <div className={`p-4 rounded-xl border ${riskLevel === 'high' ? 'bg-red-50 border-red-200' : riskLevel === 'medium' ? 'bg-yellow-50 border-yellow-200' : riskLevel === 'low' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-800">{label}</span>
        <Badge color={color} icon={Icon}>
          {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
        </Badge>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

function LegalCompliance() {
  // State for form fields
  const [legalDecision, setLegalDecision] = useState('approve');
  const [mortgageEligibility, setMortgageEligibility] = useState('eligible');
  const [legalRiskGrade, setLegalRiskGrade] = useState('B');
  const [conditions, setConditions] = useState('');
  const [legalRemarks, setLegalRemarks] = useState('');

  // Dummy data
  const loanSummary = {
    loanNumber: 'LN-2024-78945',
    applicantName: 'Rajesh Kumar',
    coApplicant: 'Priya Kumar',
    loanType: 'Home Loan',
    loanAmount: '₹85,00,000',
    branch: 'Mumbai Central',
    stage: 'Legal Compliance'
  };

  const propertyLegalDetails = {
    propertyType: 'Residential Apartment',
    address: 'Sea View Apartments, 4th Floor, Worli',
    surveyNumber: 'SUR-4567/2020',
    plotNumber: 'PL-789',
    khataNumber: 'KH-123456',
    registrationNumber: 'REG/MAH/2020/789456',
    registrationDate: '15 Mar 2020',
    subRegistrarOffice: 'Worli Sub-Registrar Office'
  };

  const ownershipDetails = {
    currentOwner: 'Rajesh Kumar',
    previousOwner: 'Amit Sharma',
    ownershipType: 'Freehold',
    titleChainVerified: true,
    numberOfTransfers: '2',
    lastSaleDate: '15 Mar 2020'
  };

  const documentVerification = [
    { title: 'Sale Deed', status: 'verified', verifiedBy: 'Adv. Sharma', date: '10 Nov 2024' },
    { title: 'Mother Deed', status: 'verified', verifiedBy: 'Adv. Sharma', date: '10 Nov 2024' },
    { title: 'Title Deed', status: 'verified', verifiedBy: 'Adv. Sharma', date: '10 Nov 2024' },
    { title: 'Agreement to Sale', status: 'pending' },
    { title: 'Property Tax Receipts', status: 'verified', verifiedBy: 'Clerk', date: '08 Nov 2024' },
    { title: 'Building Plan Approval', status: 'verified', verifiedBy: 'Municipal Office', date: '05 Nov 2024' },
    { title: 'NOC Certificates', status: 'pending' },
    { title: 'Occupancy Certificate', status: 'not_required' }
  ];

  const encumbranceCheck = [
    { label: 'Encumbrance Certificate', riskLevel: 'low', description: 'No encumbrances found for last 30 years' },
    { label: 'Existing Mortgage', riskLevel: 'none', description: 'No existing mortgage on property' },
    { label: 'Court Cases', riskLevel: 'medium', description: '1 pending civil case related to neighbor dispute' },
    { label: 'Legal Notices', riskLevel: 'low', description: 'No legal notices received' },
    { label: 'Property Dispute Status', riskLevel: 'low', description: 'No major disputes recorded' }
  ];

  const handleSaveReview = () => {
    alert('Legal review saved successfully!');
  };

  const handleApproveSanction = () => {
    alert('Application approved and moved to sanction stage!');
  };

  const handleRejectApplication = () => {
    alert('Application rejected!');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <ChevronRight className="w-5 h-5 text-gray-400 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Legal Compliance Management</h1>
        </div>
        <p className="text-gray-600">Property ownership verification and legal document assessment</p>
      </div>

      {/* Loan Summary Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <label className="block text-sm text-gray-600 mb-1">Loan Number</label>
            <div className="flex items-center">
              <FileText className="w-4 h-4 text-blue-600 mr-2" />
              <p className="text-lg font-semibold text-blue-700">{loanSummary.loanNumber}</p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <label className="block text-sm text-gray-600 mb-1">Applicant</label>
            <div className="flex items-center">
              <User className="w-4 h-4 text-gray-600 mr-2" />
              <p className="text-lg font-semibold">{loanSummary.applicantName}</p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <label className="block text-sm text-gray-600 mb-1">Co-Applicant</label>
            <div className="flex items-center">
              <Users className="w-4 h-4 text-gray-600 mr-2" />
              <p className="text-lg font-semibold">{loanSummary.coApplicant}</p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <label className="block text-sm text-gray-600 mb-1">Loan Type</label>
            <div className="flex items-center">
              <Banknote className="w-4 h-4 text-green-600 mr-2" />
              <p className="text-lg font-semibold">{loanSummary.loanType}</p>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <label className="block text-sm text-gray-600 mb-1">Loan Amount</label>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 text-green-600 mr-2" />
              <p className="text-lg font-semibold text-green-700">{loanSummary.loanAmount}</p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <label className="block text-sm text-gray-600 mb-1">Current Stage</label>
            <div className="flex items-center">
              <Gavel className="w-4 h-4 text-blue-600 mr-2" />
              <Badge color="blue" icon={Shield}>
                {loanSummary.stage}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Property Legal Details */}
          <Card title="Property Legal Details" icon={Landmark}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-600 mb-1">Property Type</label>
                <div className="flex items-center">
                  <Home className="w-4 h-4 text-gray-500 mr-2" />
                  <p className="font-medium">{propertyLegalDetails.propertyType}</p>
                </div>
              </div>
              
              <div className="md:col-span-2 p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-600 mb-1">Property Address</label>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
                  <p className="font-medium">{propertyLegalDetails.address}</p>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-600 mb-1">Survey Number</label>
                <div className="flex items-center">
                  <FileSearch className="w-4 h-4 text-gray-500 mr-2" />
                  <p className="font-medium">{propertyLegalDetails.surveyNumber}</p>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-600 mb-1">Plot Number</label>
                <p className="font-medium">{propertyLegalDetails.plotNumber}</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-600 mb-1">Khata Number</label>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 text-gray-500 mr-2" />
                  <p className="font-medium">{propertyLegalDetails.khataNumber}</p>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-600 mb-1">Registration Number</label>
                <p className="font-medium">{propertyLegalDetails.registrationNumber}</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-600 mb-1">Registration Date</label>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                  <p className="font-medium">{propertyLegalDetails.registrationDate}</p>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-600 mb-1">Sub-Registrar Office</label>
                <p className="font-medium">{propertyLegalDetails.subRegistrarOffice}</p>
              </div>
            </div>
          </Card>

          {/* Legal Document Verification */}
          <Card title="Legal Document Verification" icon={ClipboardCheck}>
            <div className="space-y-3">
              {documentVerification.map((doc, index) => (
                <VerificationItem
                  key={index}
                  title={doc.title}
                  status={doc.status}
                  verifiedBy={doc.verifiedBy}
                  date={doc.date}
                />
              ))}
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Overall Verification Status</p>
                    <p className="text-sm text-gray-500">5 of 8 documents verified</p>
                  </div>
                  <Badge color="yellow" icon={FileCheck}>
                    62% Complete
                  </Badge>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Ownership & Title Chain */}
          <Card title="Ownership & Title Chain" icon={Scale}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <label className="block text-sm text-gray-600 mb-1">Current Owner</label>
                <div className="flex items-center">
                  <User className="w-5 h-5 text-green-600 mr-2" />
                  <p className="text-lg font-semibold text-green-700">{ownershipDetails.currentOwner}</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm text-gray-600 mb-1">Previous Owner</label>
                <div className="flex items-center">
                  <User className="w-4 h-4 text-gray-500 mr-2" />
                  <p className="font-medium">{ownershipDetails.previousOwner}</p>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl">
                <label className="block text-sm text-gray-600 mb-1">Ownership Type</label>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-blue-600 mr-2" />
                  <p className="font-semibold text-blue-700">{ownershipDetails.ownershipType}</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm text-gray-600 mb-1">Title Chain Verified</label>
                <div className="flex items-center">
                  {ownershipDetails.titleChainVerified ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <Badge color="green">Verified</Badge>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-600 mr-2" />
                      <Badge color="red">Pending</Badge>
                    </>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm text-gray-600 mb-1">Number of Transfers</label>
                <div className="flex items-center">
                  <Swap className="w-4 h-4 text-gray-500 mr-2" />
                  <p className="font-medium">{ownershipDetails.numberOfTransfers}</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm text-gray-600 mb-1">Last Sale Date</label>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                  <p className="font-medium">{ownershipDetails.lastSaleDate}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Encumbrance & Litigation Check */}
          <Card title="Encumbrance & Litigation Check" icon={Search}>
            <div className="space-y-4">
              {encumbranceCheck.map((item, index) => (
                <RiskIndicator
                  key={index}
                  label={item.label}
                  riskLevel={item.riskLevel}
                  description={item.description}
                />
              ))}
              
              <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-slate-100 rounded-xl border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Overall Legal Risk Assessment</p>
                    <p className="text-sm text-gray-500">Based on all legal checks</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <Badge color="yellow" className="text-lg px-4 py-2">
                      Moderate Risk
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Advocate Decision Panel */}
          <Card title="Advocate Decision Panel" icon={Gavel}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Legal Decision
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'approve', label: 'Approve', icon: CheckCircle, color: 'green' },
                    { value: 'conditional', label: 'Conditional', icon: AlertCircle, color: 'yellow' },
                    { value: 'reject', label: 'Reject', icon: XCircle, color: 'red' }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-all ${
                        legalDecision === option.value
                          ? `bg-${option.color}-50 border-${option.color}-300`
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="legalDecision"
                        value={option.value}
                        checked={legalDecision === option.value}
                        onChange={(e) => setLegalDecision(e.target.value)}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                      />
                      <option.icon className={`w-5 h-5 text-${option.color}-600`} />
                      <span className="text-gray-700 font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mortgage Eligibility
                  </label>
                  <select
                    value={mortgageEligibility}
                    onChange={(e) => setMortgageEligibility(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="eligible">Eligible</option>
                    <option value="eligible_with_conditions">Eligible with Conditions</option>
                    <option value="not_eligible">Not Eligible</option>
                    <option value="pending">Pending Verification</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legal Risk Grade
                  </label>
                  <select
                    value={legalRiskGrade}
                    onChange={(e) => setLegalRiskGrade(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="A">A - Low Risk</option>
                    <option value="B">B - Moderate Risk</option>
                    <option value="C">C - High Risk</option>
                    <option value="D">D - Very High Risk</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conditions (if any)
                </label>
                <textarea
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                  rows="2"
                  placeholder="Specify any conditions for approval..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Legal Remarks
                </label>
                <textarea
                  value={legalRemarks}
                  onChange={(e) => setLegalRemarks(e.target.value)}
                  rows="3"
                  placeholder="Enter detailed legal remarks and observations..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-6 border-t">
                <button 
                  onClick={handleSaveReview}
                  className="flex-1 min-w-[200px] flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Legal Review
                </button>
                <button 
                  onClick={handleApproveSanction}
                  className="flex-1 min-w-[200px] flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Approve & Move to Sanction
                </button>
                <button 
                  onClick={handleRejectApplication}
                  className="flex-1 min-w-[200px] flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Reject Application
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Missing icon component
const Swap = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

export default LegalCompliance;