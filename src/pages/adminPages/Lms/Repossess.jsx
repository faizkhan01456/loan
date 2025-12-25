import React, { useState, useMemo, useEffect } from "react";
import {
  Search,  CheckCircle2,
  Clock, Truck, Package, Wallet, Plus, MoreVertical
} from "lucide-react";
import ExportButton from "../../../components/admin/AdminButtons/ExportButton";
import ActionMenu from "../../../components/admin/AdminButtons/ActionMenu";
import Pagination from "../../../components/admin/common/Pagination.jsx";

export default function Repossess() {
  const initialRepossessItems = [
    { id: "RP-001", customer: "Rahul Sharma", asset: "Honda Shine", loanId: "LN-8821", reason: "EMI Default", date: "Feb 10, 2025", status: "Repossessed", value: 30000 },
    { id: "RP-002", customer: "Sohail Ahmed", asset: "iPhone 13 Pro", loanId: "LN-9923", reason: "Skipped", date: "Feb 12, 2025", status: "Pending Pickup", value: 65000 },
    { id: "RP-003", customer: "Anjali Verma", asset: "Honda Activa", loanId: "LN-1102", reason: "Bounce", date: "Feb 14, 2025", status: "In Recovery", value: 40000 },
    { id: "RP-004", customer: "Priya Singh", asset: "Dell XPS", loanId: "LN-4451", reason: "Default", date: "Feb 18, 2025", status: "Repossessed", value: 80000 },
    { id: "RP-005", customer: "Manish Kulkarni", asset: "Tata Nano", loanId: "LN-3321", reason: "Invalid", date: "Feb 20, 2025", status: "Pending Pickup", value: 150000 },
    { id: "RP-006", customer: "Amit Kumar", asset: "MacBook Air", loanId: "LN-7721", reason: "Default", date: "Feb 22, 2025", status: "Repossessed", value: 90000 },
  ];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Search badalne par Page 1 par reset karein (Pagination Logic)
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // --- Helpers (Ab yeh use honge toh error chali jayegi) ---
  const getInitials = (name) => name.split(" ").map((n) => n[0]).join("").substring(0, 2);

  const getStatusColor = (status) => {
    switch (status) {
      case "Repossessed": return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
      case "Pending Pickup": return "bg-amber-50 text-amber-700 ring-amber-600/20";
      case "In Recovery": return "bg-blue-50 text-blue-700 ring-blue-600/20";
      default: return "bg-gray-50 text-gray-600 ring-gray-500/10";
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

  // --- Logic: Filtering & Pagination ---
  const filteredData = useMemo(() => {
    return initialRepossessItems.filter((item) => {
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const s = search.toLowerCase();
      return matchesStatus && (item.customer.toLowerCase().includes(s) || item.asset.toLowerCase().includes(s));
    });
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Repossession Management</h1>
          <div className="flex gap-2">
            <ExportButton />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
              <Plus size={18}/> New Request
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18}/>
            <input 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-lg outline-none focus:bg-white focus:border-blue-500" 
              placeholder="Search by customer or asset..." 
              value={search} onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select 
            className="bg-slate-50 px-4 py-2 rounded-lg outline-none border border-transparent focus:border-blue-500"
            value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Repossessed">Repossessed</option>
            <option value="Pending Pickup">Pending Pickup</option>
            <option value="In Recovery">In Recovery</option>
          </select>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b">
              <tr>
                <th className="px-6 py-4">Asset Details</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.length > 0 ? paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm text-slate-800">{item.asset}</div>
                    <div className="text-xs text-slate-400">Value: ₹{item.value.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold uppercase">
                        {getInitials(item.customer)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">{item.customer}</div>
                        <div className="text-xs text-slate-400">{item.loanId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionMenu options={[
                      { label: "View Details", onClick: () => console.log("View"), icon: <Package size={14}/> },
                      { label: "Update Info", onClick: () => console.log("Edit") }
                    ]}/>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="text-center py-10 text-slate-400">No data found</td></tr>
              )}
            </tbody>
          </table>

          {/* Pagination Integration */}
          <div className="p-4 border-t bg-slate-50/30">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}