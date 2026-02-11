import React, { useState, useEffect } from 'react';
import {   Building,   User,   Users,   DollarSign,   FileText,   Percent,   Calendar,   CheckCircle,   XCircle,   AlertCircle,   Calculator,   FileCheck,   Shield, 
    Clock,   TrendingUp,   Download,   Save,   ChevronRight,   Award,   Banknote,   Receipt,   Lock,   FileSignature,   ClipboardCheck,   MessageSquare,   ChevronDown, 
    ChevronUp,   IndianRupee } from 'lucide-react';

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

const AmountCard = ({ title, amount, type = 'normal', change, icon: Icon }) => {
  const typeStyles = {
    normal: 'bg-gray-50 border-gray-200',
    requested: 'bg-blue-50 border-blue-200',
    eligible: 'bg-green-50 border-green-200',
    recommended: 'bg-purple-50 border-purple-200',
    final: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 shadow-md'
  };

  const typeIcons = {
    requested: IndianRupee,
    eligible: TrendingUp,
    recommended: Award,
    final: FileCheck
  };

  const CardIcon = Icon || typeIcons[type];

  return (
    <div className={`p-5 rounded-xl border ${typeStyles[type]}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {CardIcon && <CardIcon className="w-5 h-5 mr-2 text-blue-600" />}
          <span className="text-sm font-medium text-gray-600">{title}</span>
        </div>
        {change && (
          <span className={`text-xs px-2 py-1 rounded-full ${change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{amount}</p>
    </div>
  );
};

const EMIFormula = ({ principal, rate, tenure }) => {
  const [showFormula, setShowFormula] = useState(false);

  // EMI formula: P × r × (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <button
        onClick={() => setShowFormula(!showFormula)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800"
      >
        {showFormula ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
        {showFormula ? 'Hide Formula' : 'Show EMI Calculation Formula'}
      </button>
      
      {showFormula && (
        <div className="mt-3 text-sm text-gray-600">
          <p className="mb-2 font-medium">EMI Formula:</p>
          <p className="mb-1">EMI = P × r × (1+r)^n ÷ ((1+r)^n - 1)</p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
            <div>P = ₹{principal.toLocaleString('en-IN')} (Loan Principal)</div>
            <div>r = {rate/12}% ÷ 100 = {(rate/12/100).toFixed(6)} (Monthly Rate)</div>
            <div>n = {tenure} × 12 = {months} months (Tenure in months)</div>
            <div>EMI = ₹{emi.toFixed(2).toLocaleString('en-IN')}</div>
          </div>
        </div>
      )}
    </div>
  );
};

function Sanction() {
  // State for sanction terms
  const [sanctionAmount, setSanctionAmount] = useState(7500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [emiStartDate, setEmiStartDate] = useState('2024-12-01');
  const [moratoriumPeriod, setMoratoriumPeriod] = useState(3);
  const [processingFees, setProcessingFees] = useState(25000);
  const [insuranceAmount, setInsuranceAmount] = useState(150000);

  // State for conditions
  const [conditions, setConditions] = useState({
    insuranceRequired: true,
    guarantorRequired: false,
    additionalCollateral: false,
    incomeProofPending: true,
    builderNOC: false
  });

  // State for decision panel
  const [sanctionDecision, setSanctionDecision] = useState('approve');
  const [sanctionAuthority, setSanctionAuthority] = useState('Mr. Ajay Verma');
  const [sanctionDate, setSanctionDate] = useState('2024-11-20');
  const [validityPeriod, setValidityPeriod] = useState(90);
  const [remarks, setRemarks] = useState('');

  // EMI Calculation state
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Dummy data
  const loanSummary = {
    loanNumber: 'LN-2024-78945',
    applicantName: 'Rajesh Kumar',
    coApplicant: 'Priya Kumar',
    loanType: 'Home Loan',
    requestedAmount: '₹85,00,000',
    branch: 'Mumbai Central',
    stage: 'Sanction'
  };

  const amountComparison = {
    requested: 8500000,
    eligible: 8000000,
    recommended: 7500000,
    final: 7500000
  };

  // Calculate EMI
  useEffect(() => {
    const calculateEMI = () => {
      const principal = sanctionAmount;
      const monthlyRate = interestRate / 12 / 100;
      const months = loanTenure * 12;

      if (principal > 0 && interestRate > 0 && months > 0) {
        const emiValue = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                        (Math.pow(1 + monthlyRate, months) - 1);
        const totalInterestValue = emiValue * months - principal;
        const totalAmountValue = emiValue * months;

        setEmi(emiValue);
        setTotalInterest(totalInterestValue);
        setTotalAmount(totalAmountValue);
      }
    };

    calculateEMI();
  }, [sanctionAmount, interestRate, loanTenure]);

  // Handle condition toggle
  const handleConditionToggle = (condition) => {
    setConditions(prev => ({
      ...prev,
      [condition]: !prev[condition]
    }));
  };

  const handleSaveSanction = () => {
    alert('Sanction details saved successfully!');
  };

  const handleGenerateLetter = () => {
    alert('Sanction letter generated and downloaded!');
  };

  const handleApproveDisbursement = () => {
    alert('Loan approved and moved to disbursement stage!');
  };

  const handleRejectApplication = () => {
    alert('Application rejected!');
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <ChevronRight className="w-5 h-5 text-gray-400 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Loan Sanction Management</h1>
        </div>
        <p className="text-gray-600">Finalize loan approval, define terms, and generate sanction offers</p>
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
            <label className="block text-sm text-gray-600 mb-1">Requested Amount</label>
            <div className="flex items-center">
              <IndianRupee className="w-4 h-4 text-green-600 mr-2" />
              <p className="text-lg font-semibold text-green-700">{loanSummary.requestedAmount}</p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <label className="block text-sm text-gray-600 mb-1">Current Stage</label>
            <div className="flex items-center">
              <FileCheck className="w-4 h-4 text-blue-600 mr-2" />
              <Badge color="blue" icon={Award}>
                {loanSummary.stage}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Eligibility & Offer Comparison */}
          <Card title="Eligibility & Offer Comparison" icon={TrendingUp}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AmountCard
                title="Requested Amount"
                amount={formatCurrency(amountComparison.requested)}
                type="requested"
                icon={IndianRupee}
              />
              
              <AmountCard
                title="Eligible Amount"
                amount={formatCurrency(amountComparison.eligible)}
                type="eligible"
                change={-5.9}
              />
              
              <AmountCard
                title="Recommended Amount"
                amount={formatCurrency(amountComparison.recommended)}
                type="recommended"
                change={-11.8}
              />
              
              <AmountCard
                title="Final Sanction Amount"
                amount={formatCurrency(amountComparison.final)}
                type="final"
                change={-11.8}
              />
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-blue-800">Final Reduction</p>
                  <p className="text-sm text-blue-600">Amount reduced based on risk assessment</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-700">
                    ₹{((amountComparison.requested - amountComparison.final) / 100000).toFixed(1)} Lakhs
                  </p>
                  <p className="text-sm text-blue-600">Reduction</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Sanction Terms */}
          <Card title="Sanction Terms" icon={FileSignature}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sanction Amount (₹)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={sanctionAmount}
                    onChange={(e) => setSanctionAmount(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {formatCurrency(sanctionAmount)}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (% p.a.)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Tenure (Years)
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[5, 10, 15, 20, 25, 30].map(year => (
                      <option key={year} value={year}>{year} years</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  EMI Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={emiStartDate}
                    onChange={(e) => setEmiStartDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Moratorium Period (Months)
                </label>
                <select
                  value={moratoriumPeriod}
                  onChange={(e) => setMoratoriumPeriod(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {[0, 1, 2, 3, 6, 12].map(month => (
                    <option key={month} value={month}>{month} month{month !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Processing Fees (₹)
                </label>
                <input
                  type="number"
                  value={processingFees}
                  onChange={(e) => setProcessingFees(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Amount (₹)
                </label>
                <input
                  type="number"
                  value={insuranceAmount}
                  onChange={(e) => setInsuranceAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* EMI Calculation */}
          <Card title="EMI Calculation" icon={Calculator}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <label className="block text-sm text-gray-600 mb-2">Monthly EMI</label>
                  <div className="flex items-center">
                    <Receipt className="w-6 h-6 text-blue-600 mr-2" />
                    <p className="text-2xl font-bold text-blue-700">{formatCurrency(emi)}</p>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">Monthly payment</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <label className="block text-sm text-gray-600 mb-2">Total Interest</label>
                  <div className="flex items-center">
                    <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
                    <p className="text-2xl font-bold text-purple-700">{formatCurrency(totalInterest)}</p>
                  </div>
                  <p className="text-xs text-purple-600 mt-1">Over {loanTenure} years</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <label className="block text-sm text-gray-600 mb-2">Total Payable</label>
                  <div className="flex items-center">
                    <IndianRupee className="w-6 h-6 text-green-600 mr-2" />
                    <p className="text-2xl font-bold text-green-700">{formatCurrency(totalAmount)}</p>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Principal + Interest</p>
                </div>
              </div>

              {/* EMI Formula */}
              <EMIFormula 
                principal={sanctionAmount}
                rate={interestRate}
                tenure={loanTenure}
              />

              {/* EMI Schedule Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  EMI Schedule Preview (First 6 Months)
                </label>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Month</th>
                        <th className="px-4 py-3">EMI Date</th>
                        <th className="px-4 py-3">EMI Amount</th>
                        <th className="px-4 py-3">Principal</th>
                        <th className="px-4 py-3">Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5, 6].map(month => {
                        const emiDate = new Date(emiStartDate);
                        emiDate.setMonth(emiDate.getMonth() + month - 1);
                        
                        return (
                          <tr key={month} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">Month {month}</td>
                            <td className="px-4 py-3">{emiDate.toLocaleDateString('en-IN')}</td>
                            <td className="px-4 py-3 font-medium">{formatCurrency(emi)}</td>
                            <td className="px-4 py-3 text-green-600">
                              {formatCurrency(emi * 0.3)} {/* Simplified calculation */}
                            </td>
                            <td className="px-4 py-3 text-red-600">
                              {formatCurrency(emi * 0.7)} {/* Simplified calculation */}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>

          {/* Conditions & Covenants */}
          <Card title="Conditions & Covenants" icon={ClipboardCheck}>
            <div className="space-y-3">
              {[
                { key: 'insuranceRequired', label: 'Insurance Required' },
                { key: 'guarantorRequired', label: 'Guarantor Required' },
                { key: 'additionalCollateral', label: 'Additional Collateral' },
                { key: 'incomeProofPending', label: 'Income Proof Pending' },
                { key: 'builderNOC', label: 'Builder NOC Required' }
              ].map((condition) => (
                <label
                  key={condition.key}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={conditions[condition.key]}
                      onChange={() => handleConditionToggle(condition.key)}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">{condition.label}</span>
                  </div>
                  {conditions[condition.key] ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-300" />
                  )}
                </label>
              ))}
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Conditions Remarks
                </label>
                <textarea
                  rows="3"
                  placeholder="Add any special conditions or covenants..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </Card>

          {/* Sanction Decision Panel */}
          <Card title="Sanction Decision Panel" icon={Shield}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sanction Decision
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
                        sanctionDecision === option.value
                          ? `bg-${option.color}-50 border-${option.color}-300`
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="sanctionDecision"
                        value={option.value}
                        checked={sanctionDecision === option.value}
                        onChange={(e) => setSanctionDecision(e.target.value)}
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
                    Sanction Authority
                  </label>
                  <input
                    type="text"
                    value={sanctionAuthority}
                    onChange={(e) => setSanctionAuthority(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sanction Date
                  </label>
                  <input
                    type="date"
                    value={sanctionDate}
                    onChange={(e) => setSanctionDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Validity Period (Days)
                  </label>
                  <input
                    type="number"
                    value={validityPeriod}
                    onChange={(e) => setValidityPeriod(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Sanction Remarks
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows="3"
                  placeholder="Enter detailed sanction remarks and approval notes..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t">
                <button 
                  onClick={handleSaveSanction}
                  className="flex flex-col items-center justify-center p-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <Save className="w-5 h-5 mb-2" />
                  Save Sanction
                </button>
                
                <button 
                  onClick={handleGenerateLetter}
                  className="flex flex-col items-center justify-center p-4 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                >
                  <Download className="w-5 h-5 mb-2" />
                  Generate Letter
                </button>
                
                <button 
                  onClick={handleApproveDisbursement}
                  className="flex flex-col items-center justify-center p-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 mb-2" />
                  Approve & Move
                </button>
                
                <button 
                  onClick={handleRejectApplication}
                  className="flex flex-col items-center justify-center p-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  <XCircle className="w-5 h-5 mb-2" />
                  Reject
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Sanction;