// BranchForm.jsx
import React, { useState } from "react";
import { MapPin, X } from "lucide-react";

const BranchForm = ({ branch = null, mainBranches = [], onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: branch?.name || "",
    code: branch?.code || "",
    type: branch?.type || "SUBSIDIARY",
    parentBranchId: branch?.parentBranchId || "",
    city: branch?.city || "",
    state: branch?.state || "",
    head: branch?.head || "",
    isActive: branch?.isActive !== undefined ? branch.isActive : true,
    address: branch?.address || "",
  });



  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => {
      let updated = {
        ...prev,
        [name]: type === "radio" ? value === "true" : value,
      };

      // Reset parent if MAIN selected
      if (name === "type" && value === "MAIN") {
        updated.parentBranchId = "";
      }

      return updated;
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.type === "SUBSIDIARY" &&
      !formData.parentBranchId
    ) {
      alert("Please select parent branch");
      return;
    }

    const payload = {
      name: formData.name,
      code: formData.code,
      type: formData.type,
      parentBranchId: formData.parentBranchId || null,
      isActive: formData.isActive,
      city: formData.city,
      state: formData.state,
      head: formData.head,
      address: formData.address,
    };

    onSave(payload);
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-300">

        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-xl text-gray-800">
              {branch ? "Edit Branch" : "Add New Branch"}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {branch ? "Update branch details" : "Add a new branch to your organization"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Branch Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Branch Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Jaipur Main Branch"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>

              {/* Branch Code */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Branch Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g. BR-2025-001"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>

              {/* Branch Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Branch Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option value="MAIN">Main Branch</option>
                  <option value="SUBSIDIARY">Subsidiary</option>
                </select>
              </div>

              {/* Parent Branch (only for subsidiary) */}
              {formData.type === "SUBSIDIARY" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Parent Branch
                  </label>
                  <select
                    name="parentBranchId"
                    value={formData.parentBranchId}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="">Select Parent Branch</option>
                    {mainBranches
                      .filter((parent) => parent.id !== branch?.id)
                      .map((parent) => (
                        <option key={parent.id} value={parent.id}>
                          {parent.name}
                        </option>
                      ))}

                  </select>
                </div>
              )}

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State Name"
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City Name"
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>
              {/* Branch Manager */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Branch Manager
                </label>
                <input
                  type="text"
                  name="head"
                  value={formData.head}
                  onChange={handleChange}
                  placeholder="Select Manager"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Active Status */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="isActive"
                      value="true"
                      checked={formData.isActive === true}
                      onChange={handleChange}
                      className="text-green-500"
                    />
                    <div>
                      <span className="font-medium text-gray-700">Active</span>
                      <p className="text-sm text-gray-500">Branch is operational</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="isActive"
                      value="false"
                      checked={formData.isActive === false}
                      onChange={handleChange}
                      className="text-red-500"
                    />
                    <div>
                      <span className="font-medium text-gray-700">Inactive</span>
                      <p className="text-sm text-gray-500">Branch is closed/temporarily closed</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Full branch address..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                />
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
            >
              {branch ? "Update Branch" : "Save Branch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchForm;