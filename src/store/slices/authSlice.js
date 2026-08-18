
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "https://dummyjson.com/auth";

const getLocalUsers = () => JSON.parse(localStorage.getItem("localUsers") || "[]");
const findLocalUser = (username, password) =>
  getLocalUsers().find((u) => u.username === username && u.password === password);

export const loginUser = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (res.ok) return data;

    const local = findLocalUser(credentials.username, credentials.password);
    if (local) {
      return {
        id: "local-" + local.username,
        username: local.username,
        email: local.email,
        firstName: local.firstName,
        lastName: local.lastName,
        image: null,
        token: "local-token",
      };
    }
    return rejectWithValue(data.message || "Invalid username or password");
  } catch {
    const local = findLocalUser(credentials.username, credentials.password);
    if (local) {
      return {
        id: "local-" + local.username,
        username: local.username,
        email: local.email,
        firstName: local.firstName,
        lastName: local.lastName,
        image: null,
        token: "local-token",
      };
    }
    return rejectWithValue("Network error — connection check karein");
  }
});


export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    let apiUser = null;

  
    const tokenRes = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "emilys", password: "emilyspass" }),
    });
    const tokenData = await tokenRes.json();

    if (tokenRes.ok) {
     
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(userData),
      });
      if (res.ok) apiUser = await res.json();
    }

  
    const localUsers = getLocalUsers();
    localUsers.push(userData);
    localStorage.setItem("localUsers", JSON.stringify(localUsers));

    return (
      apiUser || {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: null,
      }
    );
  } catch {
    return rejectWithValue("Network error — connection check karein");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("authUser")) || null,
    token: localStorage.getItem("authToken") || null,
    loading: false,
    error: null,
    modalOpen: false,
    modalMode: "login",
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");
    },
    clearError(state) {
      state.error = null;
    },
    openAuthModal(state, action) {
      state.modalOpen = true;
      state.modalMode = action.payload || "login";
    },
    closeAuthModal(state) {
      state.modalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          image: action.payload.image,
        };
        state.token = action.payload.token;
        localStorage.setItem("authUser", JSON.stringify(state.user));
        localStorage.setItem("authToken", action.payload.token);
        state.modalOpen = false;
      })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
       
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          image: action.payload.image || null,
        };
        state.token = "local-account";
        localStorage.setItem("authUser", JSON.stringify(state.user));
        localStorage.setItem("authToken", state.token);
        state.modalOpen = false;
      })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { logout, clearError, openAuthModal, closeAuthModal } = authSlice.actions;
export default authSlice.reducer;