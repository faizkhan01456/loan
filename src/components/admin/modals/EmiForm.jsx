import React, { useState, useEffect } from "react";
import { X, Loader2, ChevronDown } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useGenerateEmi } from "../../../hooks/useEmi";

const EmiForm = ({
  isOpen,
  onClose,
  emiVoucher = {},
  onEmiVoucherChange,
}) => {
  const generateEmi = useGenerateEmi();
  const [loadingLoan, setLoadingLoan] = useState(false);
  const [loanNumberInput, setLoanNumberInput] = useState("");
  const [showLoanDetails, setShowLoanDetails] = useState(false);

  // RESET FORM WHEN OPENED WITH NEW LOAN
  useEffect(() => {
    if (isOpen && emiVoucher?.loanId) {
      setLoanNumberInput(emiVoucher.loanNumber || "");
      setShowLoanDetails(true);
    } else if (isOpen && !emiVoucher?.loanId) {
      onEmiVoucherChange({
        loanNumber: "",
        loanId: "",
        customerName: "",
        approvedAmount: "",
        interestRate: "",
        tenureMonths: "",
        interestType: "FLAT",
        emiStartDate: "",
      });
      setLoanNumberInput("");
      setShowLoanDetails(false);
    }
  }, [isOpen]);

  // FETCH LOAN BY NUMBER
  const fetchLoanByNumber = async (loanNumber) => {
    try {
      const response = await axios.get(
        `/api/loan-applications/${loanNumber}`
      );
      
      const loanData = response.data?.data || response.data;
      return loanData;
    } catch (error) {
      console.error("Error fetching loan:", error);
      throw error;
    }
  };

  // HANDLE LOAN NUMBER CHANGE
  const handleLoanNumberChange = async (loanNumber) => {
    setLoanNumberInput(loanNumber);
    onEmiVoucherChange("loanNumber", loanNumber);

    if (!loanNumber.trim() || loanNumber.length < 5) return;

    setLoadingLoan(true);

    try {
      const loan = await fetchLoanByNumber(loanNumber);
      console.log("Loan Response =>", loan);

      // Update form with exact field names as per API
      onEmiVoucherChange({
        loanId: loan.id || loan._id || "",
        customerName: loan.applicantName || loan.customerName || "",
        approvedAmount: loan.approvedAmount || loan.loanAmount || 0,
        interestRate: loan.interestRate || "",
        tenureMonths: loan.tenureMonths || loan.tenure || "",
      });

      setShowLoanDetails(true);
      toast.success("EMI Details fetched successfully");
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Invalid Loan Number or Loan not found");
      
      onEmiVoucherChange({
        loanId: "",
        customerName: "",
        approvedAmount: "",
        interestRate: "",
        tenureMonths: "",
      });
      setShowLoanDetails(false);
    } finally {
      setLoadingLoan(false);
    }
  };

  // VALIDATE FORM
  const validateForm = () => {
    if (!emiVoucher.emiStartDate) {
      toast.error("Please select EMI start date");
      return false;
    }

    if (!emiVoucher.approvedAmount || emiVoucher.approvedAmount <= 0) {
      toast.error("Please enter valid approved amount");
      return false;
    }

    if (!emiVoucher.interestRate || emiVoucher.interestRate <= 0) {
      toast.error("Please enter valid interest rate");
      return false;
    }

    if (!emiVoucher.tenureMonths || emiVoucher.tenureMonths <= 0) {
      toast.error("Please enter valid tenure");
      return false;
    }

    return true;
  };

  // GENERATE EMI
  const handleGenerateEmi = async () => {
    if (!validateForm()) return;

    try {
      // Exact payload as per API requirement
      const payload = {
        approvedAmount: Number(emiVoucher.approvedAmount),
        interestRate: Number(emiVoucher.interestRate),
        tenureMonths: Number(emiVoucher.tenureMonths),
        interestType: emiVoucher.interestType || "FLAT",
        emiStartDate: emiVoucher.emiStartDate,
      };

      console.log("Sending payload:", payload);

      await generateEmi.mutateAsync({
        loanId: emiVoucher.loanId,
        payload,
      });

      toast.success("EMI Generated Successfully");
      onClose();
    } catch (error) {
      console.error("EMI Generation Error:", error);
      toast.error(error.response?.data?.message || "Failed to generate EMI");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl">
        
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Generate EMI</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-5 space-y-4">
          
          {/* Loan Number Input with Generate Button */}
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Loan Number"
                value={loanNumberInput}
                onChange={(e) => handleLoanNumberChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                disabled={loadingLoan}
              />
            </div>
            <button
              onClick={() => handleLoanNumberChange(loanNumberInput)}
              disabled={loadingLoan || !loanNumberInput}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loadingLoan ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Generate EMI"
              )}
            </button>
          </div>

          {/* Loan Details Section - Shows only when loan is fetched */}
          {showLoanDetails && emiVoucher.loanId && (
            <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
              
              {/* Customer Name - Read Only */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={emiVoucher.customerName || ""}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600"
                />
              </div>

              {/* Approved Amount */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Approved Amount
                </label>
                <input
                  type="number"
                  value={emiVoucher.approvedAmount || ""}
                  onChange={(e) => onEmiVoucherChange("approvedAmount", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter approved amount"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Interest Rate
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={emiVoucher.interestRate || ""}
                  onChange={(e) => onEmiVoucherChange("interestRate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter interest rate"
                />
              </div>

              {/* Tenure Months */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Tenure (Months)
                </label>
                <input
                  type="number"
                  value={emiVoucher.tenureMonths || ""}
                  onChange={(e) => onEmiVoucherChange("tenureMonths", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter tenure in months"
                />
              </div>

              {/* Interest Type Dropdown */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Interest Type
                </label>
                <div className="relative">
                  <select
                    value={emiVoucher.interestType || "FLAT"}
                    onChange={(e) => onEmiVoucherChange("interestType", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="FLAT">FLAT</option>
                    <option value="REDUCING">REDUCING</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* EMI Start Date */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  EMI Start Date
                </label>
                <input
                  type="date"
                  value={emiVoucher.emiStartDate || ""}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => onEmiVoucherChange("emiStartDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleGenerateEmi}
            disabled={generateEmi.isPending || !emiVoucher.loanId}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {generateEmi.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate EMI"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmiForm;