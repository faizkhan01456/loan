import React, { useState } from "react";
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
  ChevronRight
} from "lucide-react";
import BranchForm from "../../../components/admin/modals/AddBranchModal";
import ActionMenu from "../../../components/admin/common/ActionMenu";
import useBranches from "../../../hooks/useBranches";
import toast from "react-hot-toast";

export default function Branch() {
  const {
  branches,
  mainBranches,
  loading,
  createBranch,
  updateBranch,
  deleteBranch,
} = useBranches();
const flattenBranches = (list) => {
  let result = [];

  list.forEach((b) => {
    result.push(b);
    if (b.subBranches?.length) {
      result = result.concat(flattenBranches(b.subBranches));
    }
  });

  return result;
};

const allBranchesFlat = flattenBranches(branches);

  const [showForm, setShowForm] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [expandedBranches, setExpandedBranches] = useState({});

  // --- Helper Functions ---
  const toggleBranchExpansion = (branchId) => {
    setExpandedBranches(prev => ({
      ...prev,
      [branchId]: !prev[branchId]
    }));
  };

  const getBranchTypeLabel = (type) => {
    return type === "MAIN" ? "Main Branch" : "Subsidiary";
  };

  const getBranchTypeColor = (type) => {
    return type === "MAIN" 
      ? "bg-purple-100 text-purple-700 border-purple-200" 
      : "bg-blue-100 text-blue-700 border-blue-200";
  };

  const handleAddBranch = () => {
    setSelectedBranch(null);
    setShowForm(true);
  };

  const handleEditBranch = (branch) => {
    setSelectedBranch(branch);
    setShowForm(true);
  };

  const handleDeleteBranch = async (branchId) => {
  if (!window.confirm("Are you sure you want to delete this branch?")) return;
  await deleteBranch(branchId);
};


  const handleSaveBranch = async (formData) => {
  let res;

  if (selectedBranch) {
    res = await updateBranch(selectedBranch.id, formData);
  } else {
    res = await createBranch(formData);
  }

  if (res?.success) {
    toast.success(
      selectedBranch
        ? "Branch updated successfully "
        : "Branch created successfully "
    );
  } else {
    toast.success("Something went wrong ");
  }

  setShowForm(false);
  setSelectedBranch(null);
};



  // --- Reusable Components ---

  const StatusChip = ({ status }) => {
    const styles = {
      Active: "bg-green-100 text-green-700 border-green-200",
      Inactive: "bg-red-100 text-red-700 border-red-200",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || "bg-gray-100 text-gray-700"}`}>
        {status}
      </span>
    );
  };

  const TypeChip = ({ type }) => {
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBranchTypeColor(type)}`}>
        {getBranchTypeLabel(type)}
      </span>
    );
  };

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

  // --- Render Branch Row ---
  const renderBranchRow = (branch, level = 0) => {
    const hasSubBranches = branch.subBranches && branch.subBranches.length > 0;
    const isExpanded = expandedBranches[branch.id];
    // ✅ Actions per branch row
const branchActions = [
  {
    label: "Edit Branch",
    icon: <Edit size={16} />,
    onClick: () => handleEditBranch(branch),
  },
  {
    label: "Delete Branch",
    icon: <Trash2 size={16} />,
    isDanger: true,
    onClick: () => handleDeleteBranch(branch.id),
  },
];

if (loading) {
  return (
    <div className="p-10 text-center text-gray-500">
      Loading branches...
    </div>
  );
}

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
          <td className="px-6 py-4 text-gray-600">{branch.city}</td>
          <td className="px-6 py-4">
            <TypeChip type={branch.type} />
          </td>
          <td className="px-6 py-4 font-medium text-gray-700">
            {branch.parentBranchId ? `Parent: ${branch.parentBranchId}` : "Main Branch"}
          </td>
          <td className="px-6 py-4 font-medium text-gray-700">{branch.head}</td>
          <td className="px-6 py-4">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">
              {branch.staff} Members
            </span>
          </td>
          <td className="px-6 py-4">
            <StatusChip status={branch.status} />
          </td>
      <td className="px-6 py-4 text-right">
  <ActionMenu actions={branchActions} />
</td>

        </tr>
        
        {/* Render sub-branches if expanded */}
        {hasSubBranches && isExpanded && branch.subBranches.map(subBranch => 
          renderBranchRow(subBranch, level + 1)
        )}
      </React.Fragment>
    );
  };

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
  value={allBranchesFlat.length}
  icon={Building2}
  colorClass="text-blue-600"
  bgClass="bg-blue-50"
/>

<InfoCard
  title="Main Branches"
  value={allBranchesFlat.filter(b => b.type === "MAIN").length}
  icon={Building2}
  colorClass="text-purple-600"
  bgClass="bg-purple-50"
/>

<InfoCard
  title="Active Locations"
  value={allBranchesFlat.filter(b => b.isActive).length}
  icon={CheckCircle}
  colorClass="text-green-600"
  bgClass="bg-green-50"
/>

<InfoCard
  title="Inactive / Closed"
  value={allBranchesFlat.filter(b => !b.isActive).length}
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
              <input type="text" placeholder="Search branches..." className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50 flex items-center gap-2 text-sm transition">
                <Filter size={16} /> Filter
              </button>
              <button 
                onClick={handleAddBranch}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 flex items-center gap-2 text-sm font-medium w-full md:w-auto justify-center transition"
              >
                <Plus size={18} /> Add Branch
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold border-b">Branch Name</th>
                  <th className="px-6 py-4 font-bold border-b">Code</th>
                  <th className="px-6 py-4 font-bold border-b">City</th>
                  <th className="px-6 py-4 font-bold border-b">Type</th>
                  <th className="px-6 py-4 font-bold border-b">Parent</th>
                  <th className="px-6 py-4 font-bold border-b">Manager Head</th>
                  <th className="px-6 py-4 font-bold border-b">Staff Count</th>
                  <th className="px-6 py-4 font-bold border-b">Status</th>
                  <th className="px-6 py-4 font-bold border-b text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {branches.map(branch => renderBranchRow(branch))}
              </tbody>
            </table>
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