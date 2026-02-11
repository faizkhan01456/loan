import { useState } from "react";
import api from "../lib/axios.config";
import axios from "axios";

const useDocuments = () => {
  const [applications, setApplications] = useState([]);
  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const res = await api.get("/loan-applications");

      setApplications(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch loans");
    } finally {
      setLoading(false);
    }
  };

 const fetchDocumentsByLoanId = async (loanId) => {
  const res = await api.get(
  `/loan-applications/${loanId}/documents`
);


  setDocuments(prev => ({
    ...prev,
    [loanId]: res.data.data,
  }));
};


 const uploadDocument = async (loanId, file, documentType) => {
  const formData = new FormData();

  // IMPORTANT
  formData.append(documentType, file);

 return api.post(
  `/loan-applications/${loanId}/documents`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

};



  const verifyDocument = async (docId) => {
    await api.patch(`/documents/${docId}/verify`);
  };

  const rejectDocument = async (docId, reason) => {
    await api.patch(`/documents/${docId}/reject`, {
      reason,
    });
  };

  return {
    applications,
    documents,
    loading,
    error,
    fetchApplications,
    fetchDocumentsByLoanId,
    uploadDocument,
    verifyDocument,
    rejectDocument,
  };
};

export default useDocuments;
