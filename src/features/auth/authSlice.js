import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://forum-istad-api.cheat.casa/api/v1";

/* =========================
   Load From LocalStorage Safely
========================= */
let userFromStorage = null;
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined") {
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
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Register failed");
      return data;
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
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Login failed");

      const user = {
        id: data.userId,
        email: data.email,
        displayName: data.displayName,
      };
      const token = data.token;

      if (remember) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);
      }

      return { user, token };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* =========================
   SEND OTP, VERIFY OTP, RESET PASSWORD
========================= */
export const sendOtp = createAsyncThunk("auth/sendOtp", async (email, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) return rejectWithValue(data.message);
    return data.message;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const verifyOtp = createAsyncThunk("auth/verifyOtp", async ({ email, otp }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (!res.ok) return rejectWithValue(data.message);
    return "OTP Verified";
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const resetPasswordWithOtp = createAsyncThunk(
  "auth/resetPasswordWithOtp",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return "Password reset successful";
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* =========================
   Auth Slice
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

/* =========================
   POST THUNKS
========================= */
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/posts`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch posts");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const res = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to create post");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ថ្មី៖ ទាញយកសំណួរតាម ID
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/posts/${postId}`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch post");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ថ្មី៖ ទាញយកចម្លើយតាម parentId (សំណួរ)
export const fetchAnswersByQuestionId = createAsyncThunk(
  "posts/fetchAnswersByQuestionId",
  async (questionId, { rejectWithValue }) => {
    try {
      // ត្រងតាម parentId បើ API គាំទ្រ
      const res = await fetch(`${BASE_URL}/posts?parentId=${questionId}`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch answers");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* =========================
   Post Slice (ពង្រីក)
========================= */
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    currentPost: null,         // សម្រាប់ទុកសំណួរបច្ចុប្បន្ន
    answers: [],                // សម្រាប់ទុកបញ្ជីចម្លើយ
    loading: false,
    error: null,
    answersLoading: false,
    answersError: null,
    createLoading: false,
    createError: null,
    createSuccess: false,
  },
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.error = null;
    },
    resetCreateState: (state) => {
      state.createLoading = false;
      state.createError = null;
      state.createSuccess = false;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    clearAnswers: (state) => {
      state.answers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch posts";
      })

      // Fetch Post By ID
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentPost = null; // សម្អាតទិន្នន័យចាស់
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch post";
      })

      // Fetch Answers By Question ID
      .addCase(fetchAnswersByQuestionId.pending, (state) => {
        state.answersLoading = true;
        state.answersError = null;
      })
      .addCase(fetchAnswersByQuestionId.fulfilled, (state, action) => {
        state.answersLoading = false;
        state.answers = action.payload;
      })
      .addCase(fetchAnswersByQuestionId.rejected, (state, action) => {
        state.answersLoading = false;
        state.answersError = action.payload || "Failed to fetch answers";
      })

      // Create Post (Question or Answer)
      .addCase(createPost.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;
        // បន្ថែមទៅបញ្ជីសំណួរ (បើជាសំណួរថ្មី)
        if (!action.payload.parentId) {
          state.posts.unshift(action.payload);
        } else {
          // បើជាចម្លើយ បន្ថែមទៅ answers ដែរ
          state.answers.unshift(action.payload);
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload || "Failed to create post";
      });
  },
});

/* =========================
   Exports
========================= */
export const { logout, resetState } = authSlice.actions;
export const { clearPosts, resetCreateState, clearCurrentPost, clearAnswers } = postSlice.actions;
export const postsReducer = postSlice.reducer;
export default authSlice.reducer;