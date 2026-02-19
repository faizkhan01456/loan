import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { logout } from '../../redux/slices/authSlice';
import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});


// LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

//  CURRENT USER (REFRESH FIX)
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/user/${id}`);
      return res.data;
    } catch {
      return rejectWithValue(null);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
 initialState: {
  user: null,
  token: localStorage.getItem("token") || null, // ✅ ADD
  loading: false,
  error: null,
  success: null,
  isAuthenticated: false,
},

  reducers: {
    logout: (state) => {
  state.user = null;
  state.token = null; // ✅ ADD
  state.isAuthenticated = false;

  localStorage.removeItem("uid");
  localStorage.removeItem("token"); // ✅ ADD
},

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.success = action.payload.message;
        state.isAuthenticated = true;

        // 🔥 SAVE UID
        localStorage.setItem("uid", action.payload.data.id);

        // 🔥 SAVE TOKEN
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CURRENT USER
      .addCase(getCurrentUser.fulfilled, (state, action) => {
  state.user = action.payload.data;
  state.isAuthenticated = true;

  // ✅ TOKEN RESTORE
  const token = localStorage.getItem("token");
  if (token) {
    state.token = token;
  }
})

      .addCase(getCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("uid");
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
