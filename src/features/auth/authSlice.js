import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* =========================
   Load From LocalStorage Safely
========================= */
let userFromStorage = null;
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    userFromStorage = JSON.parse(storedUser);
  }
} catch (err) {
  console.warn("Failed to parse user from localStorage:", err);
  userFromStorage = null;
}

const tokenFromStorage = localStorage.getItem("token") || null;

/* =========================
   REGISTER
========================= */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://forum-istad-api.cheat.casa/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Register failed");

      return data; // Can contain { user, token, message }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* =========================
   LOGIN
========================= */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, remember }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://forum-istad-api.cheat.casa/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) return rejectWithValue(data.message || "Login failed");

      // Save to storage depending on "remember me"
      if (remember) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("token", data.token);
      }

      return data; // { user, token }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* =========================
   SLICE
========================= */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage,
    token: tokenFromStorage,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.clear();
    },
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* =========================
         REGISTER
      ========================== */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
      })

      /* =========================
         LOGIN
      ========================== */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.success = false;
      });
  },
});

export const { logout, resetState } = authSlice.actions;
export default authSlice.reducer;