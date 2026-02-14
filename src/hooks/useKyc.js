import { useState } from "react";
import api from "../lib/axios.config";

const useKyc = () => {

  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ==============================
  // 🔹 GET MY KYC
  // ==============================
  const fetchMyKyc = async () => {
    try {
      setLoading(true);

      const res = await api.get("/kyc/me");

      setKyc(res.data.data);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch KYC");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // 🔹 UPLOAD KYC DOCUMENTS
  // ==============================
  const uploadKycDocuments = async (userId, files) => {
    /**
     files = {
       aadhaar_front: File,
       aadhaar_back: File,
       pan_card: File,
       photo: File
     }
     */

    const formData = new FormData();

    if (files.aadhaar_front)
      formData.append("aadhaar_front", files.aadhaar_front);

    if (files.aadhaar_back)
      formData.append("aadhaar_back", files.aadhaar_back);

    if (files.pan_card)
      formData.append("pan_card", files.pan_card);

    if (files.photo)
      formData.append("photo", files.photo);

    return api.post(
      `/kyc/document/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  };

  // ==============================
  // 🔹 VERIFY KYC (ADMIN)
  // ==============================
  const verifyKyc = async (kycId, status) => {
    /**
     status = VERIFIED / REJECTED
     */

    return api.put(
      `/kyc/${kycId}/verify`,
      { status }
    );
  };

  return {
    kyc,
    loading,
    error,
    fetchMyKyc,
    uploadKycDocuments,
    verifyKyc
  };
};

export default useKyc;
