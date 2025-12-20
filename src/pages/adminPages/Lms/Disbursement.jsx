import React, { useState } from "react";
import {
  FileText,
  Plus,
  Clock,
  Printer,
  Edit,
  CreditCard,
  Search,
  Eye,
  X,
  Download,
  Calculator,
  ShieldCheck,
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// External Component Import
import ActionMenu from "../../../components/admin/AdminButtons/ActionMenu";

export default function DisbursementManagement() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // --- MOCK DATABASE ---
  const [pendingLoans, setPendingLoans] = useState([
    { id: "LN-2024-001", customer: "Rahul Sharma", amount: 50000, approvedDate: "2024-01-15", type: "Personal", bank: "HDFC Bank", acc: "501002345678", ifsc: "HDFC0001234" },
    { id: "LN-2024-005", customer: "Priya Verma", amount: 200000, approvedDate: "2024-01-18", type: "Home", bank: "SBI", acc: "30201234567", ifsc: "SBIN0004567" },
    { id: "LN-2024-008", customer: "Karan Singh", amount: 150000, approvedDate: "2024-01-20", type: "Business", bank: "ICICI Bank", acc: "111222333444", ifsc: "ICIC0008888" },
  ]);

  const [allDVs, setAllDVs] = useState([
    { dvNo: "DV-1001", loanId: "LN-2023-099", customer: "Amit Kumar", amount: 100000, status: "Created", date: "2024-01-20", bank: "Axis Bank" },
    { dvNo: "DV-1002", loanId: "LN-2023-098", customer: "Sneha Gupta", amount: 75000, status: "Pending Auth", date: "2024-01-19", bank: "Kotak Bank" },
    { dvNo: "DV-0999", loanId: "LN-2023-050", customer: "Vikram Singh", amount: 500000, status: "Authorized", date: "2024-01-18", bank: "HDFC Bank" },
  ]);

  const [dvForm, setDvForm] = useState({ date: new Date().toISOString().split("T")[0], mode: "NEFT", remarks: "" });

  // --- DISBURSEMENT WORKFLOW LOGIC ---

  const handleOpenCreateDV = (loan) => {
    setSelectedItem(loan);
    setDvForm({ date: new Date().toISOString().split("T")[0], mode: "NEFT", remarks: "" });
    setModalType("createDV");
    setShowModal(true);
  };

  const submitCreateDV = () => {
    const newDV = {
      dvNo: `DV-${1000 + allDVs.length + 1}`,
      loanId: selectedItem.id,
      customer: selectedItem.customer,
      amount: selectedItem.amount,
      status: "Pending Auth",
      date: dvForm.date,
      bank: selectedItem.bank,
      ...dvForm,
    };
    setAllDVs([...allDVs, newDV]);
    setPendingLoans(pendingLoans.filter((l) => l.id !== selectedItem.id));
    setShowModal(false);
    setActiveTab("auth");
  };

  const handleAuthorize = (dvNo) => {
    setAllDVs(allDVs.map((dv) => dv.dvNo === dvNo ? { ...dv, status: "Authorized" } : dv));
    setActiveTab("payments");
  };

  const handleReject = (dvNo) => {
    setAllDVs(allDVs.map((dv) => dv.dvNo === dvNo ? { ...dv, status: "Rejected" } : dv));
  };

  const handleInitiatePayment = (dvNo) => {
    setAllDVs(allDVs.map((dv) => dv.dvNo === dvNo ? { ...dv, status: "Disbursed" } : dv));
    alert("Fund Transfer Initiated!");
  };

  // --- RENDERERS ---

  const RenderPending = () => {
    const data = pendingLoans.filter(l => l.customer.toLowerCase().includes(searchQuery.toLowerCase()));
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b">
            <tr>
              <th className="px-6 py-4">Loan Info</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Approved Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((loan) => (
              <tr key={loan.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-800">{loan.customer}</div>
                  <div className="text-xs text-blue-600 font-mono">{loan.id}</div>
                </td>
                <td className="px-6 py-4 font-semibold">₹{loan.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-500">{loan.approvedDate}</td>
                <td className="px-6 py-4 text-right">
                  {/* Using Imported ActionMenu */}
                  <ActionMenu items={[
                    { label: "Create DV", onClick: () => handleOpenCreateDV(loan) },
                    { label: "View Loan", onClick: () => console.log("View") }
                  ]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const RenderAuth = () => {
    const data = allDVs.filter(dv => dv.status === "Pending Auth");
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b">
            <tr>
              <th className="px-6 py-4">DV No</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((dv) => (
              <tr key={dv.dvNo}>
                <td className="px-6 py-4 font-mono">{dv.dvNo}</td>
                <td className="px-6 py-4 font-medium">{dv.customer}</td>
                <td className="px-6 py-4 font-bold">₹{dv.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <ActionMenu items={[
                    { label: "Authorize", onClick: () => handleAuthorize(dv.dvNo) },
                    { label: "Reject", onClick: () => handleReject(dv.dvNo) }
                  ]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const RenderPayments = () => {
    const data = allDVs.filter(dv => dv.status === "Authorized");
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b">
            <tr>
              <th className="px-6 py-4">DV No</th>
              <th className="px-6 py-4">Customer / Bank</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((pay) => (
              <tr key={pay.dvNo}>
                <td className="px-6 py-4 font-mono">{pay.dvNo}</td>
                <td className="px-6 py-4">
                  <div className="font-medium">{pay.customer}</div>
                  <div className="text-xs text-gray-500">{pay.bank}</div>
                </td>
                <td className="px-6 py-4 font-bold text-green-700">₹{pay.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <ActionMenu items={[
                    { label: "Initiate Transfer", onClick: () => handleInitiatePayment(pay.dvNo) },
                    { label: "Download Advice", onClick: () => console.log("Download") }
                  ]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const RenderVouchers = () => {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b">
            <tr>
              <th className="px-6 py-4">DV No</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {allDVs.map((dv) => (
              <tr key={dv.dvNo}>
                <td className="px-6 py-4 font-mono">{dv.dvNo}</td>
                <td className="px-6 py-4 font-medium">{dv.customer}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${dv.status === 'Disbursed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                    {dv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <ActionMenu items={[
                    { label: "Print Voucher", onClick: () => { setSelectedItem(dv); setModalType("viewDV"); setShowModal(true); } },
                    { label: "View Logs", onClick: () => console.log("Logs") }
                  ]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">Disbursement Management</h1>
          <p className="text-gray-500 mt-1">Lifecycle: Create DV → Authorize → Fund Transfer</p>
        </div>
        <button onClick={() => { setModalType("amortization"); setShowModal(true); }} className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 shadow-sm flex items-center gap-2">
          <Calculator size={18} /> Amortization Tool
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex overflow-x-auto gap-2 mb-6 border-b border-gray-200 no-scrollbar">
        {[
          { id: "pending", label: "Pending Disbursement", icon: <Clock size={18} />, count: pendingLoans.length },
          { id: "auth", label: "Authorization", icon: <ShieldCheck size={18} />, count: allDVs.filter((d) => d.status === "Pending Auth").length },
          { id: "payments", label: "Payment Initiation", icon: <CreditCard size={18} />, count: allDVs.filter((d) => d.status === "Authorized").length },
          { id: "vouchers", label: "Voucher History", icon: <FileText size={18} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSearchQuery(""); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-white text-blue-600 border border-gray-200 border-b-white z-10 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            {tab.icon} {tab.label}
            {tab.count > 0 && <span className="ml-1 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{tab.count}</span>}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in duration-300">
        {activeTab === "pending" && <RenderPending />}
        {activeTab === "vouchers" && <RenderVouchers />}
        {activeTab === "auth" && <RenderAuth />}
        {activeTab === "payments" && <RenderPayments />}
      </div>

      {/* Modal: Generate DV */}
      {showModal && modalType === "createDV" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
               <h3 className="font-bold text-lg text-gray-800">Generate Voucher</h3>
               <button onClick={() => setShowModal(false)}><X size={20}/></button>
             </div>
             <div className="p-6">
               <div className="bg-blue-50 p-4 rounded-xl mb-4">
                 <p className="text-sm font-bold text-blue-700">{selectedItem?.customer} - ₹{selectedItem?.amount.toLocaleString()}</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-xs font-bold text-gray-500">DATE</label>
                   <input type="date" value={dvForm.date} onChange={(e) => setDvForm({...dvForm, date: e.target.value})} className="w-full p-2 border rounded mt-1 outline-none"/>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-gray-500">PAYMENT MODE</label>
                   <select className="w-full p-2 border rounded mt-1 outline-none">
                     <option>NEFT</option>
                     <option>IMPS</option>
                     <option>RTGS</option>
                   </select>
                 </div>
               </div>
             </div>
             <div className="p-6 border-t flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="text-gray-500 font-medium">Cancel</button>
                <button onClick={submitCreateDV} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold">Generate DV</button>
             </div>
          </div>
        </div>
      )}

      {/* Modal: Success/View DV */}
      {showModal && modalType === "viewDV" && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center">
             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600"><CheckCircle size={32} /></div>
             <h3 className="text-xl font-bold">DV Generated: {selectedItem?.dvNo}</h3>
             <p className="text-gray-500 mt-2">Customer: {selectedItem?.customer}</p>
             <p className="text-2xl font-black text-blue-700 mt-4">₹{selectedItem?.amount.toLocaleString()}</p>
             <div className="flex gap-2 justify-center mt-6">
                <button onClick={() => setShowModal(false)} className="px-6 py-2 border rounded-lg">Close</button>
                <button onClick={() => window.print()} className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"><Printer size={16}/> Print</button>
             </div>
           </div>
         </div>
      )}
    </div>
  );
}