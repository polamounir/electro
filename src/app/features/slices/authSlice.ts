import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../../api/axiosInstance";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

interface User {
  id: string;
  name: string;
  email: string;
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
  user: User | null;
  loading: boolean;
  error: string | string[] | null;
}
interface RegisterUserPayload {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Login
export const loginUser = createAsyncThunk<
  LoginUserResponse,
  { username: string; password: string },
  { rejectValue: string | null }
>("auth/loginUser", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/login", {
      username,
      password,
    });

    const { accessToken, email } = response.data;

    Cookies.set("accessToken", accessToken, { expires: 7, secure: true });
    Cookies.set("email", email, { expires: 7, secure: true });

    console.log(response.data);

    // Make sure to return the correct structure
    return { email, accessToken };
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ detail?: string }>;

    return rejectWithValue(axiosError.response?.data?.detail || "Login failed");
  }
});

// Logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await api.post("/auth/logout");
});

export const fetchUser = createAsyncThunk<User, void, { rejectValue: null }>(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    // console.log("INIT");
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch {
      return rejectWithValue(null);
    }
  }
);

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
    console.log("REGISTER", response, response.data);
    const { userId, userName } = response.data;

    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
    localStorage.setItem("fullName", userData.fullName);
    return { userId, userName, name: userData.fullName };
  } catch (error: unknown) {
    if (error instanceof Error && "response" in error) {
      const axiosError = error as {
        response?: { data?: { errors?: string[]; detail?: string } };
      };

      console.log(axiosError.response);

      return rejectWithValue(
        axiosError.response?.data?.errors?.join(" * ") ||
          axiosError.response?.data?.detail ||
          "Registration failed"
      );
    }
    return rejectWithValue("Registration failed");
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginUserResponse>) => {
          state.loading = false;
          state.user = {
            id: "",
            name: "",
            email: action.payload.email,
          };
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An unknown error occurred";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
