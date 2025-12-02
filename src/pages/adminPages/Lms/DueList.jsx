import React, { useState, useMemo } from "react";
import { 
  Search, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  Calendar, 
  Clock, 
  Briefcase, 
  Target, 
  ListChecks, 
  UserCheck, 
  Filter, 
  MoreVertical, 
  Phone,
  ArrowRight
} from "lucide-react";

// --- SHARED COMPONENTS ---

const StatusBadge = ({ status }) => {
  let styles = '';
  let icon = null;

  switch (status) {
    case "Overdue":
      styles = 'bg-red-50 text-red-700 border-red-200';
      icon = <AlertTriangle className="w-3 h-3 mr-1" />;
      break;
    case "Pending":
      styles = 'bg-amber-50 text-amber-700 border-amber-200';
      icon = <Clock className="w-3 h-3 mr-1" />;
      break;
    case "Paid":
      styles = 'bg-green-50 text-green-700 border-green-200';
      icon = <CheckCircle className="w-3 h-3 mr-1" />;
      break;
    default:
      styles = 'bg-gray-50 text-gray-700 border-gray-200';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles}`}>
      {icon} {status}
    </span>
  );
};

// --- COLLECTION EXECUTIVE DASHBOARD ---
const CollectionExecutive = ({ kpis, todayTasks }) => {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-red-500 border-gray-100 flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Overdue</p>
            <div className="p-2 bg-red-50 rounded-lg"><AlertTriangle className="w-5 h-5 text-red-500" /></div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">₹{kpis.totalOverdue.toLocaleString('en-IN')}</p>
            <p className="text-xs text-red-500 mt-1 font-medium">Requires immediate action</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-orange-500 border-gray-100 flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Critical Cases</p>
            <div className="p-2 bg-orange-50 rounded-lg"><Target className="w-5 h-5 text-orange-500" /></div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{kpis.criticalCount}</p>
            <p className="text-xs text-orange-500 mt-1 font-medium">High priority loans</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-blue-500 border-gray-100 flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Today's Tasks</p>
            <div className="p-2 bg-blue-50 rounded-lg"><ListChecks className="w-5 h-5 text-blue-500" /></div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{kpis.todayTaskCount}</p>
            <p className="text-xs text-blue-500 mt-1 font-medium">Scheduled for follow-up</p>
          </div>
        </div>
      </div>

      {/* Today's Tasks List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
             <Calendar className="w-5 h-5 text-blue-600" /> Today's Action Plan
          </h2>
          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
                    <tr>
                        <th className="px-6 py-4">Loan Info</th>
                        <th className="px-6 py-4">Amount Due</th>
                        <th className="px-6 py-4">Priority</th>
                        <th className="px-6 py-4">Assigned To</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {todayTasks.length > 0 ? (
                        todayTasks.map((loan) => (
                            <tr key={loan.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                  <div className="font-medium text-gray-900">{loan.customer}</div>
                                  <div className="text-xs text-blue-600 font-mono">{loan.id}</div>
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-800">₹{loan.amount.toLocaleString('en-IN')}</td>
                                <td className="px-6 py-4">
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${loan.priority === 'Critical' ? 'bg-red-50 text-red-600' : loan.priority === 'High' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                                    {loan.priority === 'Critical' && <AlertTriangle size={12}/>}
                                    {loan.priority}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                      {loan.assignedTo.charAt(0)}
                                    </div>
                                    {loan.assignedTo}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={loan.status} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition">
                                    <Phone size={18} />
                                  </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-12 text-gray-400">
                              <div className="flex flex-col items-center">
                                <CheckCircle size={48} className="mb-3 text-green-100" />
                                <p>No pending tasks for today!</p>
                              </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};


// --- MAIN COMPONENT ---
export default function DueList() {
  const [currentPage, setCurrentPage] = useState("DueList"); // DueList | Executive

  // --- MOCK DATA ---
  const initialDueLoans = [
    { id: "LN001", customer: "Rahul Sharma", amount: 15000, dueDate: "2025-02-10", status: "Pending", priority: "Medium", assignedTo: "John Doe", nextActionDate: "2024-12-05" },
    { id: "LN002", customer: "Sohail Ahmed", amount: 32000, dueDate: "2025-02-15", status: "Overdue", priority: "High", assignedTo: "Jane Smith", nextActionDate: "2024-12-02" }, 
    { id: "LN003", customer: "Anjali Verma", amount: 18000, dueDate: "2025-02-12", status: "Pending", priority: "Medium", assignedTo: "John Doe", nextActionDate: "2024-12-06" },
    { id: "LN004", customer: "Pooja Gupta", amount: 45000, dueDate: "2025-01-20", status: "Overdue", priority: "Critical", assignedTo: "Jane Smith", nextActionDate: "2024-12-02" }, 
    { id: "LN005", customer: "Kiran Rao", amount: 9000, dueDate: "2025-03-01", status: "Paid", priority: "Low", assignedTo: "John Doe", nextActionDate: "N/A" },
    { id: "LN006", customer: "Vikram Singh", amount: 21000, dueDate: "2025-02-28", status: "Pending", priority: "Medium", assignedTo: "Jane Smith", nextActionDate: "2024-12-07" },
    { id: "LN007", customer: "Neha Tandon", amount: 55000, dueDate: "2025-01-05", status: "Overdue", priority: "Critical", assignedTo: "John Doe", nextActionDate: "2024-12-03" },
  ];

  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // --- LOGIC ---
  const filteredLoans = useMemo(() => {
    return initialDueLoans
      .filter((loan) => {
        if (statusFilter !== "All" && loan.status !== statusFilter) return false;
        if (searchTerm) {
          const s = searchTerm.toLowerCase();
          return loan.customer.toLowerCase().includes(s) || loan.id.toLowerCase().includes(s);
        }
        return true;
      })
      .sort((a, b) => {
        if (a.status === "Overdue" && b.status !== "Overdue") return -1;
        if (a.status !== "Overdue" && b.status === "Overdue") return 1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
  }, [searchTerm, statusFilter, initialDueLoans]);

  const executiveKpis = useMemo(() => {
    const today = "2024-12-02"; // Mock Today
    const overdueLoans = initialDueLoans.filter(loan => loan.status === "Overdue");
    const totalOverdue = overdueLoans.reduce((sum, loan) => sum + loan.amount, 0);
    const criticalCount = overdueLoans.filter(loan => loan.priority === "Critical").length;
    const todayTasks = initialDueLoans.filter(loan => loan.nextActionDate === today && loan.status !== "Paid");

    return {
      totalOverdue,
      criticalCount,
      todayTaskCount: todayTasks.length,
      todayTasks: todayTasks.sort((a, b) => (a.priority === "Critical" ? -1 : 1))
    };
  }, [initialDueLoans]);

  const downloadExcel = () => {
    const header = ["Loan ID,Customer,Amount,Due Date,Status,Priority"];
    const rows = filteredLoans.map(l => `${l.id},${l.customer},${l.amount},${l.dueDate},${l.status},${l.priority}`);
    const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "due_list.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="text-blue-600" size={32}/> Loan Recovery & Due List
          </h1>
          <p className="text-gray-500 mt-1 ml-11">Manage overdue loans, assign executives, and track recovery.</p>
        </div>
        
        {/* Page Toggle */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
          <button onClick={() => setCurrentPage("DueList")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === "DueList" ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-gray-900"}`}>
            All Due List
          </button>
          <button onClick={() => setCurrentPage("Executive")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === "Executive" ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-gray-900"}`}>
            Executive Dashboard
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      {currentPage === "DueList" ? (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
           
           {/* Filters Toolbar */}
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search Loan ID or Customer..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
              </div>
              
              <div className="flex w-full md:w-auto gap-3">
                <div className="relative flex-1 md:flex-none">
                   <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full appearance-none pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                   >
                      <option value="All">All Status</option>
                      <option value="Overdue">Overdue</option>
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                   </select>
                   <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>

                <button onClick={downloadExcel} className="flex items-center justify-center px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
                   <Download className="w-4 h-4 mr-2" /> Export
                </button>
              </div>
           </div>

           {/* Data Table */}
           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
                       <tr>
                          <th className="px-6 py-4">Loan ID</th>
                          <th className="px-6 py-4">Customer</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4">Due Date</th>
                          <th className="px-6 py-4">Assigned To</th>
                          <th className="px-6 py-4">Priority</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       {filteredLoans.map((loan) => (
                          <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                             <td className="px-6 py-4 font-medium text-blue-600">{loan.id}</td>
                             <td className="px-6 py-4 text-gray-900">{loan.customer}</td>
                             <td className="px-6 py-4 font-bold text-gray-800">₹{loan.amount.toLocaleString('en-IN')}</td>
                             <td className="px-6 py-4 text-gray-500">{loan.dueDate}</td>
                             <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                                   {loan.assignedTo.charAt(0)}
                                </div>
                                {loan.assignedTo}
                             </td>
                             <td className="px-6 py-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded ${loan.priority === 'Critical' ? 'text-red-600 bg-red-50' : loan.priority === 'High' ? 'text-orange-600 bg-orange-50' : 'text-blue-600 bg-blue-50'}`}>
                                   {loan.priority}
                                </span>
                             </td>
                             <td className="px-6 py-4">
                                <StatusBadge status={loan.status} />
                             </td>
                             <td className="px-6 py-4 text-right">
                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                   <MoreVertical size={18} />
                                </button>
                             </td>
                          </tr>
                       ))}
                       {filteredLoans.length === 0 && (
                          <tr>
                             <td colSpan="8" className="text-center py-12 text-gray-400 italic">No loans found.</td>
                          </tr>
                       )}
                    </tbody>
                 </table>
              </div>
              <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex justify-between">
                 <span>Showing {filteredLoans.length} records</span>
                 <div className="space-x-2">
                    <button className="px-3 py-1 bg-white border rounded hover:bg-gray-100 disabled:opacity-50" disabled>Prev</button>
                    <button className="px-3 py-1 bg-white border rounded hover:bg-gray-100">Next</button>
                 </div>
              </div>
           </div>
        </div>
      ) : (
        <CollectionExecutive 
          kpis={executiveKpis} 
          todayTasks={executiveKpis.todayTasks} 
        />
      )}

    </div>
  );
} 