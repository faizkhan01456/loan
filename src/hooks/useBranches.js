import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios.config";

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

    branchList.forEach((b) => {
      map[b.id] = { ...b, subBranches: [] };
    });

    branchList.forEach((b) => {
      if (b.parentBranchId) {
        map[b.parentBranchId]?.subBranches.push(map[b.id]);
      } else {
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
      }
    } catch (err) {
      console.error("Fetch branches failed:", err);
      setError(err);
      setBranches([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------------------
  // 📥 Get Main Branches
  // -------------------------------
  const fetchMainBranches = useCallback(async () => {
    try {
      const res = await api.get("/branches");

      if (res.data?.success) {
        setMainBranches(res.data.data || []);
      }
    } catch (err) {
      console.error("Fetch main branches failed:", err);
    }
  }, []);

  // -------------------------------
  // ➕ Create Branch
  // -------------------------------
  const createBranch = async (payload) => {
    try {
      await api.post("/branches", payload);
      await fetchBranches();
      return { success: true };
    } catch (err) {
      console.error("Create branch failed:", err);
      return { success: false, error: err };
    }
  };

  // -------------------------------
  // ✏️ Update Branch
  // -------------------------------
  const updateBranch = async (id, payload) => {
    try {
      await api.put(`/branches/${id}`, payload);
      await fetchBranches();
      return { success: true };
    } catch (err) {
      console.error("Update branch failed:", err);
      return { success: false, error: err };
    }
  };

  // -------------------------------
  // 🗑️ Delete Branch
  // -------------------------------
  const deleteBranch = async (id) => {
    try {
      await api.delete(`/branches/${id}`);
      await fetchBranches();
      return { success: true };
    } catch (err) {
      console.error("Delete branch failed:", err);
      return { success: false, error: err };
    }
  };

  // -------------------------------
  // 🚀 Initial Load
  // -------------------------------
  useEffect(() => {
    fetchBranches();
    fetchMainBranches();
  }, [fetchBranches, fetchMainBranches]);

  return {
    branches,
    mainBranches,
    loading,
    error,
    fetchBranches,
    fetchMainBranches,
    createBranch,
    updateBranch,
    deleteBranch,
  };
}
