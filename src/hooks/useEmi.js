import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "../lib/axios.config";

// EMI LIST
export const useGetEmis = () => {
  return useQuery({
    queryKey: ["emis"],
    queryFn: async () => {
      const { data } = await api.get("/api/emis");
      return data;
    },
  });
};

// GENERATE EMI
export const useGenerateEmi = () => {
  return useMutation({
    mutationFn: async ({ loanId, payload }) => {
      const { data } = await api.post(
        `/api/emi/loan-applications/${loanId}/emis`,
        payload
      );
      return data;
    },
  });
};
