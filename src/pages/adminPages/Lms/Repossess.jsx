import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  Wallet,
  Download,
  Plus,
} from "lucide-react";

export default function RepossessionDashboard() {
  // --- Data & State ---
  const initialRepossessItems = [
    {
      id: "RP-001",
      customer: "Rahul Sharma",
      asset: "Honda Shine",
      type: "Bike",
      loanId: "LN-8821",
      reason: "EMI Default (2 months)",
      date: "Feb 10, 2025",
      status: "Repossessed",
      value: 30000,
    },
    {
      id: "RP-002",
      customer: "Sohail Ahmed",
      asset: "iPhone 13 Pro",
      type: "Mobile",
      loanId: "LN-9923",
      reason: "Unreachable / Skipped",
      date: "Feb 12, 2025",
      status: "Pending Pickup",
      value: 65000,
    },
    {
      id: "RP-003",
      customer: "Anjali Verma",
      asset: "Honda Activa 6G",
      type: "Scooter",
      loanId: "LN-1102",
      reason: "Repeated Bounce",
      date: "Feb 14, 2025",
      status: "In Recovery",
      value: 40000,
    },
    {
      id: "RP-004",
      customer: "Priya Singh",
      asset: "Dell XPS 15",
      type: "Laptop",
      loanId: "LN-4451",
      reason: "Default (90+ Days)",
      date: "Feb 18, 2025",
      status: "Repossessed",
      value: 80000,
    },
    {
      id: "RP-005",
      customer: "Manish Kulkarni",
      asset: "Tata Nano GenX",
      type: "Car",
      loanId: "LN-3321",
      reason: "Address Invalid",
      date: "Feb 20, 2025",
      status: "Pending Pickup",
      value: 150000,
    },
  ];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // --- Helpers ---
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Repossessed":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
      case "Pending Pickup":
        return "bg-amber-50 text-amber-700 ring-amber-600/20";
      case "In Recovery":
        return "bg-blue-50 text-blue-700 ring-blue-600/20";
      default:
        return "bg-gray-50 text-gray-600 ring-gray-500/10";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Repossessed": return <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />;
      case "Pending Pickup": return <Clock className="w-3.5 h-3.5 mr-1.5" />;
      case "In Recovery": return <Truck className="w-3.5 h-3.5 mr-1.5" />;
      default: return null;
    }
  };

  // --- Logic ---
  const filteredData = useMemo(() => {
    return initialRepossessItems.filter((item) => {
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const s = search.toLowerCase();
      const matchesSearch =
        !search ||
        item.customer.toLowerCase().includes(s) ||
        item.asset.toLowerCase().includes(s) ||
        item.loanId.toLowerCase().includes(s);

      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter, initialRepossessItems]);

  const stats = useMemo(() => {
    return {
      total: initialRepossessItems.length,
      pending: initialRepossessItems.filter((i) => i.status === "Pending Pickup").length,
      value: initialRepossessItems.reduce((acc, curr) => acc + curr.value, 0),
    };
  }, [initialRepossessItems]);

  // --- Components ---
  const KPICard = ({ title, value, subtext, icon: Icon, trend }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-2">{value}</h3>
        </div>
        <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-600">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {subtext && (
        <div className="mt-4 flex items-center text-xs font-medium">
          <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center mr-2">
            <ArrowUpRight className="w-3 h-3 mr-1" /> {trend}
          </span>
          <span className="text-slate-400">{subtext}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Repossession Management</h1>
            <p className="text-slate-500 text-sm mt-1">Track assets, pickups, and recovery status.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors hover:shadow-indigo-200 shadow-indigo-100">
              <Plus className="w-4 h-4" /> New Request
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard 
            title="Total Assets" 
            value={stats.total} 
            icon={Package} 
            trend="+12%"
            subtext="vs last month"
          />
          <KPICard 
            title="Pending Pickups" 
            value={stats.pending} 
            icon={Clock} 
            trend="+5%"
            subtext="requests active"
          />
          <KPICard 
            title="Asset Value (Est)" 
            value={`₹${(stats.value / 1000).toFixed(1)}k`} 
            icon={Wallet} 
            trend="+8%"
            subtext="recovered value"
          />
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by customer, asset, or loan ID..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                className="text-sm border-none bg-slate-50 rounded-lg py-2 pl-3 pr-8 focus:ring-2 focus:ring-indigo-100 font-medium text-slate-700 cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Repossessed">Repossessed</option>
                <option value="Pending Pickup">Pending Pickup</option>
                <option value="In Recovery">In Recovery</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 text-xs uppercase font-semibold text-slate-500">
                <tr>
                  <th className="px-6 py-4">Asset Details</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Reason & Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800 text-sm">{item.asset}</span>
                          <span className="text-xs text-slate-500 mt-0.5">Value: ₹{item.value.toLocaleString()}</span>
                          <span className="text-[10px] text-slate-400 font-mono mt-1">{item.id}</span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                            {getInitials(item.customer)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700">{item.customer}</p>
                            <p className="text-xs text-slate-400">{item.loanId}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col max-w-[180px]">
                          <span className="text-sm text-slate-700 truncate" title={item.reason}>
                            {item.reason}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center mt-1">
                            <Clock className="w-3 h-3 mr-1" /> {item.date}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          {item.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-slate-50 p-4 rounded-full mb-3">
                          <AlertCircle className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-slate-900 font-medium">No assets found</p>
                        <p className="text-slate-500 text-sm">Try adjusting your search or filters.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Footer / Pagination (Mock) */}
          <div className="p-4 border-t border-gray-100 bg-slate-50/30 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredData.length} of {initialRepossessItems.length} records</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50">Next</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}