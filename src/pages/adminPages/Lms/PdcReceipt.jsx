import React, { useState } from "react";
import {
  FileText,
  BookOpen,
  Upload,
  Users,
  Search,
  Clock,
  XCircle,
  Filter,
  MoreVertical,
  CheckCircle,
  RefreshCw,
  Plus,
  Eye,
  Edit,
  Trash2,
  Printer,
  Share2,
  Calendar,
  CreditCard,
  Phone,
} from "lucide-react";
import ExportButton from "../../../components/admin/AdminButtons/ExportButton";
import ActionMenu from "../../../components/admin/AdminButtons/ActionMenu";

export default function PdcReceipt() {
  const [activeTab, setActiveTab] = useState("pdc");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddPDC, setShowAddPDC] = useState(false);
  const [selectedCheque, setSelectedCheque] = useState(null);
  const [teamFilter, setTeamFilter] = useState("all");
  const [ setActionMenuOpen] = useState(null);

  // Navigation Tabs
  const mainTabs = [
    { id: "pdc", label: "PDC Management", icon: CreditCard },
    { id: "receipts", label: "Receipts", icon: FileText },
    { id: "books", label: "Receipt Books", icon: BookOpen },
    { id: "team", label: "Team Distribution", icon: Users },
  ];

  // PDC Status Options
  const pdcStatuses = [
    {
      id: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
    }
  ];

  // Receipt Status
  const receiptStatuses = [
    { id: "issued", label: "Issued", color: "bg-blue-100 text-blue-800" },
    { id: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { id: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
    {
      id: "reconciled",
      label: "Reconciled",
      color: "bg-green-100 text-green-800",
    },
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
      email: "rahul@example.com",
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
      lastUsed: "2024-04-01",
    }
  ];

  const teams = [
    {
      id: "team-north",
      name: "Mumbai",
      manager: "Rajesh Mehta",
      memberCount: 8,
      activeBooks: 25,
      totalBooks: 32,
      utilization: 78,
      performance: 92,
    }
  ];

  // Helper Functions
  const getStatusBadge = (status) => {
    const statusConfig = [...pdcStatuses, ...receiptStatuses].find(
      (s) => s.id === status
    );
    if (!statusConfig) return null;

    const Icon = statusConfig.icon;
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
      >
        {Icon && <Icon className="w-3 h-3" />}
        {statusConfig.label}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Tab Content Renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case "pdc":
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  PDC Management
                </h2>
                <p className="text-gray-600">
                  Manage post-dated cheques and track their status
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddPDC(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add PDC
                </button>
                <ExportButton onClick={handleExport} />
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
                    {pdcStatuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.label}
                      </option>
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
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cheque Details
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Loan Info
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pdcCheques.map((cheque) => (
                      <tr
                        key={cheque.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-gray-900">
                              {cheque.id}
                            </div>
                            <div className="text-sm text-gray-600">
                              {cheque.bank}
                            </div>
                            <div className="text-xs text-gray-500">
                              Chq: {cheque.chequeNo}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-gray-900">
                              {cheque.loanId}
                            </div>
                            <div className="text-sm text-gray-600">
                              {cheque.customerName}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {cheque.contact}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-gray-900">
                            {formatCurrency(cheque.amount)}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="text-gray-600">Due:</span>{" "}
                              <span className="font-medium">
                                {formatDate(cheque.dueDate)}
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">Deposit:</span>{" "}
                              <span className="font-medium">
                                {formatDate(cheque.depositDate)}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {getStatusBadge(cheque.status)}
                        </td>
                       <div>
                    <ActionMenu/>
                       </div>
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
                <h2 className="text-2xl font-bold text-gray-900">
                  Receipt Management
                </h2>
                <p className="text-gray-600">
                  Generate and manage payment receipts
                </p>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Recent Receipts
                  </h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              Receipt #R{10000 + i}
                            </div>
                            <div className="text-sm text-gray-600">
                              Rahul Sharma • Loan LN-2024-01{i}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              ₹25,000
                            </div>
                            <div className="text-xs text-gray-500">
                              Apr 12, 2024
                            </div>
                          </div>
                        <ActionMenu/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Receipt Statistics
                </h3>
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
                    <span className="text-gray-700">
                      Pending Reconciliation
                    </span>
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
                <h2 className="text-2xl font-bold text-gray-900">
                  Receipt Books
                </h2>
                <p className="text-gray-600">
                  Manage receipt book distribution and tracking
                </p>
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
                <div
                  key={book.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">{book.id}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            book.status === "active"
                              ? "bg-green-100 text-green-800"
                              : book.status === "full"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {book.status.charAt(0).toUpperCase() +
                            book.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <ActionMenu/>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Series Range</div>
                      <div className="font-medium text-gray-900">
                        {book.seriesFrom} - {book.seriesTo}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Assigned To</div>
                      <div className="font-medium text-gray-900">
                        {book.assignedTo}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Utilization</div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${
                                  (book.usedCount / book.totalCount) * 100
                                }%`,
                              }}
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
                <h2 className="text-2xl font-bold text-gray-900">
                  Team Distribution
                </h2>
                <p className="text-gray-600">
                  Monitor receipt book utilization across teams
                </p>
              </div>
              <div className="flex gap-3">
                <select
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium appearance-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all cursor-pointer hover:border-gray-400"
                >
                  <option value="all">All Locations</option>
                  <option value="mumbai">Mumbai Office</option>
                  <option value="delhi">Delhi / NCR</option>
                  <option value="bangalore">Bangalore Hub</option>
                  <option value="pune">Pune Branch</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="chennai">Chennai</option>
                  <option value="kolkata">Kolkata</option>
                </select>
              </div>
            </div>

            {/* Teams Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {team.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Manager: {team.manager}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-full ${
                        team.performance >= 90
                          ? "bg-green-100 text-green-600"
                          : team.performance >= 80
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <span className="font-bold">{team.performance}%</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Members</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {team.memberCount}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">
                          Active Books
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {team.activeBooks}
                        </div>
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
                            team.utilization >= 80
                              ? "bg-green-600"
                              : team.utilization >= 60
                              ? "bg-yellow-600"
                              : "bg-red-600"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-600">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  // Excel (CSV) Export Function
  const handleExport = () => {
    // 1. CSV Headers define karein
    const headers = [
      "Cheque ID",
      "Loan ID",
      "Customer Name",
      "Amount",
      "Bank",
      "Cheque No",
      "Due Date",
      "Deposit Date",
      "Status",
    ];

    // 2. Data rows taiyar karein
    const rows = pdcCheques.map((cheque) => [
      cheque.id,
      cheque.loanId,
      cheque.customerName,
      cheque.amount,
      cheque.bank,
      cheque.chequeNo,
      cheque.dueDate,
      cheque.depositDate,
      cheque.status,
    ]);

    // 3. Headers aur Rows ko combine karein
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // 4. Blob create karke download trigger karein
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `PDC_Report_${new Date().toLocaleDateString()}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {mainTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setActionMenuOpen(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-200">
            <div className="p-8">
              {/* Header Section */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Plus className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Add New PDC
                    </h2>
                    <p className="text-sm text-gray-500">
                      Post Dated Cheque entry for loan recovery
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddPDC(false)}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Form Grid */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      Loan ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-gray-50/50"
                      placeholder="LID-10293"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-gray-50/50"
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                        ₹
                      </span>
                      <input
                        type="number"
                        className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-gray-50/50"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      Cheque Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-gray-50/50"
                      placeholder="6-digit number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-gray-50/50"
                      placeholder="e.g. HDFC Bank"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-gray-50/50"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button className="flex-1 px-6 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
                    Save PDC Record
                  </button>
                  <button
                    onClick={() => setShowAddPDC(false)}
                    className="flex-1 px-6 py-3.5 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Discard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cheque Detail Modal */}
      {selectedCheque && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      PDC Details
                    </h2>
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
                    <p className="font-bold text-lg">
                      {formatCurrency(selectedCheque.amount)}
                    </p>
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
                    <p className="font-medium">
                      {formatDate(selectedCheque.dueDate)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Deposit Date
                    </label>
                    <p className="font-medium">
                      {formatDate(selectedCheque.depositDate)}
                    </p>
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
