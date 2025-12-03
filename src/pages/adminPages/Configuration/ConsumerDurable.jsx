import React, { useState, useMemo } from 'react';
import { 
  Smartphone, Tv, ShoppingBag, Store, Users, Plus, Search, Filter, 
  Download, Edit, Trash2, MoreVertical, CheckCircle, XCircle, 
  DollarSign, TrendingUp, Package, MapPin, Save, X, FileText, Clock
} from 'lucide-react';

export default function ConsumerDurable() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, products, dealers, loans
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'addProduct', 'addDealer'
  const [searchTerm, setSearchTerm] = useState('');

  // --- MOCK DATA ---
  
  // 1. Products
  const [products, setProducts] = useState([
    { id: "PRD-001", category: "Electronics", name: "iPhone 15 Pro", brand: "Apple", price: 134900, minDownPayment: 20, status: "Active" },
    { id: "PRD-002", category: "Appliances", name: "55\" 4K Smart TV", brand: "Sony", price: 85000, minDownPayment: 15, status: "Active" },
    { id: "PRD-003", category: "Furniture", name: "Royal Oak Sofa Set", brand: "HomeCentre", price: 45000, minDownPayment: 10, status: "Active" },
    { id: "PRD-004", category: "Electronics", name: "Galaxy S24 Ultra", brand: "Samsung", price: 129999, minDownPayment: 20, status: "Inactive" },
  ]);

  // 2. Dealers
  const [dealers, setDealers] = useState([
    { id: "DLR-101", name: "Croma Electronics", city: "Mumbai", contact: "9876543210", activeLoans: 15, payout: "2.5%", status: "Active" },
    { id: "DLR-102", name: "Reliance Digital", city: "Delhi", contact: "9988776655", activeLoans: 42, payout: "2.8%", status: "Active" },
    { id: "DLR-103", name: "Vijay Sales", city: "Pune", contact: "8877665544", activeLoans: 8, payout: "2.0%", status: "Pending" },
  ]);

  // 3. Loan Requests
  const [loans, setLoans] = useState([
    { id: "CD-2024-001", customer: "Amit Verma", product: "iPhone 15 Pro", dealer: "Croma Electronics", amount: 100000, tenure: "12M", status: "Approved" },
    { id: "CD-2024-002", customer: "Sneha Reddy", product: "Sony 55\" TV", dealer: "Reliance Digital", amount: 65000, tenure: "9M", status: "Pending" },
    { id: "CD-2024-003", customer: "Vikram Singh", product: "Sofa Set", dealer: "Local Furniture", amount: 30000, tenure: "6M", status: "Rejected" },
  ]);

  // --- STATS CALCULATION ---
  const stats = useMemo(() => {
      return {
          totalDisbursed: loans.filter(l => l.status === 'Approved').reduce((acc, curr) => acc + curr.amount, 0),
          activeDealers: dealers.filter(d => d.status === 'Active').length,
          totalProducts: products.length,
          pendingLoans: loans.filter(l => l.status === 'Pending').length
      };
  }, [loans, dealers, products]);

  // --- HANDLERS ---
  
  const handleSaveProduct = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newProduct = {
          id: `PRD-00${products.length + 1}`,
          name: formData.get('name'),
          category: formData.get('category'),
          brand: formData.get('brand'),
          price: Number(formData.get('price')),
          minDownPayment: Number(formData.get('dp')),
          status: "Active"
      };
      setProducts([...products, newProduct]);
      setShowModal(false);
  };

  const handleSaveDealer = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newDealer = {
          id: `DLR-${100 + dealers.length + 1}`,
          name: formData.get('name'),
          city: formData.get('city'),
          contact: formData.get('contact'),
          payout: formData.get('payout') + "%",
          activeLoans: 0,
          status: "Active"
      };
      setDealers([...dealers, newDealer]);
      setShowModal(false);
  };

  // --- COMPONENTS ---

  const StatCard = ({ title, value, icon: Icon, color }) => (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
          <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-xl ${color}`}>
              <Icon size={24} />
          </div>
      </div>
  );

  const StatusBadge = ({ status }) => {
      let styles = "bg-gray-100 text-gray-700";
      if (status === 'Active' || status === 'Approved') styles = "bg-green-100 text-green-700 border border-green-200";
      if (status === 'Pending') styles = "bg-orange-100 text-orange-700 border border-orange-200";
      if (status === 'Inactive' || status === 'Rejected') styles = "bg-red-100 text-red-700 border border-red-200";
      
      return <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${styles}`}>{status}</span>;
  };

  // --- TAB RENDERERS ---

  const RenderDashboard = () => (
      <div className="space-y-8 animate-in fade-in zoom-in duration-300">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Total Disbursed" value={`₹${(stats.totalDisbursed / 100000).toFixed(2)} L`} icon={DollarSign} color="bg-blue-50 text-blue-600" />
              <StatCard title="Active Dealers" value={stats.activeDealers} icon={Store} color="bg-purple-50 text-purple-600" />
              <StatCard title="Product Catalog" value={stats.totalProducts} icon={Package} color="bg-orange-50 text-orange-600" />
              <StatCard title="Pending Loans" value={stats.pendingLoans} icon={Clock} color="bg-red-50 text-red-600" />
          </div>

          {/* Recent Loans Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">Recent CD Loan Applications</h3>
                  <button className="text-blue-600 text-sm font-medium hover:underline" onClick={() => setActiveTab('loans')}>View All</button>
              </div>
              <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 font-semibold">
                          <tr><th className="px-6 py-4">Loan ID</th><th className="px-6 py-4">Customer</th><th className="px-6 py-4">Product</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Status</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          {loans.slice(0, 3).map(loan => (
                              <tr key={loan.id} className="hover:bg-slate-50">
                                  <td className="px-6 py-4 text-blue-600 font-medium">{loan.id}</td>
                                  <td className="px-6 py-4">{loan.customer}</td>
                                  <td className="px-6 py-4 text-slate-600">{loan.product}</td>
                                  <td className="px-6 py-4 font-bold">₹{loan.amount.toLocaleString()}</td>
                                  <td className="px-6 py-4"><StatusBadge status={loan.status} /></td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  );

  const RenderProducts = () => (
      <div className="animate-in fade-in duration-300">
          <div className="flex justify-between items-center mb-6">
              <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Search Products..." className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <button onClick={() => {setModalType('addProduct'); setShowModal(true);}} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 transition"><Plus size={16}/> Add Product</button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-semibold">
                      <tr><th className="px-6 py-4">Product Info</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">Min DP %</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
                          <tr key={p.id} className="hover:bg-slate-50">
                              <td className="px-6 py-4">
                                  <div className="font-bold text-slate-800">{p.name}</div>
                                  <div className="text-xs text-slate-500">{p.brand} • {p.id}</div>
                              </td>
                              <td className="px-6 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">{p.category}</span></td>
                              <td className="px-6 py-4 font-bold text-slate-700">₹{p.price.toLocaleString()}</td>
                              <td className="px-6 py-4 text-slate-600">{p.minDownPayment}%</td>
                              <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                              <td className="px-6 py-4 text-right">
                                  <button className="p-2 text-slate-400 hover:text-blue-600 rounded-full hover:bg-blue-50"><MoreVertical size={16}/></button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  );

  const RenderDealers = () => (
      <div className="animate-in fade-in duration-300">
          <div className="flex justify-between items-center mb-6">
              <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Search Dealers..." className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <button onClick={() => {setModalType('addDealer'); setShowModal(true);}} className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-purple-700 shadow-lg shadow-purple-200 transition"><Plus size={16}/> Onboard Dealer</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dealers.map(dealer => (
                  <div key={dealer.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-bl-full -z-0 group-hover:bg-blue-50 transition"></div>
                      <div className="flex items-center gap-3 mb-4 relative z-10">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                              {dealer.name.charAt(0)}
                          </div>
                          <div>
                              <h3 className="font-bold text-slate-800">{dealer.name}</h3>
                              <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={12}/> {dealer.city}</p>
                          </div>
                      </div>
                      <div className="space-y-2 text-sm relative z-10">
                          <div className="flex justify-between"><span className="text-slate-500">Active Loans</span><span className="font-bold">{dealer.activeLoans}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Payout %</span><span className="font-bold text-green-600">{dealer.payout}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Status</span><StatusBadge status={dealer.status} /></div>
                      </div>
                      <div className="mt-4 pt-4 border-t flex justify-between items-center relative z-10">
                          <span className="text-xs font-mono text-slate-400">{dealer.id}</span>
                          <button className="text-blue-600 text-xs font-bold hover:underline">View Details</button>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <ShoppingBag className="text-blue-600" size={32}/> Consumer Durable Loans
          </h1>
          <p className="text-slate-500 mt-1 ml-11">Manage products, dealers, and consumer financing.</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2 border-b border-slate-200 no-scrollbar">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: <TrendingUp size={18}/> },
          { id: 'products', label: 'Product Master', icon: <Smartphone size={18}/> },
          { id: 'dealers', label: 'Dealer Network', icon: <Store size={18}/> },
          { id: 'loans', label: 'Loan Requests', icon: <FileText size={18}/> },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-medium transition-all relative top-[1px] whitespace-nowrap
              ${activeTab === tab.id 
                ? 'bg-white text-blue-600 border border-slate-200 border-b-white z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
          {activeTab === 'dashboard' && <RenderDashboard />}
          {activeTab === 'products' && <RenderProducts />}
          {activeTab === 'dealers' && <RenderDealers />}
          {activeTab === 'loans' && (
              <div className="bg-white p-10 rounded-xl border border-dashed text-center text-slate-400">
                  <FileText size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Full loan list functionality similar to Dashboard.</p>
              </div>
          )}
      </div>

      {/* --- MODALS --- */}
      {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in slide-in-from-bottom-10">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <h3 className="text-lg font-bold text-slate-800">
                          {modalType === 'addProduct' ? 'Add New Product' : 'Onboard New Dealer'}
                      </h3>
                      <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} className="text-slate-500"/></button>
                  </div>
                  
                  <form onSubmit={modalType === 'addProduct' ? handleSaveProduct : handleSaveDealer} className="p-6 space-y-4">
                      {modalType === 'addProduct' ? (
                          <>
                              <div><label className="text-xs font-bold text-slate-500 uppercase mb-1">Product Name</label><input name="name" required className="w-full p-2.5 border rounded-lg" placeholder="e.g. iPhone 15" /></div>
                              <div className="grid grid-cols-2 gap-4">
                                  <div><label className="text-xs font-bold text-slate-500 uppercase mb-1">Category</label><select name="category" className="w-full p-2.5 border rounded-lg bg-white"><option>Electronics</option><option>Appliances</option><option>Furniture</option></select></div>
                                  <div><label className="text-xs font-bold text-slate-500 uppercase mb-1">Brand</label><input name="brand" required className="w-full p-2.5 border rounded-lg" placeholder="e.g. Apple" /></div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                  <div><label className="text-xs font-bold text-slate-500 uppercase mb-1">Price (₹)</label><input name="price" type="number" required className="w-full p-2.5 border rounded-lg" placeholder="0.00" /></div>
                                  <div><label className="text-xs font-bold text-slate-500 uppercase mb-1">Min Down Payment %</label><input name="dp" type="number" required className="w-full p-2.5 border rounded-lg" placeholder="20" /></div>
                              </div>
                          </>
                      ) : (
                          <>
                              <div><label className="text-xs font-bold text-slate-500 uppercase mb-1">Dealer Name</label><input name="name" required className="w-full p-2.5 border rounded-lg" placeholder="e.g. Croma" /></div>
                              <div className="grid grid-cols-2 gap-4">
                                  <div><label className="text-xs font-bold text-slate-500 uppercase mb-1">City</label><input name="city" required className="w-full p-2.5 border rounded-lg" placeholder="e.g. Mumbai" /></div>
                                  <div><label className="text-xs font-bold text-slate-500 uppercase mb-1">Contact No.</label><input name="contact" required className="w-full p-2.5 border rounded-lg" placeholder="98765..." /></div>
                              </div>
                              <div><label className="text-xs font-bold text-slate-500 uppercase mb-1">Commission Payout (%)</label><input name="payout" type="number" step="0.1" required className="w-full p-2.5 border rounded-lg" placeholder="2.5" /></div>
                          </>
                      )}
                      
                      <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-4">
                          <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancel</button>
                          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md font-medium flex items-center gap-2">
                              <Save size={18}/> Save
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

    </div>
  );
}