// useBranches.js
import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios.config";
import toast from "react-hot-toast";

export default function useBranches() {
  const [branches, setBranches] = useState([]);
  const [mainBranches, setMainBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // -------------------------------
  // 🌳 Build Hierarchy
  // -------------------------------
  const buildHierarchy = (branchList) => {
    const map = {};
    const roots = [];

    // First pass: create map with empty subBranches array
    branchList.forEach((b) => {
      map[b.id] = { 
        ...b, 
        subBranches: [],
        _count: b._count || { subBranches: 0 }
      };
    });

    // Second pass: build hierarchy
    branchList.forEach((b) => {
      if (b.parentBranchId && map[b.parentBranchId]) {
        map[b.parentBranchId].subBranches.push(map[b.id]);
      } else if (!b.parentBranchId) {
        roots.push(map[b.id]);
      }
    });

    return roots;
  };

  // -------------------------------
  // 📥 Get All Branches
  // -------------------------------
  const fetchBranches = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/branches");

      if (res.data?.success) {
        const structured = buildHierarchy(res.data.data || []);
        setBranches(structured);
      } else {
        setBranches([]);
      }
    } catch (err) {
      console.error("Fetch branches failed:", err);
      setError(err.response?.data?.message || err.message);
      setBranches([]);
      toast.error("Failed to load branches");
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------------------
  // 📥 Get Main Branches
  // -------------------------------
  const fetchMainBranches = useCallback(async () => {
    try {
      // Use the dedicated endpoint for main branches
      const res = await api.get("/branches/main");

      if (res.data?.success) {
        setMainBranches(res.data.data || []);
      }
    } catch (err) {
      console.error("Fetch main branches failed:", err);
      setMainBranches([]);
    }
  }, []);

  // -------------------------------
  // ➕ Create Branch
  // -------------------------------
  const createBranch = async (payload) => {
    try {
      const res = await api.post("/branches", payload);
      
      if (res.data?.success) {
        await fetchBranches();
        await fetchMainBranches();
        return { success: true, data: res.data.data };
      }
      return { success: false, error: new Error("Failed to create branch") };
    } catch (err) {
      console.error("Create branch failed:", err);
      return { 
        success: false, 
        error: err.response?.data || err 
      };
    }
  };

  // -------------------------------
  // ✏️ Update Branch
  // -------------------------------
  const updateBranch = async (id, payload) => {
    try {
      const res = await api.put(`/branches/${id}`, payload);
      
      if (res.data?.success) {
        await fetchBranches();
        await fetchMainBranches();
        return { success: true, data: res.data.data };
      }
      return { success: false, error: new Error("Failed to update branch") };
    } catch (err) {
      console.error("Update branch failed:", err);
      return { 
        success: false, 
        error: err.response?.data || err 
      };
    }
  };

  // -------------------------------
  // 🗑️ Delete Branch (soft delete)
  // -------------------------------
  const deleteBranch = async (id) => {
    try {
      const res = await api.delete(`/branches/${id}`);
      
      if (res.data?.success) {
        await fetchBranches();
        await fetchMainBranches();
        return { success: true };
      }
      return { success: false, error: new Error("Failed to delete branch") };
    } catch (err) {
      console.error("Delete branch failed:", err);
      return { 
        success: false, 
        error: err.response?.data || err 
      };
    }
  };

  // -------------------------------
  // 🔄 Refresh all data
  // -------------------------------
  const refreshBranches = useCallback(async () => {
    await Promise.all([fetchBranches(), fetchMainBranches()]);
  }, [fetchBranches, fetchMainBranches]);

  // -------------------------------
  // 🚀 Initial Load
  // -------------------------------
  useEffect(() => {
    refreshBranches();
  }, [refreshBranches]);

  return {
    branches,
    mainBranches,
    loading,
    error,
    fetchBranches,
    fetchMainBranches,
    refreshBranches,
    createBranch,
    updateBranch,
    deleteBranch,
  };
}