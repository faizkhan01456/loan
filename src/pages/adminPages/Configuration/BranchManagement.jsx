// Branch.jsx
import React, { useState, useEffect } from "react";
import {
  Building2,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Loader
} from "lucide-react";
import ActionMenu from "../../../components/admin/common/ActionMenu";
import useBranches from "../../../hooks/useBranches";
import toast from "react-hot-toast";
import BranchForm from "../../../components/admin/modals/AddBranchModal";

export default function Branch() {
  const {
    branches,
    mainBranches,
    loading,
    createBranch,
    updateBranch,
    deleteBranch,
    refreshBranches
  } = useBranches();

  const [showForm, setShowForm] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [expandedBranches, setExpandedBranches] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  // Toggle branch expansion
  const toggleBranchExpansion = (branchId) => {
    setExpandedBranches(prev => ({
      ...prev,
      [branchId]: !prev[branchId]
    }));
  };

  // Get branch type label
  const getBranchTypeLabel = (type) => {
    return type === "MAIN" ? "Main Branch" : "Subsidiary";
  };

  const getBranchTypeColor = (type) => {
    return type === "MAIN" 
      ? "bg-purple-100 text-purple-700 border-purple-200" 
      : "bg-blue-100 text-blue-700 border-blue-200";
  };

  // Handle add branch
  const handleAddBranch = () => {
    setSelectedBranch(null);
    setShowForm(true);
  };

  // Handle edit branch
  const handleEditBranch = (branch) => {
    setSelectedBranch(branch);
    setShowForm(true);
  };

  // Handle delete branch
  const handleDeleteBranch = async (branchId) => {
    if (!window.confirm("Are you sure you want to delete this branch? This will mark it as inactive.")) {
      return;
    }
    
    const result = await deleteBranch(branchId);
    if (result?.success) {
      toast.success("Branch deleted successfully");
    } else {
      toast.error(result?.error?.message || "Failed to delete branch");
    }
  };

  // Handle save branch
  const handleSaveBranch = async (formData) => {
    let result;

    if (selectedBranch) {
      result = await updateBranch(selectedBranch.id, formData);
    } else {
      result = await createBranch(formData);
    }

    if (result?.success) {
      toast.success(
        selectedBranch
          ? "Branch updated successfully"
          : "Branch created successfully"
      );
      setShowForm(false);
      setSelectedBranch(null);
      await refreshBranches();
    } else {
      toast.error(result?.error?.response?.data?.message || "Something went wrong");
    }
  };

  // Filter branches based on search and type
  const filterBranches = (branchList) => {
    return branchList.filter(branch => {
      const matchesSearch = 
        branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (branch.city && branch.city.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = filterType === "ALL" || branch.type === filterType;
      
      return matchesSearch && matchesType;
    });
  };

  // Status Chip Component
  const StatusChip = ({ isActive }) => {
    return isActive ? (
      <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-green-100 text-green-700 border-green-200">
        Active
      </span>
    ) : (
      <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-red-100 text-red-700 border-red-200">
        Inactive
      </span>
    );
  };

  // Type Chip Component
  const TypeChip = ({ type }) => {
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBranchTypeColor(type)}`}>
        {getBranchTypeLabel(type)}
      </span>
    );
  };

  // Info Card Component
  const InfoCard = ({ title, value, icon: Icon, colorClass, bgClass }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-extrabold text-gray-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${bgClass}`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
    </div>
  );

  // Render Branch Row recursively
  const renderBranchRow = (branch, level = 0) => {
    const hasSubBranches = branch.subBranches && branch.subBranches.length > 0;
    const isExpanded = expandedBranches[branch.id];
    
    const branchActions = [
      {
        label: "Edit Branch",
        icon: <Edit size={16} />,
        onClick: () => handleEditBranch(branch),
      },
      {
        label: branch.isActive ? "Deactivate" : "Activate",
        icon: branch.isActive ? <XCircle size={16} /> : <CheckCircle size={16} />,
        onClick: () => handleDeleteBranch(branch.id),
      },
    ];

    return (
      <React.Fragment key={branch.id}>
        <tr className="hover:bg-blue-50/30 transition-colors">
          <td className="px-6 py-4 font-semibold text-gray-800">
            <div className="flex items-center gap-2" style={{ paddingLeft: `${level * 24}px` }}>
              {hasSubBranches ? (
                <button 
                  onClick={() => toggleBranchExpansion(branch.id)}
                  className="p-1 hover:bg-gray-200 rounded transition"
                >
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              ) : (
                <div className="w-6"></div>
              )}
              <Building2 size={16} className="text-blue-500"/> 
              {branch.name}
            </div>
          </td>
          <td className="px-6 py-4 font-mono text-gray-500">{branch.code}</td>
          <td className="px-6 py-4 text-gray-600">{branch.city || "-"}</td>
          <td className="px-6 py-4">
            <TypeChip type={branch.type} />
          </td>
          <td className="px-6 py-4 text-gray-600">
            {branch.parentBranch ? branch.parentBranch.name : "—"}
          </td>
          <td className="px-6 py-4 font-medium text-gray-700">{branch.head || "-"}</td>
          <td className="px-6 py-4">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">
              {branch._count?.subBranches || 0} Subsidiaries
            </span>
          </td>
          <td className="px-6 py-4">
            <StatusChip isActive={branch.isActive} />
          </td>
          <td className="px-6 py-4 text-right">
            <ActionMenu actions={branchActions} />
          </td>
        </tr>
        
        {/* Render sub-branches if expanded */}
        {hasSubBranches && isExpanded && 
          filterBranches(branch.subBranches).map(subBranch => 
            renderBranchRow(subBranch, level + 1)
          )
        }
      </React.Fragment>
    );
  };

  // Calculate stats
  const allBranchesFlat = (() => {
    const flatten = (list) => {
      let result = [];
      list.forEach(b => {
        result.push(b);
        if (b.subBranches?.length) {
          result = result.concat(flatten(b.subBranches));
        }
      });
      return result;
    };
    return flatten(branches);
  })();

  const stats = {
    total: allBranchesFlat.length,
    main: allBranchesFlat.filter(b => b.type === "MAIN").length,
    active: allBranchesFlat.filter(b => b.isActive).length,
    inactive: allBranchesFlat.filter(b => !b.isActive).length,
  };

  const filteredBranches = filterBranches(branches);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Branch Master</h1>
          <p className="text-gray-500 mt-1">Manage all your company locations and branch details with hierarchy.</p>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto animate-in fade-in duration-500 space-y-6">
      
        {/* Branch Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <InfoCard
            title="Total Branches"
            value={stats.total}
            icon={Building2}
            colorClass="text-blue-600"
            bgClass="bg-blue-50"
          />
          <InfoCard
            title="Main Branches"
            value={stats.main}
            icon={Building2}
            colorClass="text-purple-600"
            bgClass="bg-purple-50"
          />
          <InfoCard
            title="Active Locations"
            value={stats.active}
            icon={CheckCircle}
            colorClass="text-green-600"
            bgClass="bg-green-50"
          />
          <InfoCard
            title="Inactive"
            value={stats.inactive}
            icon={XCircle}
            colorClass="text-red-600"
            bgClass="bg-red-50"
          />
        </div>

        {/* BRANCH LIST TABLE */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-5 border-b flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search branches..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50 text-sm transition"
              >
                <option value="ALL">All Types</option>
                <option value="MAIN">Main Branches</option>
                <option value="SUB">Subsidiaries</option>
              </select>
              <button 
                onClick={handleAddBranch}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 flex items-center gap-2 text-sm font-medium w-full md:w-auto justify-center transition"
              >
                <Plus size={18} /> Add Branch
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center p-12">
                <Loader className="h-8 w-8 text-blue-600 animate-spin" />
                <span className="ml-2 text-gray-600">Loading branches...</span>
              </div>
            ) : filteredBranches.length === 0 ? (
              <div className="text-center p-12">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No branches found</p>
                <button
                  onClick={handleAddBranch}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Your First Branch
                </button>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold border-b">Branch Name</th>
                    <th className="px-6 py-4 font-bold border-b">Code</th>
                    <th className="px-6 py-4 font-bold border-b">City</th>
                    <th className="px-6 py-4 font-bold border-b">Type</th>
                    <th className="px-6 py-4 font-bold border-b">Parent</th>
                    <th className="px-6 py-4 font-bold border-b">Manager</th>
                    <th className="px-6 py-4 font-bold border-b">Subsidiaries</th>
                    <th className="px-6 py-4 font-bold border-b">Status</th>
                    <th className="px-6 py-4 font-bold border-b text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredBranches.map(branch => renderBranchRow(branch))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* BRANCH FORM POPUP */}
      {showForm && (
        <BranchForm
          branch={selectedBranch}
          mainBranches={mainBranches}  
          onClose={() => {
            setShowForm(false);
            setSelectedBranch(null);
          }}
          onSave={handleSaveBranch}
        />
      )}
    </div>
  );
}