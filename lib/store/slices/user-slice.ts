import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
}

interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.data = action.payload;
      state.error = null;
    },

    clearUser(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
