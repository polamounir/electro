import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../../api/axiosInstance";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { getUserData } from "../../../api/user";

// Well-defined types
interface UserTypes {
  fullName: string;
  id: string;
  email: string;
  userType: string;
  phoneNumber: string;
}

interface LoginUserResponse {
  email: string;
  accessToken: string;
}

interface RegisterUserResponse {
  userName: string;
  userId: string;
  name?: string;
}

interface AuthState {
  user: UserTypes | null;
  loading: boolean;
  error: string | string[] | null;
  isAuthenticated: boolean;
}

interface RegisterUserPayload {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

// Centralized token management
const TOKEN_KEY = "accessToken";
const EMAIL_KEY = "email";
const USER_ID_KEY = "userId";
const USER_NAME_KEY = "userName";
const FULL_NAME_KEY = "fullName";

// Helper functions for token management
const saveAuthData = (token: string, email: string): void => {
  Cookies.set(TOKEN_KEY, token);
  Cookies.set(EMAIL_KEY, email);
};

const saveUserData = (
  userId: string,
  userName: string,
  fullName: string
): void => {
  localStorage.setItem(USER_ID_KEY, userId);
  localStorage.setItem(USER_NAME_KEY, userName);
  localStorage.setItem(FULL_NAME_KEY, fullName);
};

const clearAuthData = (): void => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(EMAIL_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_NAME_KEY);
  localStorage.removeItem(FULL_NAME_KEY);
};

// Check if user is already authenticated
const hasValidToken = (): boolean => {
  return !!Cookies.get(TOKEN_KEY);
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: hasValidToken(),
};

// Login thunk
export const loginUser = createAsyncThunk<
  LoginUserResponse,
  { username: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async ({ username, password }, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/login", {
      username,
      password,
    });

    const { accessToken, email } = data.data;
    saveAuthData(accessToken, email);
    const userData = await Promise.resolve(getUserData());
    if (!userData) {
      throw new Error("Invalid or missing token");
    }

    // Return both login response and user data
    return {
      email,
      accessToken,
      userData: {
        fullName: userData.fullName || "",
        id: userData.nameid || "",
        email: userData.email || "",
        userType: userData.UserType || "",
        phoneNumber: userData.phoneNumber || "",
      },
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ detail?: string }>;
    const errorMessage =
      axiosError.response?.data?.detail ||
      "Invalid credentials or server error";

    return rejectWithValue(errorMessage);
  }
});

// Fetch user thunk
export const fetchUser = createAsyncThunk<
  UserTypes,
  void,
  { rejectValue: string }
>("auth/fetchUser", async (_, { rejectWithValue }) => {
  try {
    if (!hasValidToken()) {
      return rejectWithValue("No authentication token found");
    }
    const user = await Promise.resolve(getUserData());
    if (!user) {
      throw new Error("Invalid or missing token");
    }

    return {
      fullName: user.fullName || "",
      id: user.nameid || "",
      email: user.email || "",
      userType: user.UserType || "",
      phoneNumber: user.phoneNumber || "",
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return rejectWithValue("Failed to fetch user data");
  }
});

// Register user thunk
export const registerUser = createAsyncThunk<
  RegisterUserResponse,
  RegisterUserPayload,
  { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post<RegisterUserResponse>(
      "/auth/register",
      userData
    );

    const { userId, userName } = response.data;
    saveUserData(userId, userName, userData.fullName);

    return { userId, userName, name: userData.fullName };
  } catch (error) {
    // Improved error handling
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{
        errors?: string[];
        detail?: string;
      }>;

      const errorData = axiosError.response?.data;
      const errorMessage =
        errorData?.errors?.join(" * ") ||
        errorData?.detail ||
        "Registration failed";
      return rejectWithValue(errorMessage);
    }

    return rejectWithValue("An unexpected error occurred during registration");
  }
});

// Logout user thunk
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  clearAuthData();
        localStorage.removeItem("cartInitID");
        localStorage.removeItem("cart");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;

    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<LoginUserResponse & { userData?: UserTypes }>
        ) => {
          state.loading = false;
          state.isAuthenticated = true;
          // console.log("action.payload", action.payload);
          state.user = action.payload.userData || {
            id: "",
            fullName: "",
            email: action.payload.email,
            userType: "",
            phoneNumber: "",
          };
          state.error = null;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || "Authentication failed";
      })

      // Fetch user cases
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserTypes>) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
          state.error = null;
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || "Failed to fetch user data";
      })

      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // Logout case
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearErrors } = authSlice.actions;
export default authSlice.reducer;
