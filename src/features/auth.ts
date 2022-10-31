import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IUser, IUserState } from "./interfaces";

const initialState: IUserState = {
  user: null,
  isAuthenticated: false,
  sessionId: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem("session_id");
    },
  },
});

// Export Actions
export const { setUser } = authSlice.actions;

// Export Reducers
export default authSlice.reducer;

// Export Selectors
export const userSelector = (state: RootState) => state.user;
