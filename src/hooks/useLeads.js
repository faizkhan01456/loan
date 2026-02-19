import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios.config";

export const useGetLeads = () => {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const res = await api.get("/lead/all");
      return res.data.data;
    },
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("/lead", payload), // ✅ FIXED

    onSuccess: () => {
      queryClient.invalidateQueries(["leads"]);
    },
  });
};

// export const useLeadById = (leadId, enabled = false) => {
//   return useQuery({
//     queryKey: ["lead", leadId],
//     queryFn: async () => {
//       const res = await api.get(`/lead/${leadId}`);
//       return res.data.data;   // backend structure
//     },
//     enabled,   // manual trigger control
//   });
// };

export const useLeadSearch = (leadNumber, enabled = true) => {
  return useQuery({
    queryKey: ["lead-search", leadNumber],

    queryFn: async () => {
      const res = await api.get(
        `/lead/all?q=${leadNumber}`
      );

      // 👇 because response nested hai
      return res.data.data.data?.[0] || null;
    },

    enabled: enabled && !!leadNumber,
  });
};