import React, { useState } from 'react';
import { 
  Search, RefreshCw, Calendar, Save, ArrowRight, Download, 
  AlertCircle, CheckCircle, Calculator, TrendingUp, History, User
} from 'lucide-react';

export default function ScheduleRegenerate() {
  // --- STATE ---
  const [searchId, setSearchId] = useState('');
  const [loanData, setLoanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Configuration Form State
  const [config, setConfig] = useState({
    type: 'Reprice', // Reprice (Rate Change), Reschedule (Tenure Change), Moratorium
    effectiveDate: new Date().toISOString().split('T')[0],
    newRate: '',
    newTenure: '',
    reason: ''
  });

  // Mock Data for Search
  const mockDB = {
    "LN-2023-001": {
      id: "LN-2023-001", customer: "Rahul Sharma", amount: 500000, 
      currentRate: 12, currentTenure: 24, paidInstallments: 5,
      outstanding: 410500, emi: 23537, nextDueDate: "2024-02-15"
    },
    "LN-2023-002": {
      id: "LN-2023-002", customer: "Priya Verma", amount: 1000000, 
      currentRate: 10.5, currentTenure: 60, paidInstallments: 12,
      outstanding: 850000, emi: 21493, nextDueDate: "2024-02-10"
    },
    // --- NEW DEMO DATA ADDED BELOW ---
    "LN-2023-003": {
      id: "LN-2023-003", customer: "Vikram Singh", amount: 750000, 
      currentRate: 11.0, currentTenure: 36, paidInstallments: 8,
      outstanding: 620000, emi: 24560, nextDueDate: "2024-02-20"
    },
    "LN-2023-004": {
      id: "LN-2023-004", customer: "Anjali Gupta", amount: 300000, 
      currentRate: 14.0, currentTenure: 18, paidInstallments: 3,
      outstanding: 260000, emi: 18600, nextDueDate: "2024-02-05"
    }
  };

  // --- ACTIONS ---

  const handleSearch = () => {
    setLoading(true);
    setPreviewMode(false);
    setTimeout(() => {
      const data = mockDB[searchId];
      if (data) {
        setLoanData(data);
        // Pre-fill config with current data
        setConfig({
          ...config,
          newRate: data.currentRate,
          newTenure: data.currentTenure - data.paidInstallments,
          reason: ''
        });
      } else {
        alert("Loan ID not found! Try searching for: LN-2023-001, LN-2023-002, LN-2023-003, or LN-2023-004");
        setLoanData(null);
      }
      setLoading(false);
    }, 800);
  };

  const handleSimulate = () => {
    // Basic Validation
    if (!config.newRate || !config.newTenure) {
        alert("Please enter valid Rate and Tenure.");
        return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPreviewMode(true);
    }, 1000);
  };

  const handleSave = () => {
    if(window.confirm("Are you sure you want to regenerate the schedule? This will overwrite the existing future installments.")) {
      alert("Schedule Regenerated Successfully!");
      // Reset or Redirect logic here
      setPreviewMode(false);
      setLoanData(null);
      setSearchId('');
    }
  };

  // Helper to calculate Mock New EMI
  const calculateNewEMI = () => {
    if(!loanData) return 0;
    const P = loanData.outstanding;
    const R = config.newRate / 12 / 100;
    const N = config.newTenure;
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    return emi.toFixed(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <RefreshCw className="text-blue-600" /> Schedule Re-Generate
        </h1>
        <p className="text-gray-500 mt-1">Modify interest rates, tenure, or restructure existing loans.</p>
      </div>

      {/* SEARCH SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Search Loan Account</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Loan ID (e.g. LN-2023-003)..." 
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg"
              />
            </div>
          </div>
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition shadow-lg shadow-blue-200 flex items-center gap-2"
          >
            {loading ? 'Searching...' : 'Fetch Details'}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      {loanData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
          
          {/* LEFT COLUMN: LOAN INFO & CONFIG */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* 1. Loan Summary Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0"></div>
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                <User size={18} className="text-blue-600"/> Customer Profile
              </h3>
              
              <div className="space-y-3 relative z-10">
                <div><span className="text-xs text-gray-500 block">Customer Name</span><span className="font-bold text-lg">{loanData.customer}</span></div>
                <div className="grid grid-cols-2 gap-4">
                   <div><span className="text-xs text-gray-500 block">Loan ID</span><span className="font-mono font-medium text-blue-600">{loanData.id}</span></div>
                   <div><span className="text-xs text-gray-500 block">Status</span><span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">Active</span></div>
                </div>
                <div className="pt-3 border-t border-dashed">
                   <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Principal Outstanding</span>
                      <span className="font-bold text-gray-800">₹{loanData.outstanding.toLocaleString()}</span>
                   </div>
                </div>
              </div>
            </div>

            {/* 2. Configuration Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <History size={18} className="text-purple-600"/> Modification Parameters
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Regeneration Type</label>
                  <select 
                    value={config.type} 
                    onChange={(e) => setConfig({...config, type: e.target.value})}
                    className="w-full p-2.5 border rounded-lg bg-gray-50 focus:bg-white transition"
                  >
                    <option value="Reprice">Rate Change (Reprice)</option>
                    <option value="Reschedule">Tenure Change (Reschedule)</option>
                    <option value="Moratorium">Add Moratorium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Effective Date</label>
                  <input 
                    type="date" 
                    value={config.effectiveDate}
                    onChange={(e) => setConfig({...config, effectiveDate: e.target.value})}
                    className="w-full p-2.5 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">New Rate (%)</label>
                    <input 
                      type="number" 
                      value={config.newRate}
                      onChange={(e) => setConfig({...config, newRate: e.target.value})}
                      className="w-full p-2.5 border rounded-lg focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Rem. Tenure (M)</label>
                    <input 
                      type="number" 
                      value={config.newTenure}
                      onChange={(e) => setConfig({...config, newTenure: e.target.value})}
                      className="w-full p-2.5 border rounded-lg focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Reason for Change</label>
                  <textarea 
                    rows="2"
                    value={config.reason}
                    onChange={(e) => setConfig({...config, reason: e.target.value})}
                    placeholder="Enter approval note..."
                    className="w-full p-2.5 border rounded-lg resize-none"
                  ></textarea>
                </div>

                <button 
                  onClick={handleSimulate}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium shadow-md transition flex justify-center items-center gap-2"
                >
                  <Calculator size={18} /> Simulate Schedule
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: PREVIEW & IMPACT */}
          <div className="lg:col-span-2">
            {previewMode ? (
              <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                
                {/* Impact Analysis Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                    <span className="text-xs font-bold text-gray-400 uppercase">Old EMI</span>
                    <div className="text-xl font-bold text-gray-500 mt-1">₹{loanData.emi.toLocaleString()}</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
                    <span className="text-xs font-bold text-blue-600 uppercase relative z-10">New EMI</span>
                    <div className="text-2xl font-bold text-blue-800 mt-1 relative z-10">₹{Number(calculateNewEMI()).toLocaleString()}</div>
                    {/* Background Icon */}
                    <TrendingUp className="absolute right-2 bottom-2 text-blue-200 opacity-50" size={40} />
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                    <span className="text-xs font-bold text-gray-400 uppercase">Difference</span>
                    <div className={`text-xl font-bold mt-1 ${calculateNewEMI() > loanData.emi ? 'text-red-500' : 'text-green-500'}`}>
                      {calculateNewEMI() > loanData.emi ? '+' : ''}
                      ₹{(calculateNewEMI() - loanData.emi).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Comparison Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-700">Proposed Schedule Preview</h3>
                    <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                      <Download size={14}/> Export CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto max-h-[400px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10">
                        <tr>
                          <th className="p-3">#</th>
                          <th className="p-3">Due Date</th>
                          <th className="p-3">Principal</th>
                          <th className="p-3">Interest</th>
                          <th className="p-3 text-right">Total EMI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {/* Simulating 5 rows for preview */}
                        {[1,2,3,4,5].map((i) => {
                           const emi = Number(calculateNewEMI());
                           const interest = (loanData.outstanding * (config.newRate/1200)).toFixed(0);
                           const principal = (emi - interest).toFixed(0);
                           
                           // Date logic for demo
                           const date = new Date(config.effectiveDate);
                           date.setMonth(date.getMonth() + i);

                           return (
                            <tr key={i} className="hover:bg-gray-50">
                              <td className="p-3 text-gray-500">{loanData.paidInstallments + i}</td>
                              <td className="p-3">{date.toLocaleDateString()}</td>
                              <td className="p-3">₹{Number(principal).toLocaleString()}</td>
                              <td className="p-3 text-red-500">₹{Number(interest).toLocaleString()}</td>
                              <td className="p-3 font-bold text-right text-blue-700">₹{emi.toLocaleString()}</td>
                            </tr>
                           )
                        })}
                        {/* More rows indicator */}
                        <tr>
                          <td colSpan="5" className="p-3 text-center text-xs text-gray-400 bg-gray-50">
                            ... and {config.newTenure - 5} more installments
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Final Actions */}
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                  <button onClick={() => setPreviewMode(false)} className="px-6 py-2.5 border border-gray-300 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition">
                    Back to Edit
                  </button>
                  <button onClick={handleSave} className="px-8 py-2.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 flex items-center gap-2 transition transform active:scale-95">
                    <CheckCircle size={18} /> Confirm & Regenerate
                  </button>
                </div>

              </div>
            ) : (
              // EMPTY STATE / PLACEHOLDER
              <div className="h-full flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-dashed border-gray-300 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Calendar size={40} className="text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-400">Ready to Simulate</h3>
                <p className="text-gray-400 mt-2 max-w-xs mx-auto">
                  Adjust the parameters on the left and click "Simulate Schedule" to see the impact on EMIs.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}