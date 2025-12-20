import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  Edit,
  Calendar,
  Briefcase,
  Download,
} from "lucide-react";
import ActionMenu from "../../../components/admin/AdminButtons/ActionMenu";
import ExportButton from "../../../components/admin/AdminButtons/ExportButton";

export default function LoanEntry() {

  // ------------------ STATE ------------------
  const [activeTab, setActiveTab] = useState("viewModify");
  const [selectedLoan, setSelectedLoan] = useState(null);
  // Sample data
  const [applications, setApplications] = useState([
    { id: 1, customer: "Rahul Sharma", loanAmount: "₹50,000", status: "Pending", applicationDate: "2025-01-15", type: "Personal" },
    { id: 2, customer: "Priya Patel", loanAmount: "₹75,000", status: "Under Review", applicationDate: "2025-01-14", type: "Business" },
    { id: 3, customer: "Amit Kumar", loanAmount: "₹1,00,000", status: "Approved", applicationDate: "2025-01-10", type: "Home" },
    { id: 4, customer: "Sneha Gupta", loanAmount: "₹2,50,000", status: "Rejected", applicationDate: "2025-01-08", type: "Education" }
  ]);

  const bookingList = [
    { id: 1, customer: "Amit Verma", loanAmount: "₹1,20,000", emiStart: "10 Dec 2025", disbursementDate: "15 Jan 2025", tenure: "24 months" },
    { id: 2, customer: "Neha Singh", loanAmount: "₹80,000", emiStart: "05 Jan 2025", disbursementDate: "20 Dec 2024", tenure: "18 months" },
    { id: 3, customer: "Rajesh Mehta", loanAmount: "₹2,00,000", emiStart: "20 Feb 2025", disbursementDate: "10 Jan 2025", tenure: "36 months" }
  ];

  // ------------------ FUNCTIONS ------------------
  const updateStatus = (id, newStatus) => {
    setApplications(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  // ------------------ MODAL COMPONENT ------------------
  const LoanModal = ({ loan, onClose }) => {
    if (!loan) return null;
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl animate-in fade-in zoom-in duration-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{loan.customer} Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-black p-1 hover:bg-gray-100 rounded-lg">
              <X size={22} />
            </button>
          </div>
          <div className="space-y-3 py-2">
            <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Loan Amount</span><span className="font-semibold">{loan.loanAmount}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Status</span><span className="font-semibold">{loan.status}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Application Date</span><span className="font-semibold">{loan.applicationDate}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Loan Type</span><span className="font-semibold">{loan.type}</span></div>
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => { updateStatus(loan.id, "Approved"); onClose(); }} className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors">Approve</button>
            <button onClick={() => { updateStatus(loan.id, "Rejected"); onClose(); }} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-medium hover:bg-red-700 transition-colors">Reject</button>
          </div>
        </div>
      </div>
    );
  };


  const handleExport = () => {
  // 👉 Kis tab ka data export karna hai
  const isLoanTab = activeTab === "viewModify";

  const headers = isLoanTab
    ? ["Customer", "Loan Type", "Amount", "Status", "Application Date"]
    : ["Customer", "Disbursement Date", "EMI Start", "Amount", "Tenure"];

  const rows = isLoanTab
    ? applications.map(app => [
        app.customer,
        app.type,
        app.loanAmount,
        app.status,
        app.applicationDate,
      ])
    : bookingList.map(b => [
        b.customer,
        b.disbursementDate,
        b.emiStart,
        b.loanAmount,
        b.tenure,
      ]);

  const csvContent = [headers, ...rows]
    .map(row => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = isLoanTab
    ? "loan-applications.csv"
    : "booking-list.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 lg:p-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Loan Management</h1>
          <p className="text-gray-500 mt-1">Manage loan applications, approvals, and booking records.</p>
        </div>
        <ExportButton 
         label="Export"
         onClick={handleExport}
        />
      </div>

   

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button className={`flex-1 px-6 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === "viewModify" ? "bg-blue-50/50 text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`} onClick={() => setActiveTab("viewModify")}><Briefcase size={18} /> View / Modify Loan</button>
          <button className={`flex-1 px-6 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === "bookingList" ? "bg-blue-50/50 text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`} onClick={() => setActiveTab("bookingList")}><Calendar size={18} /> Update Booking List</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden min-h-[500px]">
        {activeTab === "viewModify" && (
          <div className="p-6">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div><h2 className="text-xl font-bold text-gray-800">Loan Applications</h2><p className="text-sm text-gray-500">Review and process recent requests</p></div>
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input type="text" placeholder="Search..." className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" /></div>
                <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600"><Filter size={18} /></button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b text-left">
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {applications.map(app => (
                    <tr key={app.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">{app.customer.charAt(0)}</div>
                          <span className="font-medium text-gray-800">{app.customer}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 text-sm">{app.type}</td>
                      <td className="p-4 font-semibold text-gray-900">{app.loanAmount}</td>
                      <td className="p-4 text-gray-500 text-sm">{app.applicationDate}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border 
                          ${app.status === "Approved" ? "bg-green-50 text-green-700 border-green-100" : ""}
                          ${app.status === "Pending" ? "bg-orange-50 text-orange-700 border-orange-100" : ""}
                          ${app.status === "Under Review" ? "bg-blue-50 text-blue-700 border-blue-100" : ""}
                          ${app.status === "Rejected" ? "bg-red-50 text-red-700 border-red-100" : ""}
                        `}>{app.status}</span>
                      </td>

                      {/* THREE DOTS ACTION MENU */}
                   <td className="p-4 text-right">
                      <ActionMenu
                        position="bottom-right"
                        showStatus
                        statusInfo={{
                          title: app.customer,
                          status: app.status.toLowerCase(),
                          statusText: app.status,
                          subtitle: app.applicationDate
                        }}
                        items={[
                          {
                            label: "View Details",
                            icon: <Eye size={16} />,
                            onClick: () => setSelectedLoan(app)
                          },
                          {
                            label: "Approve Loan",
                            icon: <Check size={16} />,
                            onClick: () => updateStatus(app.id, "Approved"),
                            disabled: app.status === "Approved",
                            badge: app.status === "Approved" ? "Done" : null,
                            badgeColor: "green"
                          },
                          {
                            label: "Reject Loan",
                            icon: <X size={16} />,
                            danger: true,
                            onClick: () => updateStatus(app.id, "Rejected"),
                            disabled: app.status === "Rejected"
                          }
                        ]}
                      />
                    </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "bookingList" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Booking Records</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b text-left">
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Disbursement</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">EMI Start</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenure</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookingList.map(booking => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium">{booking.customer}</td>
                      <td className="p-4 text-gray-600">{booking.disbursementDate}</td>
                      <td className="p-4 text-gray-600">{booking.emiStart}</td>
                      <td className="p-4 font-semibold">{booking.loanAmount}</td>
                      <td className="p-4 text-gray-600">{booking.tenure}</td>
                      <td className="p-4 text-right">
                        <ActionMenu/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selectedLoan && <LoanModal loan={selectedLoan} onClose={() => setSelectedLoan(null)} />}
    </div>
  );
}