import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Check,
  X
} from "lucide-react";
import ActionMenu from "../../../components/admin/AdminButtons/ActionMenu";
import ExportButton from "../../../components/admin/AdminButtons/ExportButton";
import Pagination from "../../../components/admin/common/Pagination";
import Button from "../../../components/admin/common/Button";
import LoanStatementPopup from "../../../components/admin/modals/LoanStatementPopup";
import ViewDetails from "../../../components/admin/modals/ViewDetails";

export default function LoanEntry() {
  // ------------------ STATE ------------------
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // हर page पर कितने items show होंगे
  const [searchTerm, setSearchTerm] = useState("");
  const [showStatementPopup, setShowStatementPopup] = useState(false);
  const [selectedLoanAccount, setSelectedLoanAccount] = useState("");
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [viewDetailsData, setViewDetailsData] = useState(null);





  // Sample data for applications (Unique IDs और varied data के साथ)
  const [applications, setApplications] = useState([
    { id: 1, customer: "Rahul Sharma", loanAmount: "₹50,000", status: "Pending", applicationDate: "2025-01-15", type: "Personal",loanNumber: "LN-2025-001", },
    { id: 2, customer: "Priya Patel", loanAmount: "₹75,000", status: "Under Review", applicationDate: "2025-01-14", type: "Business" },
    { id: 3, customer: "Amit Kumar", loanAmount: "₹1,00,000", status: "Approved", applicationDate: "2025-01-10", type: "Home" },
    { id: 4, customer: "Sneha Gupta", loanAmount: "₹2,50,000", status: "Rejected", applicationDate: "2025-01-08", type: "Education" },
    { id: 5, customer: "Ravi Verma", loanAmount: "₹1,50,000", status: "Pending", applicationDate: "2025-01-05", type: "Personal" },
    { id: 6, customer: "Meera Singh", loanAmount: "₹3,00,000", status: "Approved", applicationDate: "2025-01-03", type: "Business" },
    { id: 7, customer: "Karan Malhotra", loanAmount: "₹80,000", status: "Under Review", applicationDate: "2025-01-02", type: "Education" },
    { id: 8, customer: "Pooja Reddy", loanAmount: "₹2,00,000", status: "Pending", applicationDate: "2024-12-30", type: "Home" },
    { id: 9, customer: "Vikram Joshi", loanAmount: "₹1,20,000", status: "Approved", applicationDate: "2024-12-28", type: "Personal" },
    { id: 10, customer: "Anjali Desai", loanAmount: "₹4,00,000", status: "Rejected", applicationDate: "2024-12-25", type: "Business" },
    { id: 11, customer: "Rajesh Nair", loanAmount: "₹90,000", status: "Pending", applicationDate: "2024-12-20", type: "Education" },
    { id: 12, customer: "Suman Tiwari", loanAmount: "₹1,80,000", status: "Under Review", applicationDate: "2024-12-18", type: "Home" }
  ]);

  // 1️⃣ FILTERED DATA (PEHLE)
  const filteredApplications = applications.filter(app => {
  const search = searchTerm.toLowerCase();
  if (!search) return true;


  return (
    app.customer.toLowerCase().includes(search) ||
    app.type.toLowerCase().includes(search) ||
    app.loanNumber?.toLowerCase().includes(search)
  );
});

  // ------------------ PAGINATION CALCULATIONS ------------------
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const currentApplications = filteredApplications.slice(startIndex, endIndex);

  

  const handleExport = () => {
    const headers = ["Customer", "Loan Type", "Amount", "Status", "Application Date"];
    const rows = applications.map(app => [
      app.customer,
      app.type,
      app.loanAmount,
      app.status,
      app.applicationDate,
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "loan-applications.csv";

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
          <p className="text-gray-500 mt-1">Manage loan applications and approvals.</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              setSelectedLoanAccount("LN-2025-001"); // ya dynamic loan number
              setShowStatementPopup(true);
            }}
          >
            Download Statement
          </Button>
          <ExportButton
            label="Export"
            onClick={handleExport}
          />
        </div>

      </div>

      {/* Main Content Area */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 h-[520px] relative">
        <div className="p-6 h-0">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">Loan Applications</h2>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />



              </div>
           

            </div>
          </div>

          <div className="h-[340px] overflow-y-auto overflow-x-auto rounded-xl border border-gray-100">


            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b text-left">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan No</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
         <tbody className="divide-y divide-gray-100">
  {currentApplications.map(app => (
    <tr key={app.id} className="hover:bg-gray-50/80">

      {/* CUSTOMER */}
      <td className="p-4 font-medium text-gray-800">
        {app.customer}
      </td>

      {/* TYPE */}
      <td className="p-4 text-gray-600 text-sm">
        {app.type}
      </td>

      {/* AMOUNT */}
      <td className="p-4 font-semibold text-gray-900">
        {app.loanAmount}
      </td>

      {/* DATE */}
      <td className="p-4 text-gray-500 text-sm">
        {app.applicationDate}
      </td>

      {/* LOAN NUMBER */}
      <td className="p-4 text-sm font-mono text-blue-600">
        {app.loanNumber}
      </td>

      {/* ACTIONS */}
      <td className="p-4 text-right">
        <ActionMenu
          position="bottom-right"
          items={[
            {
              label: "View Details",
              icon: Eye,
              onClick: () => {
                setViewDetailsData(app);
                setShowViewDetails(true);
              }
            }
          ]}
        />
      </td>

    </tr>
  ))}
</tbody>

            </table>
          </div>

          {/* PAGINATION COMPONENT */}
          <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-white border-t border-gray-200 px-6">
            <div className="flex items-center justify-between h-full">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}–{Math.min(endIndex, applications.length)} of {applications.length}
              </p>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                containerClassName="justify-end"
                buttonClassName="hover:bg-gray-100 transition-colors"
                activeButtonClassName="bg-blue-600 text-white"
              />
            </div>
          </div>

        </div>
      </div>
      <ViewDetails
        isOpen={showViewDetails}
        onClose={() => setShowViewDetails(false)}
        title="Loan Details"
        data={viewDetailsData}
      />

      <LoanStatementPopup
        isOpen={showStatementPopup}
        loanAccountNumber={selectedLoanAccount}
        onClose={() => setShowStatementPopup(false)}
      />


      {selectedLoan && <LoanModal loan={selectedLoan} onClose={() => setSelectedLoan(null)} />}
    </div>
  );
}