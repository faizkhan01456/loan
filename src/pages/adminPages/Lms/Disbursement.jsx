import React, { useState, useEffect } from 'react';
import { 
  FileText, Plus, CheckCircle, Clock, AlertCircle, Printer, Edit, 
  CreditCard, DollarSign, Calendar, ChevronRight, Search, Eye, X, 
  Download, Calculator, ShieldCheck, Send, Check
} from 'lucide-react';

export default function DisbursementManagement() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'createDV', 'viewDV', 'amortization'
  const [searchQuery, setSearchQuery] = useState('');

  // --- MOCK DATABASE (Initial State) ---
  const [pendingLoans, setPendingLoans] = useState([
    { id: "LN-2024-001", customer: "Rahul Sharma", amount: 50000, approvedDate: "2024-01-15", type: "Personal", bank: "HDFC Bank", acc: "501002345678", ifsc: "HDFC0001234" },
    { id: "LN-2024-005", customer: "Priya Verma", amount: 200000, approvedDate: "2024-01-18", type: "Home", bank: "SBI", acc: "30201234567", ifsc: "SBIN0004567" },
    { id: "LN-2024-008", customer: "Karan Singh", amount: 150000, approvedDate: "2024-01-20", type: "Business", bank: "ICICI Bank", acc: "111222333444", ifsc: "ICIC0008888" },
  ]);

  // Centralized DV Store (This holds items for Vouchers, Auth, and Payment tabs)
  const [allDVs, setAllDVs] = useState([
    { dvNo: "DV-1001", loanId: "LN-2023-099", customer: "Amit Kumar", amount: 100000, status: "Created", date: "2024-01-20", bank: "Axis Bank" },
    { dvNo: "DV-1002", loanId: "LN-2023-098", customer: "Sneha Gupta", amount: 75000, status: "Pending Auth", date: "2024-01-19", bank: "Kotak Bank" },
    { dvNo: "DV-0999", loanId: "LN-2023-050", customer: "Vikram Singh", amount: 500000, status: "Authorized", date: "2024-01-18", bank: "HDFC Bank" }
  ]);

  // --- FORM STATES ---
  const [dvForm, setDvForm] = useState({ date: new Date().toISOString().split('T')[0], mode: 'NEFT', remarks: '' });
  const [amortForm, setAmortForm] = useState({ amount: 500000, rate: 12, tenure: 24, schedule: [] });

  // --- ACTIONS & LOGIC ---

  // 1. Create DV Logic
  const handleOpenCreateDV = (loan) => {
    setSelectedItem(loan);
    setDvForm({ date: new Date().toISOString().split('T')[0], mode: 'NEFT', remarks: '' });
    setModalType('createDV');
    setShowModal(true);
  };

  const submitCreateDV = () => {
    // 1. Add to DV List
    const newDV = {
      dvNo: `DV-${1000 + allDVs.length + 1}`,
      loanId: selectedItem.id,
      customer: selectedItem.customer,
      amount: selectedItem.amount,
      status: "Pending Auth", // Workflow: Pending -> Pending Auth
      date: dvForm.date,
      bank: selectedItem.bank,
      ...dvForm
    };
    setAllDVs([...allDVs, newDV]);

    // 2. Remove from Pending List
    setPendingLoans(pendingLoans.filter(l => l.id !== selectedItem.id));

    setShowModal(false);
    alert(`Disbursement Voucher ${newDV.dvNo} Created Successfully! Moved to Authorization Queue.`);
    setActiveTab('auth'); // Auto switch to Auth tab to show flow
  };

  // 2. Authorization Logic
  const handleAuthorize = (dvNo) => {
    if(window.confirm("Are you sure you want to authorize this payment?")) {
      setAllDVs(allDVs.map(dv => 
        dv.dvNo === dvNo ? { ...dv, status: "Authorized" } : dv
      ));
      alert("Payment Authorized! Moved to Payment Initiation Queue.");
      setActiveTab('payments');
    }
  };

  const handleReject = (dvNo) => {
    if(window.confirm("Reject this voucher? It will be sent back for correction.")) {
      setAllDVs(allDVs.map(dv => 
        dv.dvNo === dvNo ? { ...dv, status: "Rejected" } : dv
      ));
    }
  };

  // 3. Payment Initiation Logic
  const handleInitiatePayment = (dvNo) => {
    // Simulating Bank API call
    setTimeout(() => {
      setAllDVs(allDVs.map(dv => 
        dv.dvNo === dvNo ? { ...dv, status: "Disbursed" } : dv
      ));
      alert("Fund Transfer Initiated Successfully!");
    }, 1000); // 1 sec delay for realism
  };

  // 4. Amortization Calculator Logic
  const calculateAmortization = () => {
    const P = parseFloat(amortForm.amount);
    const r = parseFloat(amortForm.rate) / 12 / 100;
    const n = parseFloat(amortForm.tenure);

    // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    let balance = P;
    const newSchedule = [];
    const today = new Date();

    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = emi - interest;
      balance -= principal;
      
      // Calculate Date
      const date = new Date(today);
      date.setMonth(today.getMonth() + i);

      newSchedule.push({
        no: i,
        date: date.toLocaleDateString(),
        opening: (balance + principal).toFixed(2),
        emi: emi.toFixed(2),
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        closing: balance > 0 ? balance.toFixed(2) : "0.00"
      });
    }
    setAmortForm({ ...amortForm, schedule: newSchedule });
  };

  // --- FILTERED DATA ---
  const getFilteredData = (data) => {
    return data.filter(item => 
      (item.customer?.toLowerCase().includes(searchQuery.toLowerCase()) || 
       item.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.loanId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.dvNo?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  // --- RENDERERS ---

  // 1. Pending List
  const RenderPending = () => {
    const data = getFilteredData(pendingLoans);
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Pending For Disbursement ({data.length})</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Search Loan ID/Name..." className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Loan ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Approved Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((loan) => (
              <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-blue-600 font-medium">{loan.id}</td>
                <td className="px-6 py-4 font-medium">{loan.customer}</td>
                <td className="px-6 py-4">₹{loan.amount.toLocaleString()}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">{loan.type}</span></td>
                <td className="px-6 py-4 text-gray-500">{loan.approvedDate}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleOpenCreateDV(loan)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2 ml-auto transition-all transform active:scale-95">
                    <Plus size={16} /> Create DV
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan="6" className="p-8 text-center text-gray-400">No pending loans found.</td></tr>}
          </tbody>
        </table>
      </div>
    );
  };

  // 2. Vouchers List (Master List of all DVs)
  const RenderVouchers = () => {
    const data = getFilteredData(allDVs); // Show all DVs regardless of status here
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">All Disbursement Vouchers</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Search DV No..." className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">DV No</th>
              <th className="px-6 py-4">Loan ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((dv) => (
              <tr key={dv.dvNo} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono text-gray-600">{dv.dvNo}</td>
                <td className="px-6 py-4 text-blue-600">{dv.loanId}</td>
                <td className="px-6 py-4 font-medium">{dv.customer}</td>
                <td className="px-6 py-4 font-bold text-gray-800">₹{dv.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border 
                    ${dv.status === 'Disbursed' ? 'bg-green-50 text-green-700 border-green-100' : 
                      dv.status === 'Authorized' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 
                      'bg-orange-50 text-orange-700 border-orange-100'}`}>
                    {dv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => { setSelectedItem(dv); setModalType('viewDV'); setShowModal(true); }} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded" title="View/Print"><Eye size={16} /></button>
                    {dv.status === 'Created' && <button className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded" title="Edit"><Edit size={16} /></button>}
                    <button className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded" title="Print"><Printer size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // 3. Authorization Queue
  const RenderAuth = () => {
    const data = getFilteredData(allDVs.filter(dv => dv.status === "Pending Auth"));
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">Payment Authorization Queue ({data.length})</h3>
          <p className="text-gray-500 text-sm">Approve DVs for payment processing.</p>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">DV No</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Bank</th>
              <th className="px-6 py-4 text-right">Decision</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.dvNo} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono">{item.dvNo}</td>
                <td className="px-6 py-4 font-medium">{item.customer}</td>
                <td className="px-6 py-4 font-bold">₹{item.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.bank}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => handleReject(item.dvNo)} className="px-4 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm hover:bg-red-100 font-medium transition">Reject</button>
                    <button onClick={() => handleAuthorize(item.dvNo)} className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 shadow-sm font-medium flex items-center gap-2 transition transform active:scale-95">
                      <ShieldCheck size={14} /> Authorize
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-gray-400">No pending authorizations.</td></tr>}
          </tbody>
        </table>
      </div>
    );
  };

  // 4. Payment Initiation
  const RenderPayments = () => {
    const data = getFilteredData(allDVs.filter(dv => dv.status === "Authorized"));
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">Ready for Payment Initiation ({data.length})</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">DV No</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Bank</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((pay) => (
              <tr key={pay.dvNo} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono">{pay.dvNo}</td>
                <td className="px-6 py-4 font-medium">{pay.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{pay.bank}</td>
                <td className="px-6 py-4 font-bold text-green-700">₹{pay.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleInitiatePayment(pay.dvNo)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 font-medium flex items-center gap-2 ml-auto transition transform active:scale-95">
                    <Send size={16} /> Initiate Transfer
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-gray-400">No payments pending.</td></tr>}
          </tbody>
        </table>
      </div>
    );
  };

  // --- MODALS ---
  
  const CreateDVModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-10">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-lg text-gray-800">Create Disbursement Voucher</h3>
          <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-200 rounded-full"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div><span className="text-xs text-blue-600 uppercase font-bold">Loan ID</span><div className="font-bold text-gray-800">{selectedItem?.id}</div></div>
            <div><span className="text-xs text-blue-600 uppercase font-bold">Customer</span><div className="font-bold text-gray-800">{selectedItem?.customer}</div></div>
            <div><span className="text-xs text-blue-600 uppercase font-bold">Approved Amount</span><div className="font-bold text-green-700">₹{selectedItem?.amount.toLocaleString()}</div></div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Disbursement Date</label><input type="date" value={dvForm.date} onChange={(e)=>setDvForm({...dvForm, date: e.target.value})} className="w-full p-2.5 border rounded-lg focus:border-blue-500 outline-none" /></div>
            <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Payment Mode</label><select value={dvForm.mode} onChange={(e)=>setDvForm({...dvForm, mode: e.target.value})} className="w-full p-2.5 border rounded-lg outline-none"><option>NEFT</option><option>RTGS</option><option>IMPS</option><option>Cheque</option></select></div>
            <div className="col-span-2"><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Beneficiary Bank Details</label><textarea className="w-full p-2.5 border rounded-lg bg-gray-50 text-gray-600" readOnly rows="2" value={`${selectedItem?.bank}, Acc: ${selectedItem?.acc}, IFSC: ${selectedItem?.ifsc} (Auto-fetched)`}></textarea></div>
            <div className="col-span-2"><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Remarks</label><textarea value={dvForm.remarks} onChange={(e)=>setDvForm({...dvForm, remarks: e.target.value})} className="w-full p-2.5 border rounded-lg focus:border-blue-500 outline-none" placeholder="Enter notes..."></textarea></div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
          <button onClick={submitCreateDV} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg font-medium transition transform active:scale-95">Generate DV</button>
        </div>
      </div>
    </div>
  );

  const AmortizationModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom-10">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2"><Calculator size={20}/> Amortization Calculator</h3>
          <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-200 rounded-full"><X size={20} /></button>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 border-b">
           <div><label className="text-xs font-bold text-gray-500">Loan Amount (₹)</label><input type="number" value={amortForm.amount} onChange={(e)=>setAmortForm({...amortForm, amount: e.target.value})} className="w-full mt-1 p-2 border rounded outline-none" /></div>
           <div><label className="text-xs font-bold text-gray-500">Rate (% p.a)</label><input type="number" value={amortForm.rate} onChange={(e)=>setAmortForm({...amortForm, rate: e.target.value})} className="w-full mt-1 p-2 border rounded outline-none" /></div>
           <div><label className="text-xs font-bold text-gray-500">Tenure (Months)</label><input type="number" value={amortForm.tenure} onChange={(e)=>setAmortForm({...amortForm, tenure: e.target.value})} className="w-full mt-1 p-2 border rounded outline-none" /></div>
           <div className="flex items-end"><button onClick={calculateAmortization} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">Calculate Schedule</button></div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
           {amortForm.schedule.length > 0 ? (
             <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 sticky top-0">
                   <tr><th className="p-3">#</th><th className="p-3">Date</th><th className="p-3">Opening</th><th className="p-3">EMI</th><th className="p-3">Principal</th><th className="p-3">Interest</th><th className="p-3">Closing</th></tr>
                </thead>
                <tbody className="divide-y">
                   {amortForm.schedule.map(row => (
                      <tr key={row.no}>
                         <td className="p-3">{row.no}</td>
                         <td className="p-3">{row.date}</td>
                         <td className="p-3">₹{row.opening}</td>
                         <td className="p-3 font-bold text-blue-600">₹{row.emi}</td>
                         <td className="p-3">₹{row.principal}</td>
                         <td className="p-3 text-red-500">₹{row.interest}</td>
                         <td className="p-3">₹{row.closing}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
           ) : (
             <div className="text-center py-10 text-gray-400">Enter details and click Calculate to view schedule.</div>
           )}
        </div>
        <div className="p-4 border-t flex justify-end gap-2 bg-gray-50">
           <button className="px-4 py-2 border rounded hover:bg-gray-100 flex items-center gap-2" onClick={() => window.print()}><Printer size={16}/> Print</button>
           <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"><Download size={16}/> Download PDF</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Disbursement Management</h1>
          <p className="text-gray-500 mt-1">Manage DVs, authorizations, and fund transfers efficiently.</p>
        </div>
        <button onClick={() => { setModalType('amortization'); setShowModal(true); }} className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 shadow-sm flex items-center gap-2 transition">
           <Calculator size={18} /> Amortization Tool
        </button>
      </div>

      {/* TABS */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2 border-b border-gray-200 no-scrollbar">
        {[
          { id: 'pending', label: 'Pending Disbursement', icon: <Clock size={18}/>, count: pendingLoans.length },
          { id: 'auth', label: 'Authorization', icon: <ShieldCheck size={18}/>, count: allDVs.filter(d=>d.status==='Pending Auth').length },
          { id: 'payments', label: 'Payment Initiation', icon: <CreditCard size={18}/>, count: allDVs.filter(d=>d.status==='Authorized').length },
          { id: 'vouchers', label: 'All Vouchers (History)', icon: <FileText size={18}/> },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-medium transition-all relative top-[1px] whitespace-nowrap
              ${activeTab === tab.id 
                ? 'bg-white text-blue-600 border border-gray-200 border-b-white z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          >
            {tab.icon} {tab.label}
            {tab.count !== undefined && tab.count > 0 && <span className="ml-1 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div>
        {activeTab === 'pending' && <RenderPending />}
        {activeTab === 'vouchers' && <RenderVouchers />}
        {activeTab === 'auth' && <RenderAuth />}
        {activeTab === 'payments' && <RenderPayments />}
      </div>

      {/* MODALS */}
      {showModal && modalType === 'createDV' && <CreateDVModal />}
      {showModal && modalType === 'amortization' && <AmortizationModal />}
      
      {/* Simple View DV Modal */}
      {showModal && modalType === 'viewDV' && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center animate-in zoom-in-95">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <FileText size={32} />
               </div>
               <h3 className="text-xl font-bold mb-2">Voucher #{selectedItem?.dvNo}</h3>
               <p className="text-gray-500">Generated for <span className="font-bold text-gray-800">{selectedItem?.customer}</span></p>
               <p className="text-2xl font-bold text-green-600 mt-2">₹{selectedItem?.amount.toLocaleString()}</p>
               <div className="mt-2 text-sm text-gray-400">Status: {selectedItem?.status}</div>
               
               <div className="flex gap-3 justify-center mt-8">
                  <button onClick={() => setShowModal(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition">Close</button>
                  <button onClick={() => window.print()} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"><Printer size={16}/> Print Voucher</button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
}