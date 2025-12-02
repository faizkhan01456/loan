import React, { useState, useMemo } from "react";
import {
  Search,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  ListChecks,
  Plus,
  Filter,
  MoreVertical,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  X,
  Edit,
  Trash2,
  Save
} from "lucide-react";

export default function TaskDashboard() {
  // --- Initial Demo Data ---
  const initialTasks = [
    {
      id: "TSK001",
      title: "Verify Customer Documents for Loan 4590",
      assignedTo: "Ravi Sharma",
      dueDate: "2025-02-12",
      status: "Pending",
      priority: "High",
    },
    {
      id: "TSK002",
      title: "Call Borrower for EMI Reminder (LN321)",
      assignedTo: "Sohail Ahmed",
      dueDate: "2025-02-10",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: "TSK003",
      title: "Approve Loan Application (APP789)",
      assignedTo: "Neha Gupta",
      dueDate: "2025-02-15",
      status: "Completed",
      priority: "Low",
    },
    {
      id: "TSK004",
      title: "Verify Bank Statement for High-Value Loan",
      assignedTo: "Amit Verma",
      dueDate: "2025-02-05",
      status: "Pending",
      priority: "Critical",
    },
    {
      id: "TSK005",
      title: "Follow up on overdue payment (LN004)",
      assignedTo: "Ravi Sharma",
      dueDate: "2025-02-02",
      status: "Pending",
      priority: "Critical",
    },
    {
      id: "TSK006",
      title: "Internal Compliance Audit Check",
      assignedTo: "Neha Gupta",
      dueDate: "2025-02-20",
      status: "In Progress",
      priority: "Medium",
    },
  ];

  // --- State Management ---
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    id: "",
    title: "",
    assignedTo: "",
    dueDate: "",
    status: "Pending",
    priority: "Medium",
  });

  // --- CRUD HANDLERS ---

  // Open Modal for New Task
  const handleAddNew = () => {
    setCurrentTask({
      id: "",
      title: "",
      assignedTo: "",
      dueDate: new Date().toISOString().split('T')[0],
      status: "Pending",
      priority: "Medium",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Delete Task
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  // Save Task (Add or Update)
  const handleSave = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing task
      setTasks(tasks.map(t => (t.id === currentTask.id ? currentTask : t)));
    } else {
      // Add new task
      const newTask = {
        ...currentTask,
        id: `TSK${1000 + tasks.length + 1}`, // Auto-generate simple ID
      };
      setTasks([newTask, ...tasks]);
    }
    setIsModalOpen(false);
  };

  // Handle Input Change in Modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  // --- UI Components ---

  const StatusBadge = ({ status }) => {
    const styles = {
      Pending: "bg-amber-50 text-amber-700 border-amber-200",
      "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
      Completed: "bg-green-50 text-green-700 border-green-200",
      default: "bg-gray-50 text-gray-700 border-gray-200"
    };

    const icons = {
      Pending: <Clock className="w-3 h-3 mr-1" />,
      "In Progress": <Clock className="w-3 h-3 mr-1" />,
      Completed: <CheckCircle className="w-3 h-3 mr-1" />
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles[status] || styles.default}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  const PriorityBadge = ({ priority }) => {
    const styles = {
      Critical: "text-red-600 bg-red-50 border-red-100",
      High: "text-orange-600 bg-orange-50 border-orange-100",
      Medium: "text-blue-600 bg-blue-50 border-blue-100",
      Low: "text-slate-600 bg-slate-50 border-slate-100"
    };

    const icons = {
      Critical: <AlertTriangle size={12} className="mr-1" />,
      High: <ArrowUp size={12} className="mr-1" />,
      Medium: <ArrowRight size={12} className="mr-1" />,
      Low: <ArrowDown size={12} className="mr-1" />
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-bold rounded border ${styles[priority]}`}>
        {icons[priority]}
        {priority}
      </span>
    );
  };

  const KPICard = ({ title, value, subtitle, icon: Icon, colorClass, bgClass }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${bgClass}`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
        {subtitle && <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full">{subtitle}</span>}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{title}</p>
      </div>
    </div>
  );

  // --- Logic & Filtering ---

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (statusFilter !== "All" && t.status !== statusFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        return (
          t.title.toLowerCase().includes(s) ||
          t.id.toLowerCase().includes(s) ||
          t.assignedTo.toLowerCase().includes(s)
        );
      }
      return true;
    })
    .sort((a, b) => {
        const priorityOrder = { "Critical": 1, "High": 2, "Medium": 3, "Low": 4 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [search, statusFilter, tasks]);

  // Pagination Logic
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTasks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTasks, currentPage]);

  const kpis = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === "Pending").length,
      critical: tasks.filter(t => t.priority === "Critical" && t.status !== "Completed").length
    };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <ListChecks className="text-indigo-600" size={32}/> Team Task Overview
          </h1>
          <p className="text-slate-500 mt-1 ml-11">Track assignments, priorities, and completion status.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-200 flex items-center gap-2 font-medium transition transform active:scale-95"
        >
          <Plus size={20} /> New Task
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in fade-in zoom-in duration-300">
        <KPICard 
          title="Total Assignments" 
          value={kpis.total} 
          icon={ListChecks} 
          colorClass="text-indigo-600" 
          bgClass="bg-indigo-50" 
        />
        <KPICard 
          title="Pending Action" 
          value={kpis.pending} 
          subtitle="Needs Attention"
          icon={Clock} 
          colorClass="text-amber-600" 
          bgClass="bg-amber-50" 
        />
        <KPICard 
          title="Critical Priority" 
          value={kpis.critical} 
          subtitle="High Urgency"
          icon={AlertTriangle} 
          colorClass="text-red-600" 
          bgClass="bg-red-50" 
        />
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search tasks, employees..." 
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all bg-white" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative group">
                <select 
                    className="appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Task Details</th>
                <th className="px-6 py-4">Assigned To</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedTasks.length > 0 ? (
                paginatedTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                        <div>
                            <p className="font-medium text-slate-800">{task.title}</p>
                            <p className="text-xs text-indigo-500 font-mono mt-0.5">{task.id}</p>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                                {task.assignedTo.charAt(0)}
                            </div>
                            <span className="text-slate-700">{task.assignedTo}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-slate-400"/>
                            {task.dueDate}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                      <PriorityBadge priority={task.priority} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                            onClick={() => handleEdit(task)}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                            title="Edit"
                        >
                            <Edit size={18} />
                        </button>
                        <button 
                            onClick={() => handleDelete(task.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
                        >
                            <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                        <ListChecks size={48} className="mb-3 opacity-20" />
                        <p>No tasks match your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-xs text-slate-500">
            <span>Showing {paginatedTasks.length} of {filteredTasks.length} tasks</span>
            <div className="flex gap-2">
                <button 
                  className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  Previous
                </button>
                <button 
                  className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage * itemsPerPage >= filteredTasks.length}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Next
                </button>
            </div>
        </div>

      </div>

      {/* --- ADD / EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">
                {isEditing ? "Edit Task" : "Create New Task"}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-500"/>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Task Title</label>
                <input 
                  type="text" 
                  name="title"
                  required
                  value={currentTask.title}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  placeholder="e.g. Document Verification"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Assigned To</label>
                  <input 
                    type="text" 
                    name="assignedTo"
                    required
                    value={currentTask.assignedTo}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                    placeholder="Employee Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                  <input 
                    type="date" 
                    name="dueDate"
                    required
                    value={currentTask.dueDate}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                  <select 
                    name="priority"
                    value={currentTask.priority}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select 
                    name="status"
                    value={currentTask.status}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md flex items-center gap-2 transition"
                >
                  <Save size={18} /> Save Task
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}