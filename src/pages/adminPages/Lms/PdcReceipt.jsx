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
  RefreshCw,
  Grid,
  ClipboardList,
  Plus,
  Eye,
  Edit,
  Trash2,
  Printer,
  Share2,
  BarChart3,
  Calendar,
  User,
  Building,
  Shield,
  ArrowUpDown,
  Settings,
  Bell,
  HelpCircle,
  ExternalLink,
  CreditCard,
  Repeat,
  Layers,
  FileSpreadsheet,
  Package,
  ShieldCheck,
  TrendingUp,
  PieChart,
  Calculator,
  Smartphone,
  Mail,
  MapPin,
  Phone,
  AlertCircle,
  Lock,
  Unlock,
  CalendarDays,
  ChevronLeft,
  ChevronDown,
  Star,
  Award,
  Target,
  Zap,
  Wind,
  Cloud,
  Moon,
  Sun,
  Watch
} from "lucide-react";

export default function PdcReceipt() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddPDC, setShowAddPDC] = useState(false);
  const [selectedCheque, setSelectedCheque] = useState(null);
  const [receiptBookFilter, setReceiptBookFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");

  // Navigation Tabs
  const mainTabs = [
    { id: "dashboard", label: "Dashboard", icon: Grid },
    { id: "pdc", label: "PDC Management", icon: CreditCard },
    { id: "receipts", label: "Receipts", icon: FileText },
    { id: "books", label: "Receipt Books", icon: BookOpen },
    { id: "team", label: "Team Distribution", icon: Users },
    { id: "reports", label: "Reports", icon: BarChart3 }
  ];

  // PDC Status Options
  const pdcStatuses = [
    { id: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    { id: "cleared", label: "Cleared", color: "bg-green-100 text-green-800", icon: CheckCircle },
    { id: "bounced", label: "Bounced", color: "bg-red-100 text-red-800", icon: XCircle },
    { id: "awaiting", label: "Awaiting Deposit", color: "bg-blue-100 text-blue-800", icon: Calendar },
    { id: "processing", label: "Processing", color: "bg-purple-100 text-purple-800", icon: RefreshCw }
  ];

  // Receipt Status
  const receiptStatuses = [
    { id: "issued", label: "Issued", color: "bg-blue-100 text-blue-800" },
    { id: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { id: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
    { id: "reconciled", label: "Reconciled", color: "bg-green-100 text-green-800" }
  ];

  // Sample Data
  const pdcCheques = [
    {
      id: "PDC-2024-001",
      loanId: "LN-2024-015",
      customerName: "Rahul Sharma",
      amount: 25000,
      dueDate: "2024-04-15",
      depositDate: "2024-04-10",
      status: "pending",
      bank: "HDFC Bank",
      chequeNo: "789456",
      accountNo: "123456789012",
      contact: "+91 9876543210",
      email: "rahul@example.com"
    },
    {
      id: "PDC-2024-002",
      loanId: "LN-2024-018",
      customerName: "Priya Patel",
      amount: 18000,
      dueDate: "2024-04-20",
      depositDate: "2024-04-15",
      status: "cleared",
      bank: "ICICI Bank",
      chequeNo: "654321",
      accountNo: "987654321098",
      contact: "+91 9123456780",
      email: "priya@example.com"
    },
    {
      id: "PDC-2024-003",
      loanId: "LN-2024-022",
      customerName: "Amit Verma",
      amount: 35000,
      dueDate: "2024-04-05",
      depositDate: "2024-04-01",
      status: "bounced",
      bank: "SBI",
      chequeNo: "321654",
      accountNo: "456123789012",
      contact: "+91 9988776655",
      email: "amit@example.com"
    },
    {
      id: "PDC-2024-004",
      loanId: "LN-2024-025",
      customerName: "Neha Gupta",
      amount: 42000,
      dueDate: "2024-04-25",
      depositDate: "2024-04-20",
      status: "awaiting",
      bank: "Axis Bank",
      chequeNo: "987123",
      accountNo: "321654987012",
      contact: "+91 8899776655",
      email: "neha@example.com"
    },
    {
      id: "PDC-2024-005",
      loanId: "LN-2024-028",
      customerName: "Rajesh Kumar",
      amount: 19500,
      dueDate: "2024-04-12",
      depositDate: "2024-04-08",
      status: "processing",
      bank: "Kotak Bank",
      chequeNo: "456789",
      accountNo: "654987321012",
      contact: "+91 7766554433",
      email: "rajesh@example.com"
    }
  ];

  const receiptBooks = [
    {
      id: "RB-2024-001",
      seriesFrom: "10001",
      seriesTo: "10050",
      assignedTo: "Ramesh Kumar",
      issuedDate: "2024-01-10",
      usedCount: 23,
      totalCount: 50,
      status: "active",
      lastUsed: "2024-04-01"
    },
    {
      id: "RB-2024-002",
      seriesFrom: "10051",
      seriesTo: "10100",
      assignedTo: "Suresh Patel",
      issuedDate: "2024-01-15",
      usedCount: 48,
      totalCount: 50,
      status: "full",
      lastUsed: "2024-04-10"
    },
    {
      id: "RB-2024-003",
      seriesFrom: "10101",
      seriesTo: "10150",
      assignedTo: "Priya Sharma",
      issuedDate: "2024-02-01",
      usedCount: 15,
      totalCount: 50,
      status: "active",
      lastUsed: "2024-04-05"
    }
  ];

  const teams = [
    {
      id: "team-north",
      name: "North Sales Team",
      manager: "Rajesh Mehta",
      memberCount: 8,
      activeBooks: 25,
      totalBooks: 32,
      utilization: 78,
      performance: 92
    },
    {
      id: "team-south",
      name: "South Operations",
      manager: "Anita Reddy",
      memberCount: 6,
      activeBooks: 18,
      totalBooks: 24,
      utilization: 75,
      performance: 88
    },
    {
      id: "team-west",
      name: "West Collection",
      manager: "Vikram Singh",
      memberCount: 5,
      activeBooks: 12,
      totalBooks: 20,
      utilization: 60,
      performance: 85
    }
  ];

  // Dashboard Stats
  const dashboardStats = [
    {
      title: "Total PDC Value",
      value: "₹ 5.75 L",
      change: "+12.5%",
      icon: CreditCard,
      color: "blue",
      trend: "up"
    },
    {
      title: "Cheques Due (7 Days)",
      value: "18",
      change: "+3",
      icon: Clock,
      color: "yellow",
      trend: "up"
    },
    {
      title: "Bounced Cheques",
      value: "4",
      change: "-1",
      icon: XCircle,
      color: "red",
      trend: "down"
    },
    {
      title: "Receipts Generated",
      value: "1,248",
      change: "+18%",
      icon: FileText,
      color: "green",
      trend: "up"
    },
    {
      title: "Active Books",
      value: "42",
      change: "+5",
      icon: BookOpen,
      color: "purple",
      trend: "up"
    },
    {
      title: "Team Utilization",
      value: "78%",
      change: "+4.2%",
      icon: TrendingUp,
      color: "indigo",
      trend: "up"
    }
  ];

  // Recent Activities
  const recentActivities = [
    {
      id: 1,
      type: "pdc_deposited",
      title: "PDC Cheque Deposited",
      description: "PDC-2024-012 deposited for ₹25,000",
      time: "2 hours ago",
      icon: CreditCard,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      type: "receipt_issued",
      title: "Receipt Issued",
      description: "Receipt #10234 issued to Rahul Sharma",
      time: "4 hours ago",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      type: "cheque_bounced",
      title: "Cheque Bounced",
      description: "PDC-2024-008 bounced - ₹18,500",
      time: "1 day ago",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      id: 4,
      type: "book_assigned",
      title: "Book Assigned",
      description: "RB-2024-025 assigned to Priya Sharma",
      time: "2 days ago",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  // Helper Functions
  const getStatusBadge = (status) => {
    const statusConfig = [...pdcStatuses, ...receiptStatuses].find(s => s.id === status);
    if (!statusConfig) return null;
    
    const Icon = statusConfig.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
        {Icon && <Icon className="w-3 h-3" />}
        {statusConfig.label}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Tab Content Renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {dashboardStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                        stat.color === 'green' ? 'bg-green-50 text-green-600' :
                        stat.color === 'red' ? 'bg-red-50 text-red-600' :
                        stat.color === 'yellow' ? 'bg-yellow-50 text-yellow-600' :
                        stat.color === 'purple' ? 'bg-purple-50 text-purple-600' : 'bg-indigo-50 text-indigo-600'}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent PDC Activities</h3>
                    <button className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                          <activity.icon className={`w-5 h-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveTab("pdc")}
                    className="w-full flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="font-medium">Add New PDC</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">Generate Receipt</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-medium">Issue Book</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
                    <Download className="w-5 h-5" />
                    <span className="font-medium">Export Reports</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "pdc":
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">PDC Management</h2>
                <p className="text-gray-600">Manage post-dated cheques and track their status</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowAddPDC(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add PDC
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-5 h-5" />
                  Export
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by cheque ID, loan ID, customer name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="all">All Status</option>
                    {pdcStatuses.map(status => (
                      <option key={status.id} value={status.id}>{status.label}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Filter className="w-5 h-5" />
                    More Filters
                  </button>
                </div>
              </div>
            </div>

            {/* PDC Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cheque Details</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Info</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pdcCheques.map((cheque) => (
                      <tr key={cheque.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-gray-900">{cheque.id}</div>
                            <div className="text-sm text-gray-600">{cheque.bank}</div>
                            <div className="text-xs text-gray-500">Chq: {cheque.chequeNo}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-gray-900">{cheque.loanId}</div>
                            <div className="text-sm text-gray-600">{cheque.customerName}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {cheque.contact}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-gray-900">{formatCurrency(cheque.amount)}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="text-gray-600">Due:</span>{' '}
                              <span className="font-medium">{formatDate(cheque.dueDate)}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">Deposit:</span>{' '}
                              <span className="font-medium">{formatDate(cheque.depositDate)}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {getStatusBadge(cheque.status)}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setSelectedCheque(cheque)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "receipts":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Receipt Management</h2>
                <p className="text-gray-600">Generate and manage payment receipts</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-5 h-5" />
                  New Receipt
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Upload className="w-5 h-5" />
                  Bulk Import
                </button>
              </div>
            </div>

            {/* Receipt Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Receipts</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Receipt #R{10000 + i}</div>
                            <div className="text-sm text-gray-600">Rahul Sharma • Loan LN-2024-01{i}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-bold text-gray-900">₹25,000</div>
                            <div className="text-xs text-gray-500">Apr 12, 2024</div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Printer className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Receipt Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Total Receipts</span>
                    <span className="font-bold text-blue-600">1,248</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">This Month</span>
                    <span className="font-bold text-green-600">342</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-gray-700">Pending Reconciliation</span>
                    <span className="font-bold text-yellow-600">18</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-700">Average Amount</span>
                    <span className="font-bold text-purple-600">₹21,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "books":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Receipt Books</h2>
                <p className="text-gray-600">Manage receipt book distribution and tracking</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Plus className="w-5 h-5" />
                  Issue New Book
                </button>
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {receiptBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">{book.id}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          book.status === 'active' ? 'bg-green-100 text-green-800' :
                          book.status === 'full' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Series Range</div>
                      <div className="font-medium text-gray-900">{book.seriesFrom} - {book.seriesTo}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Assigned To</div>
                      <div className="font-medium text-gray-900">{book.assignedTo}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Utilization</div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(book.usedCount / book.totalCount) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {book.usedCount}/{book.totalCount}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Issued: {formatDate(book.issuedDate)}</span>
                      <span>Last Used: {formatDate(book.lastUsed)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "team":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Team Distribution</h2>
                <p className="text-gray-600">Monitor receipt book utilization across teams</p>
              </div>
              <div className="flex gap-3">
                <select
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Teams</option>
                  <option value="north">North Team</option>
                  <option value="south">South Team</option>
                  <option value="west">West Team</option>
                </select>
              </div>
            </div>

            {/* Teams Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div key={team.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{team.name}</h3>
                      <p className="text-sm text-gray-600">Manager: {team.manager}</p>
                    </div>
                    <div className={`p-3 rounded-full ${
                      team.performance >= 90 ? 'bg-green-100 text-green-600' :
                      team.performance >= 80 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      <span className="font-bold">{team.performance}%</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Members</div>
                        <div className="text-2xl font-bold text-gray-900">{team.memberCount}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Active Books</div>
                        <div className="text-2xl font-bold text-gray-900">{team.activeBooks}</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Book Utilization</span>
                        <span className="font-medium">{team.utilization}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            team.utilization >= 80 ? 'bg-green-600' :
                            team.utilization >= 60 ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${team.utilization}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                        <Eye className="w-4 h-4" />
                        View Team Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-600">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PDC & Receipt Management</h1>
              <p className="text-sm text-gray-600">Comprehensive system for managing post-dated cheques and receipts</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {mainTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="animate-in fade-in duration-300">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Add PDC Modal */}
      {showAddPDC && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Plus className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Add New PDC</h2>
                </div>
                <button
                  onClick={() => setShowAddPDC(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan ID</label>
                    <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="Enter Loan ID" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                    <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="Enter customer name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input type="number" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cheque Number</label>
                    <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="Enter cheque number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                    <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" placeholder="Enter bank name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Save PDC
                  </button>
                  <button
                    onClick={() => setShowAddPDC(false)}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cheque Detail Modal */}
      {selectedCheque && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">PDC Details</h2>
                    <p className="text-sm text-gray-600">{selectedCheque.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCheque(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Loan ID</label>
                    <p className="font-medium">{selectedCheque.loanId}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Customer</label>
                    <p className="font-medium">{selectedCheque.customerName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Amount</label>
                    <p className="font-bold text-lg">{formatCurrency(selectedCheque.amount)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Status</label>
                    {getStatusBadge(selectedCheque.status)}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Bank</label>
                    <p className="font-medium">{selectedCheque.bank}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Cheque No.</label>
                    <p className="font-medium">{selectedCheque.chequeNo}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Due Date</label>
                    <p className="font-medium">{formatDate(selectedCheque.dueDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Deposit Date</label>
                    <p className="font-medium">{formatDate(selectedCheque.depositDate)}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Edit Details
                  </button>
                  <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Mark as Cleared
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}