import React, { useState } from "react";
import {
  FileText,
  Clock,
  CreditCard,
  Search,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  Banknote,
  User,
  Building,
  Calendar,
  Send,
  Download,
  Printer,
  Shield,
  ChevronRight
} from "lucide-react";

// External Component Import
import Pagination from "../../../components/admin/common/Pagination";

export default function DisbursementManagement() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- MOCK DATABASE ---
  const [pendingLoans, setPendingLoans] = useState([
    { id: "LN-2024-001", customer: "Rahul Sharma", amount: 50000, approvedDate: "2024-01-15", type: "Personal", bank: "HDFC Bank", acc: "501002345678", ifsc: "HDFC0001234" },
    { id: "LN-2024-002", customer: "Amit Patel", amount: 75000, approvedDate: "2024-01-16", type: "Personal", bank: "SBI", acc: "30201234567", ifsc: "SBIN0004567" },
    { id: "LN-2024-003", customer: "Priya Verma", amount: 200000, approvedDate: "2024-01-18", type: "Home", bank: "ICICI Bank", acc: "111222333444", ifsc: "ICIC0008888" },
    { id: "LN-2024-004", customer: "Karan Singh", amount: 150000, approvedDate: "2024-01-20", type: "Business", bank: "Axis Bank", acc: "555566667777", ifsc: "UTIB0001234" },
    { id: "LN-2024-005", customer: "Sneha Reddy", amount: 100000, approvedDate: "2024-01-22", type: "Education", bank: "Kotak Bank", acc: "888899990000", ifsc: "KKBK0005678" },
  ]);

  const [allDVs, setAllDVs] = useState([
    { dvNo: "DV-1001", loanId: "LN-2023-099", customer: "Amit Kumar", amount: 100000, status: "approved", date: "2024-01-20", bank: "Axis Bank" },
    { dvNo: "DV-1002", loanId: "LN-2023-098", customer: "Sneha Gupta", amount: 75000, status: "approved", date: "2024-01-19", bank: "Kotak Bank" },
    { dvNo: "DV-0999", loanId: "LN-2023-050", customer: "Vikram Singh", amount: 500000, status: "paid", date: "2024-01-18", bank: "HDFC Bank" },
    { dvNo: "DV-1003", loanId: "LN-2023-051", customer: "Ravi Sharma", amount: 250000, status: "paid", date: "2024-01-17", bank: "ICICI Bank" },
  ]);

  const [dvForm, setDvForm] = useState({ 
    date: new Date().toISOString().split("T")[0], 
    mode: "NEFT" 
  });

  // --- SIMPLIFIED TAB MAPPING ---
  const tabData = {
    pending: {
      title: "Pending Loans",
      data: pendingLoans.filter(l => 
        l.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.id.toLowerCase().includes(searchQuery.toLowerCase())
      ),
      icon: <Clock size={18} />,
      color: "orange"
    },
    approved: {
      title: "Approved for Payment",
      data: allDVs.filter(dv => dv.status === "approved"),
      icon: <Shield size={18} />,
      color: "blue"
    },
    paid: {
      title: "Paid Vouchers",
      data: allDVs.filter(dv => dv.status === "paid"),
      icon: <CreditCard size={18} />,
      color: "green"
    }
  };

  // --- DISBURSEMENT ACTIONS ---
  const handleCreateDV = (loan) => {
    setSelectedLoan(loan);
    setShowCreateModal(true);
  };

  const submitCreateDV = () => {
    const newDV = {
      dvNo: `DV-${1000 + allDVs.length + 1}`,
      loanId: selectedLoan.id,
      customer: selectedLoan.customer,
      amount: selectedLoan.amount,
      status: "approved",
      date: dvForm.date,
      bank: selectedLoan.bank,
      mode: dvForm.mode,
    };
    
    setAllDVs([...allDVs, newDV]);
    setPendingLoans(pendingLoans.filter((l) => l.id !== selectedLoan.id));
    
    setShowCreateModal(false);
    setActiveTab("approved");
    setCurrentPage(1);
  };

  const handlePayNow = (dv) => {
    setAllDVs(allDVs.map(item => 
      item.dvNo === dv.dvNo ? { ...item, status: "paid" } : item
    ));
    alert(`Payment of ₹${dv.amount.toLocaleString()} initiated for ${dv.customer}`);
  };

  const handleViewDetails = (item) => {
    setSelectedLoan(item);
    setShowDetailsModal(true);
  };

  // --- PAGINATION ---
  const currentTab = tabData[activeTab];
  const totalItems = currentTab.data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  const currentPageData = currentTab.data.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    setSearchQuery("");
  };

  // --- STATUS BADGE COMPONENT ---
  const StatusBadge = ({ status }) => {
    const config = {
      pending: { label: "Pending", color: "bg-orange-100 text-orange-700 border-orange-200" },
      approved: { label: "Approved", color: "bg-blue-100 text-blue-700 border-blue-200" },
      paid: { label: "Paid", color: "bg-green-100 text-green-700 border-green-200" }
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config[status]?.color || "bg-gray-100 text-gray-700"}`}>
        {config[status]?.label || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* HEADER - SIMPLIFIED */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
          <span>Admin</span>
          <ChevronRight size={14} />
          <span className="text-blue-600">Disbursement</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Disbursement</h1>
        <p className="text-gray-500 mt-1">Manage loan payments to customers</p>
      </div>

      {/* TABS - SIMPLIFIED */}
      <div className="flex gap-1 mb-6 bg-white p-1 rounded-xl border border-gray-200 shadow-sm w-fit">
        {Object.entries(tabData).map(([key, tab]) => (
          <button
            key={key}
            onClick={() => handleTabChange(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === key 
                ? "bg-blue-50 text-blue-600 border border-blue-100 shadow-sm" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {tab.icon}
            {tab.title}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === key ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
            }`}>
              {tab.data.length}
            </span>
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* SEARCH BAR */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <div>
            <h2 className="font-bold text-gray-800">{currentTab.title}</h2>
            <p className="text-sm text-gray-500">
              {totalItems === 0 ? "No loans" : `Showing ${totalItems} loan${totalItems !== 1 ? 's' : ''}`}
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Name or Loan ID"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan ID</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Bank</th>
                {activeTab !== "pending" && (
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                )}
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentPageData.length === 0 ? (
                <tr>
                  <td colSpan={activeTab !== "pending" ? 6 : 5} className="p-12 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <Clock size={24} />
                      <p>No {currentTab.title.toLowerCase()} found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentPageData.map((item) => (
                  <tr key={item.id || item.dvNo} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-800">{item.customer}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-mono text-blue-600">{item.loanId || item.id}</div>
                      {item.dvNo && <div className="text-xs text-gray-500">{item.dvNo}</div>}
                    </td>
                    <td className="p-4 font-bold text-gray-900">
                      ₹{item.amount.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{item.bank}</div>
                    </td>
                    {activeTab !== "pending" && (
                      <td className="p-4">
                        <StatusBadge status={item.status} />
                      </td>
                    )}
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        {/* VIEW BUTTON */}
                        <button
                          onClick={() => handleViewDetails(item)}
                          className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-1 transition-colors"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        
                        {/* ACTION BUTTON */}
                        {activeTab === "pending" && (
                          <button
                            onClick={() => handleCreateDV(item)}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1 transition-colors"
                          >
                            <Send size={14} />
                            Disburse
                          </button>
                        )}
                        
                        {activeTab === "approved" && (
                          <button
                            onClick={() => handlePayNow(item)}
                            className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-1 transition-colors"
                          >
                            <CreditCard size={14} />
                            Pay Now
                          </button>
                        )}
                        
                        {activeTab === "paid" && (
                          <button
                            onClick={() => window.print()}
                            className="px-3 py-1.5 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 flex items-center gap-1 transition-colors"
                          >
                            <Printer size={14} />
                            Print
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <p className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                buttonClassName="px-3 py-1 border rounded hover:bg-gray-50"
                activeButtonClassName="bg-blue-600 text-white border-blue-600"
              />
            </div>
          </div>
        )}
      </div>

      {/* MODAL: CREATE DISBURSEMENT */}
      {showCreateModal && selectedLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            {/* HEADER */}
            <div className="p-5 border-b flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Create Disbursement</h3>
                <p className="text-sm text-gray-500">Send payment to customer</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="hover:bg-gray-100 p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* LOAN INFO */}
            <div className="p-5 space-y-3 bg-blue-50/50 m-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Customer:</span>
                <span className="font-medium">{selectedLoan.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Loan ID:</span>
                <span className="font-mono text-blue-600">{selectedLoan.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Amount:</span>
                <span className="font-bold text-lg">₹{selectedLoan.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Bank:</span>
                <span className="font-medium">{selectedLoan.bank}</span>
              </div>
            </div>

            {/* FORM */}
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Disbursement Date
                </label>
                <input 
                  type="date"
                  value={dvForm.date}
                  onChange={(e) => setDvForm({...dvForm, date: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select 
                  value={dvForm.mode}
                  onChange={(e) => setDvForm({...dvForm, mode: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="NEFT">NEFT</option>
                  <option value="IMPS">IMPS</option>
                  <option value="RTGS">RTGS</option>
                </select>
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-5 border-t flex justify-end gap-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={submitCreateDV}
                className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send size={16} />
                Generate Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VIEW DETAILS */}
      {showDetailsModal && selectedLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-5 border-b flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Loan Details</h3>
                <p className="text-sm text-gray-500">{selectedLoan.id}</p>
              </div>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="hover:bg-gray-100 p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{selectedLoan.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Loan Type</p>
                  <p className="font-medium">{selectedLoan.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-bold">₹{selectedLoan.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Approved Date</p>
                  <p className="font-medium">{selectedLoan.approvedDate}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Building size={16} />
                  Bank Details
                </h4>
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Bank:</span>
                    <span className="font-medium">{selectedLoan.bank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Account:</span>
                    <span className="font-mono">{selectedLoan.acc}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">IFSC:</span>
                    <span className="font-mono">{selectedLoan.ifsc}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t">
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}