// BranchForm.jsx
import React, { useState, useEffect } from "react";
import { MapPin, X, Building2, Loader } from "lucide-react";

const BranchForm = ({ branch = null, mainBranches = [], onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: branch?.name || "",
    code: branch?.code || "",
    type: branch?.type || "MAIN", // Backend uses "MAIN" and "SUB"
    parentBranchId: branch?.parentBranchId || "",
    city: branch?.city || "",
    state: branch?.state || "",
    address: branch?.address || "",
    head: branch?.head || "",
    isActive: branch?.isActive !== undefined ? branch.isActive : true,
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Auto-generate code from name (optional)
  useEffect(() => {
    if (!branch && formData.name && !formData.code) {
      const generatedCode = formData.name
        .toUpperCase()
        .replace(/\s+/g, '_')
        .replace(/[^A-Z0-9_]/g, '')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
      
      setFormData(prev => ({ ...prev, code: generatedCode }));
    }
  }, [formData.name]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      let updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Reset parent if MAIN selected
      if (name === "type" && value === "MAIN") {
        updated.parentBranchId = "";
      }

      return updated;
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Branch name is required";
    }

    if (!formData.code.trim()) {
      newErrors.code = "Branch code is required";
    } else if (formData.code.length < 3) {
      newErrors.code = "Code must be at least 3 characters";
    }

    if (formData.type === "SUB" && !formData.parentBranchId) {
      newErrors.parentBranchId = "Parent branch is required for subsidiary branches";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.name.trim(),
      code: formData.code.trim(),
      type: formData.type, // "MAIN" or "SUB"
      parentBranchId: formData.parentBranchId || null,
      city: formData.city.trim() || null,
      state: formData.state.trim() || null,
      address: formData.address.trim() || null,
      head: formData.head.trim() || null,
      isActive: formData.isActive,
    };

    await onSave(payload);
    setLoading(false);
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
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            disabled={loading}
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
            
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Branch Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Branch Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Jaipur Main Branch"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  disabled={loading}
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
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
                  placeholder="e.g., JPR001"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.code ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  disabled={loading}
                  required
                />
                {errors.code && (
                  <p className="mt-1 text-sm text-red-600">{errors.code}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Unique identifier for the branch
                </p>
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
                  disabled={loading}
                >
                  <option value="MAIN">Main Branch</option>
                  <option value="SUB">Subsidiary</option>
                </select>
              </div>
            </div>

            {/* Parent Branch (only for subsidiary) */}
            {formData.type === "SUB" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Parent Branch <span className="text-red-500">*</span>
                </label>
                <select
                  name="parentBranchId"
                  value={formData.parentBranchId}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.parentBranchId ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  disabled={loading}
                >
                  <option value="">Select Parent Branch</option>
                  {mainBranches
                    .filter((parent) => !branch || parent.id !== branch.id)
                    .map((parent) => (
                      <option key={parent.id} value={parent.id}>
                        {parent.name} ({parent.code})
                      </option>
                    ))}
                </select>
                {errors.parentBranchId && (
                  <p className="mt-1 text-sm text-red-600">{errors.parentBranchId}</p>
                )}
              </div>
            )}

            {/* Location Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
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
                    placeholder="e.g., Jaipur"
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g., Rajasthan"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Address */}
            <div>
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
                disabled={loading}
              />
            </div>

            {/* Branch Head */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Branch Manager/Head
              </label>
              <input
                type="text"
                name="head"
                value={formData.head}
                onChange={handleChange}
                placeholder="Name of branch manager"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                disabled={loading}
              />
            </div>

            {/* Active Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isActive"
                    value="true"
                    checked={formData.isActive === true}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: true }))}
                    className="text-green-500"
                    disabled={loading}
                  />
                  <span className="text-green-700 font-medium">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isActive"
                    value="false"
                    checked={formData.isActive === false}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: false }))}
                    className="text-red-500"
                    disabled={loading}
                  />
                  <span className="text-red-700 font-medium">Inactive</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  {branch ? "Updating..." : "Saving..."}
                </>
              ) : (
                branch ? "Update Branch" : "Save Branch"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchForm;