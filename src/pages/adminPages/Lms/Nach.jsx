import React, { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  UploadCloud,
  Ban,
  Building,
  CreditCard,
  User,
} from "lucide-react";
import ExportButton from "../../../components/admin/AdminButtons/ExportButton";
import ActionMenu from "../../../components/admin/AdminButtons/ActionMenu";

export default function NACH() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const initialForm = {
    loanId: "",
    customerName: "",
    bankName: "",
    accountNo: "",
    ifsc: "",
    accountType: "Savings",
    maxAmount: "",
    startDate: "",
    endDate: "",
    frequency: "Monthly",
  };
  const [formData, setFormData] = useState(initialForm);

  // --- MOCK DATA ---
  const [mandates, setMandates] = useState([
    {
      id: "MND-001",
      loanId: "LN-2023-001",
      customer: "Rahul Sharma",
      bank: "HDFC Bank",
      account: "XXXX-1234",
      amount: "₹25,000",
      status: "Registered",
      umrn: "HDFC000123456789",
      date: "2023-12-01",
    },
    {
      id: "MND-002",
      loanId: "LN-2023-005",
      customer: "Priya Verma",
      bank: "SBI",
      account: "XXXX-5678",
      amount: "₹15,000",
      status: "Pending Bank",
      umrn: "-",
      date: "2024-01-15",
    },
    {
      id: "MND-003",
      loanId: "LN-2023-008",
      customer: "Amit Kumar",
      bank: "ICICI Bank",
      account: "XXXX-9012",
      amount: "₹50,000",
      status: "Rejected",
      umrn: "-",
      date: "2024-01-10",
      remark: "Signature Mismatch",
    },
  ]);

  // --- HANDLERS ---

  // Status Update Handler (The logic you asked for)
  const handleBankStatusUpdate = (id, newStatus) => {
    let remark = "";
    if (newStatus === "Rejected") {
      const reason = prompt("Enter Rejection Reason:");
      if (reason === null) return; // Cancel if user clicks cancel on prompt
      remark = reason || "Rejected by Admin";
    }

    setMandates((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: newStatus,
              remark: remark,
              // Agar register ho raha hai toh ek dummy UMRN generate kar dete hain
              umrn: newStatus === "Registered" ? "UMRN" + Math.floor(Math.random() * 1000000) : m.umrn
            }
          : m
      )
    );
  };

  const handleCreate = () => {
    const newMandate = {
      id: `MND-00${mandates.length + 1}`,
      loanId: formData.loanId || "LN-NEW",
      customer: formData.customerName || "Unknown",
      bank: formData.bankName,
      account: `XXXX-${formData.accountNo.slice(-4)}`,
      amount: `₹${formData.maxAmount}`,
      status: "Pending Bank",
      umrn: "-",
      date: new Date().toISOString().split("T")[0],
    };
    setMandates([newMandate, ...mandates]);
    setShowModal(false);
    setFormData(initialForm);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Registered": return "bg-green-100 text-green-700 border-green-200";
      case "Pending Bank": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Rejected": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredMandates = mandates.filter((m) => {
    const matchesSearch =
      m.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.loanId.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && m.status.toLowerCase().includes(activeTab.split(' ')[0].toLowerCase());
  });

  const handleExport = () => {
    let csv = "Mandate ID,Customer,Bank,Amount,Status\n";
    mandates.forEach((item) => {
      csv += `${item.id},${item.customer},${item.bank},${item.amount},${item.status}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nach-report.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">NACH Registration</h1>
          <p className="text-gray-500 mt-1">Manage e-Mandates and physical NACH forms.</p>
        </div>

        <div className="flex items-center gap-3">
          <ExportButton label="Export" onClick={handleExport} />
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg flex items-center gap-2 font-medium transition transform active:scale-95"
          >
            <Plus size={20} /> Create New Mandate
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold">Total</p>
            <h3 className="text-2xl font-bold">{mandates.length}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FileText size={24} /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold">Registered</p>
            <h3 className="text-2xl font-bold text-green-600">{mandates.filter(m => m.status === "Registered").length}</h3>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><CheckCircle size={24} /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold">Pending</p>
            <h3 className="text-2xl font-bold text-orange-600">{mandates.filter(m => m.status === "Pending Bank").length}</h3>
          </div>
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Clock size={24} /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold">Rejected</p>
            <h3 className="text-2xl font-bold text-red-600">{mandates.filter(m => m.status === "Rejected").length}</h3>
          </div>
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><Ban size={24} /></div>
        </div>
      </div>

      {/* LIST SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="flex bg-gray-200/50 p-1 rounded-lg">
            {["all", "registered", "pending", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                  activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-2 text-sm font-medium">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
              <tr>
                <th className="px-6 py-4">Mandate ID</th>
                <th className="px-6 py-4">Customer Info</th>
                <th className="px-6 py-4">Bank Details</th>
                <th className="px-6 py-4">Max Amount</th>
                <th className="px-6 py-4">UMRN / Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMandates.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-600">{m.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{m.customer}</div>
                    <div className="text-xs text-blue-600">{m.loanId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Building size={14} className="text-gray-400" /> {m.bank}
                    </div>
                    <div className="text-xs text-gray-500 pl-6">{m.account}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700">{m.amount}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(m.status)}`}>
                      {m.status === "Registered" && <CheckCircle size={12} className="mr-1" />}
                      {m.status === "Pending Bank" && <Clock size={12} className="mr-1" />}
                      {m.status === "Rejected" && <XCircle size={12} className="mr-1" />}
                      {m.status}
                    </div>
                    {m.umrn !== "-" && <div className="text-xs text-gray-500 mt-1 font-mono">UMRN: {m.umrn}</div>}
                    {m.remark && <div className="text-xs text-red-500 mt-1">{m.remark}</div>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionMenu
                      items={[
                        {
                          label: "Mark Registered",
                          onClick: () => handleBankStatusUpdate(m.id, "Registered"),
                        },
                        {
                          label: "Mark Pending",
                          onClick: () => handleBankStatusUpdate(m.id, "Pending Bank"),
                        },
                        {
                          label: "Reject Mandate",
                          onClick: () => handleBankStatusUpdate(m.id, "Rejected"),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- CREATE MANDATE MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FileText className="text-blue-600" /> New NACH Mandate
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:bg-gray-200 p-2 rounded-full">
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 border-b pb-2"><h3 className="text-sm font-bold text-gray-700 uppercase flex items-center gap-2"><User size={16}/> Customer</h3></div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Loan ID</label>
                  <input type="text" className="w-full p-2.5 border rounded-lg" value={formData.loanId} onChange={(e) => setFormData({...formData, loanId: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Customer Name</label>
                  <input type="text" className="w-full p-2.5 border rounded-lg" value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} />
                </div>
                
                <div className="md:col-span-2 border-b pb-2 mt-4"><h3 className="text-sm font-bold text-gray-700 uppercase flex items-center gap-2"><Building size={16}/> Bank Details</h3></div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Bank Name</label>
                  <input type="text" className="w-full p-2.5 border rounded-lg" value={formData.bankName} onChange={(e) => setFormData({...formData, bankName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Account Number</label>
                  <input type="text" className="w-full p-2.5 border rounded-lg" value={formData.accountNo} onChange={(e) => setFormData({...formData, accountNo: e.target.value})} />
                </div>

                <div className="md:col-span-2 border-b pb-2 mt-4"><h3 className="text-sm font-bold text-gray-700 uppercase flex items-center gap-2"><CreditCard size={16}/> Mandate Limit</h3></div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Max Limit (₹)</label>
                  <input type="number" className="w-full p-2.5 border rounded-lg" value={formData.maxAmount} onChange={(e) => setFormData({...formData, maxAmount: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-6 py-2.5 text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
              <button onClick={handleCreate} className="px-8 py-2.5 bg-blue-600 text-white rounded-lg shadow-lg flex items-center gap-2">
                <CheckCircle size={18} /> Register Mandate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}