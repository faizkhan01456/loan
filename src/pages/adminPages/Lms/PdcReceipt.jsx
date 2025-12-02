import React, { useState } from "react";
import {
  FileText,
  ClipboardCheck,
  BookOpen,
  Upload,
  Users,
  Search,
  ListChecks,
  ChevronRight,
  Clock,
  DollarSign,
  XCircle,
  Download,
  Filter,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  RotateCcw, // Using the proper Lucide icon name for consistency
  Grid,
  ClipboardList,
} from "lucide-react";

export default function PdcReceipt() {
  const tabs = [
    { name: "PDC Repayment Process", icon: ListChecks },
    { name: "PDC Cheque Detail", icon: FileText },
    { name: "Receipt Entry", icon: ClipboardCheck },
    { name: "Receipt Book Management", icon: BookOpen },
    { name: "Receipt Book Detail", icon: Search },
    { name: "Receipt Bulk Import", icon: Upload },
    { name: "Team Book Distribution", icon: Users },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  // Info Card Component - Redesigned for a more premium look
  const InfoCard = ({ title, value, icon: Icon, colorClass, bgClass, subtext }) => (
    <div className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between transition-all hover:shadow-xl group">
      <div className={`p-3 rounded-full ${bgClass} w-fit mb-3`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{value}</h3>
      <p className="text-xs text-gray-400">{subtext}</p>
    </div>
  );

  // Status Chip - Redesigned with less border, more solid background for status
  const StatusChip = ({ label, status }) => {
    const styles = {
      Cleared: "bg-green-100 text-green-700",
      Pending: "bg-amber-100 text-amber-700",
      Bounced: "bg-red-100 text-red-700",
      "Awaiting Deposit": "bg-blue-100 text-blue-700",
      default: "bg-gray-100 text-gray-700",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.default}`}>
        {label}
      </span>
    );
  };

  const mockCheques = [
    { id: "CHQ001", loan: "LN101", amount: 15500, date: "2025-03-15", status: "Cleared", bank: "HDFC Bank" },
    { id: "CHQ002", loan: "LN102", amount: 22000, date: "2025-04-01", status: "Pending", bank: "ICICI Bank" },
    { id: "CHQ003", loan: "LN103", amount: 10100, date: "2025-03-20", status: "Bounced", bank: "SBI" },
    { id: "CHQ004", loan: "LN104", amount: 45000, date: "2025-04-10", status: "Awaiting Deposit", bank: "Axis Bank" },
    { id: "CHQ005", loan: "LN105", amount: 35000, date: "2025-04-12", status: "Pending", bank: "Kotak Bank" },
  ];
  
  // Custom Button Component for cleaner look
  const ToolbarButton = ({ children, icon: Icon, className = "" }) => (
    <button className={`px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors ${className}`}>
      <Icon size={16} /> {children}
    </button>
  );


  // Render Tab Content
  const renderContent = () => {
    switch (activeTab) {

      // ------------------------------------------------------
      // 1. PDC Repayment Process (Dashboard View)
      // ------------------------------------------------------
      case "PDC Repayment Process":
        return (
          <div className="space-y-8 animate-in fade-in duration-500">

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <InfoCard title="Total PDC Value" value="₹ 5.20 L" icon={DollarSign} colorClass="text-blue-600" bgClass="bg-blue-50" subtext="Across all active loans" />
              <InfoCard title="Cheques Due (7D)" value="12" icon={Clock} colorClass="text-amber-600" bgClass="bg-amber-50" subtext="Immediate priority actions" />
              <InfoCard title="Bounced (30D)" value="2" icon={XCircle} colorClass="text-red-600" bgClass="bg-red-50" subtext="Requires follow-up" />
              <InfoCard title="Awaiting Deposit" value="5" icon={ClipboardList} colorClass="text-green-600" bgClass="bg-green-50" subtext="Ready for bank submission" />
            </div>

            {/* Recent Activity Card */}
            <div className="bg-white rounded-xl shadow-lg border">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <RotateCcw size={20} className="text-blue-600" /> Recent PDC Activity
                </h3>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center">
                  View Full History <ChevronRight size={16} />
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {[
                  { id: "CHQ004", loan: "LN104", amount: "₹ 45,000", status: "Awaiting Deposit", date: "Due: Apr 05, 2025", icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
                  { id: "CHQ005", loan: "LN105", amount: "₹ 35,000", status: "Cleared", date: "Cleared: Mar 28, 2025", icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
                  { id: "CHQ003", loan: "LN103", amount: "₹ 10,100", status: "Bounced", date: "Returned: Mar 20, 2025", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
                  { id: "CHQ002", loan: "LN102", amount: "₹ 22,000", status: "Pending", date: "Due: Apr 01, 2025", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${item.bg}`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{item.id} - Loan {item.loan}</p>
                        <p className="text-xs text-gray-500">{item.date} • <span className="font-bold">{item.amount}</span></p>
                      </div>
                    </div>
                    <StatusChip label={item.status} status={item.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // ------------------------------------------------------
      // 2. PDC Cheque Detail (Table View)
      // ------------------------------------------------------
      case "PDC Cheque Detail":
        return (
          <div className="bg-white rounded-xl shadow-lg border animate-in fade-in duration-500">

            {/* Toolbar - Use ToolbarButton component */}
            <div className="p-4 border-b flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50 rounded-t-xl">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search Cheque or Loan ID..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-colors"
                />
              </div>

              <div className="flex gap-3">
                <ToolbarButton icon={Filter}>Filter Status</ToolbarButton>
                <ToolbarButton icon={Download}>Export CSV</ToolbarButton>
              </div>
            </div>

            {/* CHEQUE TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 border-b border-gray-200 text-gray-600 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Cheque ID</th>
                    <th className="px-6 py-4 font-semibold">Loan Info</th>
                    <th className="px-6 py-4 font-semibold">Bank</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Due Date</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 text-right font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {mockCheques.map((cheque) => (
                    <tr key={cheque.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-gray-700">{cheque.id}</td>
                      <td className="px-6 py-4 text-blue-600 font-medium">{cheque.loan}</td>
                      <td className="px-6 py-4 text-gray-600">{cheque.bank}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">₹ {cheque.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-gray-500">{cheque.date}</td>
                      <td className="px-6 py-4">
                        <StatusChip label={cheque.status} status={cheque.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 text-gray-500 hover:bg-blue-100 rounded-full transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        );

      // ------------------------------------------------------
      // 3. Receipt Entry (Form View)
      // ------------------------------------------------------
      case "Receipt Entry":
        return (
          <div className="max-w-3xl mx-auto animate-in slide-in-from-right duration-500">
            <div className="bg-white p-8 rounded-xl shadow-lg border">

              <h2 className="text-2xl font-bold flex items-center gap-3 mb-8 pb-4 border-b">
                <ClipboardCheck className="text-blue-600 w-6 h-6" /> Create New Receipt
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div className="col-span-1 md:col-span-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Loan / Customer ID</label>
                    <input type="text" placeholder="Search customer loan number..." className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500/50 transition-colors" />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Amount (₹)</label>
                    <input type="number" placeholder="0.00" className="w-full p-3 border border-gray-300 rounded-xl font-bold text-lg" />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Date</label>
                    <input type="date" className="w-full p-3 border border-gray-300 rounded-xl" />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Payment Mode</label>
                    <select className="w-full p-3 border border-gray-300 rounded-xl bg-white appearance-none">
                      <option>Cash</option>
                      <option>UPI</option>
                      <option>Cheque</option>
                      <option>NEFT/IMPS</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Reference No. (Cheque/Txn)</label>
                    <input type="text" placeholder="Enter reference number" className="w-full p-3 border border-gray-300 rounded-xl" />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Remarks / Notes</label>
                    <textarea rows="3" placeholder="Any specific details about the payment..." className="w-full p-3 border border-gray-300 rounded-xl"></textarea>
                  </div>

                </div>

                <div className="pt-6 flex justify-end gap-4 border-t">
                  <button className="px-6 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors">Cancel</button>
                  <button className="px-8 py-2.5 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-colors">
                    <span className="flex items-center gap-2">Generate Receipt <ChevronRight size={16} /></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      // ------------------------------------------------------
      // 4. Receipt Book Management
      // ------------------------------------------------------
      case "Receipt Book Management":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">

            {/* Issue Card */}
            <div className="bg-white p-8 rounded-xl border shadow-lg">
              <h3 className="font-extrabold text-2xl text-gray-900 mb-2">Issue New Receipt Book</h3>
              <p className="text-sm text-gray-500 mb-6">Assign a fresh, auditable series to a field agent.</p>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Book Series ID</label>
                  <input type="text" placeholder="e.g. RB-2024-002" className="w-full p-3 border border-gray-300 rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Assign to User ID / Name</label>
                  <input type="text" placeholder="Search user ID or name" className="w-full p-3 border border-gray-300 rounded-xl" />
                </div>
                
                <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition-colors mt-4">
                  Issue & Activate Book
                </button>
              </div>
            </div>

            {/* Return Card */}
            <div className="bg-white p-8 rounded-xl border shadow-lg">
              <h3 className="font-extrabold text-2xl text-gray-900 mb-2">Return & Audit Book</h3>
              <p className="text-sm text-gray-500 mb-6">Process a return and reconcile the used receipt range.</p>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 block">Book ID to Return</label>
                  <input type="text" placeholder="e.g. RB-2024-001" className="w-full p-3 border border-gray-300 rounded-xl" />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border flex justify-between text-sm">
                  <span><span className="font-bold">Issued To:</span> Ramesh Kumar</span>
                  <span><span className="font-bold">Used Count:</span> 48/50</span>
                </div>

                <button className="w-full py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 transition-colors mt-4">
                  Confirm Return & Start Audit
                </button>
              </div>
            </div>
          </div>
        );

      // ------------------------------------------------------
      // 5. Receipt Book Detail (Search/View)
      // ------------------------------------------------------
      case "Receipt Book Detail":
        return (
          <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom duration-500">
            <div className="bg-white rounded-xl border shadow-lg overflow-hidden">

              <div className="p-8 text-center bg-blue-50/50 border-b">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Receipt Book Tracker</h2>
                <p className="text-gray-600 mb-6">Enter Book ID to view utilization and status.</p>

                <div className="relative max-w-sm mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                  <input type="text" placeholder="e.g. RB-2024-001" className="w-full pl-12 pr-4 py-3 border border-blue-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                </div>
              </div>

              {/* Mock Details Panel */}
              <div className="p-8">
                <div className="bg-white border-4 border-blue-100 p-6 rounded-xl shadow-xl">
                  <div className="flex justify-between items-start mb-5">

                    <div>
                      <h3 className="font-extrabold text-2xl text-blue-800 mb-1">Book #RB-2024-001</h3>
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">ACTIVE</span>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-semibold">Assigned To</p>
                      <p className="font-bold text-lg text-gray-900">Ramesh Kumar</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm border-t border-blue-100 pt-5">
                    <div>
                      <span className="text-xs text-gray-500 uppercase">Series Range</span><br />
                      <span className="font-medium text-gray-800">10001 - 10050</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase">Issued Date</span><br />
                      <span className="font-medium text-gray-800">Jan 10, 2025</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase">Used Receipts</span><br />
                      <span className="text-3xl font-extrabold text-blue-600">23 / 50</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase">Last Receipt No.</span><br />
                      <span className="font-medium text-gray-800">10023</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        );

      // ------------------------------------------------------
      // 6. Receipt Bulk Import
      // ------------------------------------------------------
      case "Receipt Bulk Import":
        return (
          <div className="h-96 flex flex-col items-center justify-center p-12 bg-white rounded-xl border-4 border-dashed border-gray-200 hover:border-blue-300 transition-colors duration-300 animate-in fade-in duration-500">

            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 border-4 border-blue-200">
              <Upload className="w-12 h-12 text-blue-600" />
            </div>

            <h2 className="text-3xl font-extrabold mb-2 text-gray-900">Drag & Drop Your File</h2>
            <p className="text-gray-500 text-center mb-8">Supported formats: CSV, XLSX (max 10MB)</p>

            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-colors">
                Select File to Upload
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors">
                <span className="flex items-center gap-2"><Download size={18} /> Download Template</span>
              </button>
            </div>
            
            <p className="text-xs text-gray-400 mt-6">Ensure data follows the required template structure.</p>

          </div>
        );

      // ------------------------------------------------------
      // 7. Team Book Distribution
      // ------------------------------------------------------
      case "Team Book Distribution":
        return (
          <div className="space-y-6 animate-in fade-in duration-500">

            <div className="flex justify-between items-center pb-2 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Receipt Book Team Utilization</h2>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center">
                View All Agents <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {/* Example Team Card */}
              <div className="bg-white p-6 border rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                    <Users size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">North Sales Team</h3>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-gray-900">25</span>
                  <span className="text-sm text-gray-500">Active Books</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">15/25 books are below 20% capacity.</p>

                <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  {/* Example: 2/3 (66%) utilization */}
                  <div className="bg-amber-500 w-[66%] h-2.5 rounded-full" style={{ width: '66.6%' }}></div> 
                </div>
                <p className="text-xs text-amber-600 mt-2 font-semibold">66.6% Avg. Book Utilization</p>

              </div>
              
              {/* More Team Cards could follow here */}
              <div className="bg-white p-6 border rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                    <Users size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">South Operations</h3>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-gray-900">18</span>
                  <span className="text-sm text-gray-500">Active Books</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">2 books returned this week.</p>

                <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-green-500 w-[40%] h-2.5 rounded-full" style={{ width: '40%' }}></div> 
                </div>
                <p className="text-xs text-green-600 mt-2 font-semibold">40% Avg. Book Utilization</p>

              </div>

            </div>

          </div>
        );

      default:
        return null;
    }
  };

  // ------------------------------------------------------
  // MAIN RETURN
  // ------------------------------------------------------
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">PDC & Receipt Management System</h1>

      {/* Tabs - Redesigned to look like modern pills */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center flex-shrink-0 gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200
              ${activeTab === tab.name
                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400"
              }`}
          >
            <tab.icon size={18} /> {tab.name}
          </button>
        ))}
      </div>

      {/* TAB CONTENT CONTAINER */}
      <div className="mt-8">
        {renderContent()}
      </div>

    </div>
  );
}