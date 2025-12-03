import React, { useState, useMemo } from 'react';
import { 
  Car, Truck, Bike, Search, Plus, Filter, MoreVertical, 
  Edit, Trash2, CheckCircle, XCircle, DollarSign, Settings, 
  Package, Download, X, Save 
} from 'lucide-react';

export default function VehicleMasters() {
  // --- MOCK DATA ---
  const initialVehicles = [
    { id: "V-101", type: "4-Wheeler", make: "Tata Motors", model: "Nexon", variant: "Creative +", price: 1250000, status: "Active", fuel: "Petrol" },
    { id: "V-102", type: "4-Wheeler", make: "Mahindra", model: "XUV 700", variant: "AX7 Luxury", price: 2600000, status: "Active", fuel: "Diesel" },
    { id: "V-103", type: "2-Wheeler", make: "Honda", model: "Activa 6G", variant: "Standard", price: 85000, status: "Active", fuel: "Petrol" },
    { id: "V-104", type: "2-Wheeler", make: "Royal Enfield", model: "Classic 350", variant: "Dark Stealth", price: 220000, status: "Active", fuel: "Petrol" },
    { id: "V-105", type: "Commercial", make: "Ashok Leyland", model: "Dost+", variant: "LS", price: 750000, status: "Inactive", fuel: "Diesel" },
    { id: "V-106", type: "4-Wheeler", make: "Hyundai", model: "Creta", variant: "SX (O)", price: 1800000, status: "Active", fuel: "Diesel" },
  ];

  // --- STATE ---
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const initialForm = { id: '', type: '4-Wheeler', make: '', model: '', variant: '', price: '', fuel: 'Petrol', status: 'Active' };
  const [formData, setFormData] = useState(initialForm);

  // --- STATS ---
  const stats = useMemo(() => {
      return {
          total: vehicles.length,
          active: vehicles.filter(v => v.status === 'Active').length,
          avgPrice: Math.round(vehicles.reduce((acc, v) => acc + v.price, 0) / vehicles.length)
      };
  }, [vehicles]);

  // --- FILTER LOGIC ---
  const filteredVehicles = useMemo(() => {
      return vehicles.filter(v => {
          const matchesSearch = 
              v.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
              v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
              v.variant.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesFilter = filterType === "All" || v.type === filterType;
          return matchesSearch && matchesFilter;
      });
  }, [vehicles, searchTerm, filterType]);

  // --- HANDLERS ---
  const handleAddEdit = (e) => {
      e.preventDefault();
      if (isEditing) {
          setVehicles(vehicles.map(v => v.id === formData.id ? { ...formData, price: Number(formData.price) } : v));
      } else {
          const newVehicle = { 
              ...formData, 
              id: `V-${100 + vehicles.length + 1}`,
              price: Number(formData.price)
          };
          setVehicles([newVehicle, ...vehicles]);
      }
      setShowModal(false);
      setFormData(initialForm);
  };

  const openEdit = (vehicle) => {
      setFormData(vehicle);
      setIsEditing(true);
      setShowModal(true);
  };

  const openAdd = () => {
      setFormData(initialForm);
      setIsEditing(false);
      setShowModal(true);
  };

  const handleDelete = (id) => {
      if(window.confirm("Are you sure you want to delete this vehicle?")) {
          setVehicles(vehicles.filter(v => v.id !== id));
      }
  };

  // --- UI COMPONENTS ---
  const StatCard = ({ label, value, icon: Icon, color }) => (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-xl ${color}`}>
              <Icon size={24} />
          </div>
      </div>
  );

  return (
      <div className="min-h-screen bg-slate-50 p-6 lg:p-10 font-sans">
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div>
                  <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                      <Car className="text-blue-600" size={32}/> Vehicle Masters
                  </h1>
                  <p className="text-slate-500 mt-1 ml-11">Manage vehicle models, pricing, and specifications.</p>
              </div>
              <button onClick={openAdd} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg font-medium flex items-center gap-2 transition">
                  <Plus size={20} /> Add Vehicle
              </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard label="Total Models" value={stats.total} icon={Package} color="bg-blue-50 text-blue-600" />
              <StatCard label="Active Vehicles" value={stats.active} icon={CheckCircle} color="bg-green-50 text-green-600" />
              <StatCard label="Avg. Base Price" value={`₹${(stats.avgPrice / 100000).toFixed(2)} L`} icon={DollarSign} color="bg-purple-50 text-purple-600" />
          </div>

          {/* MAIN CONTENT */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              
              {/* Toolbar */}
              <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
                  <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                      {['All', '4-Wheeler', '2-Wheeler', 'Commercial'].map(type => (
                          <button 
                              key={type}
                              onClick={() => setFilterType(type)}
                              className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${filterType === type ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                              {type}
                          </button>
                      ))}
                  </div>
                  
                  <div className="flex gap-3 w-full md:w-auto">
                      <div className="relative flex-1 md:w-64">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input 
                              type="text" 
                              placeholder="Search Make or Model..." 
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                          />
                      </div>
                      <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"><Download size={18}/></button>
                  </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                          <tr>
                              <th className="px-6 py-4">Vehicle Info</th>
                              <th className="px-6 py-4">Category</th>
                              <th className="px-6 py-4">Fuel</th>
                              <th className="px-6 py-4">Ex-Showroom Price</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          {filteredVehicles.map((v) => (
                              <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                                  <td className="px-6 py-4">
                                      <div className="font-bold text-slate-800">{v.make} {v.model}</div>
                                      <div className="text-xs text-slate-500">{v.variant} • <span className="font-mono text-blue-500">{v.id}</span></div>
                                  </td>
                                  <td className="px-6 py-4">
                                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                                          v.type === '2-Wheeler' ? 'bg-orange-50 text-orange-700' : 
                                          v.type === 'Commercial' ? 'bg-purple-50 text-purple-700' : 
                                          'bg-blue-50 text-blue-700'
                                      }`}>
                                          {v.type}
                                      </span>
                                  </td>
                                  <td className="px-6 py-4 text-slate-600">{v.fuel}</td>
                                  <td className="px-6 py-4 font-bold text-slate-700">₹ {v.price.toLocaleString()}</td>
                                  <td className="px-6 py-4">
                                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${v.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                          {v.status === 'Active' ? <CheckCircle size={10}/> : <XCircle size={10}/>}
                                          {v.status}
                                      </span>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                      <div className="flex justify-end gap-2">
                                          <button onClick={() => openEdit(v)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg border border-transparent hover:border-blue-100 transition"><Edit size={16}/></button>
                                          <button onClick={() => handleDelete(v.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition"><Trash2 size={16}/></button>
                                      </div>
                                  </td>
                              </tr>
                          ))}
                          {filteredVehicles.length === 0 && (
                              <tr><td colSpan="6" className="p-10 text-center text-slate-400">No vehicles found matching criteria.</td></tr>
                          )}
                      </tbody>
                  </table>
              </div>
          </div>

          {/* ADD/EDIT MODAL */}
          {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in slide-in-from-bottom-8">
                      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                          <h3 className="text-lg font-bold text-slate-800">{isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
                          <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><X size={20}/></button>
                      </div>
                      <form onSubmit={handleAddEdit} className="p-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                                  <select required value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/20 outline-none">
                                      <option>4-Wheeler</option>
                                      <option>2-Wheeler</option>
                                      <option>Commercial</option>
                                      <option>Electric</option>
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Make</label>
                                  <input required type="text" value={formData.make} onChange={(e) => setFormData({...formData, make: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="e.g. Tata" />
                              </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Model</label>
                                  <input required type="text" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="e.g. Nexon" />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Variant</label>
                                  <input type="text" value={formData.variant} onChange={(e) => setFormData({...formData, variant: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="e.g. XM" />
                              </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Price (₹)</label>
                                  <input required type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="0.00" />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Fuel Type</label>
                                  <select value={formData.fuel} onChange={(e) => setFormData({...formData, fuel: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/20 outline-none">
                                      <option>Petrol</option>
                                      <option>Diesel</option>
                                      <option>CNG</option>
                                      <option>Electric</option>
                                      <option>Hybrid</option>
                                  </select>
                              </div>
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500/20 outline-none">
                                  <option>Active</option>
                                  <option>Inactive</option>
                                  <option>Discontinued</option>
                              </select>
                          </div>
                          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancel</button>
                              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md font-medium flex items-center gap-2">
                                  <Save size={18}/> Save Vehicle
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          )}

      </div>
  );
}