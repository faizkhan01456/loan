import { useState } from "react";
import api from "../lib/axios.config";

const useCoApplicants = () => {

  const [coApplicants, setCoApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCoApplicants = async (loanApplicationId) => {
    if (!loanApplicationId) return;

    try {
      setLoading(true);
      setError(null);

      const res = await api.get(
        `/co-applicant/loan/${loanApplicationId}`
      );

      setCoApplicants(res.data.data || []);

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Failed to fetch co-applicants"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    coApplicants,
    loading,
    error,
    fetchCoApplicants,
  };
};

export default useCoApplicants;
