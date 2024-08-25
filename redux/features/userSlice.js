import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: ""
};

export const fetchUsers = createAsyncThunk("user.fetchUsers", async (phone) => {
  const response = await axios
    .get(`https://ehostingguru.com/stage/tanmoy-vyapar/fetch_users_by_phone?mobile=${phone}`);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("USERS_REQUEST", (state) => {
      state.loading = true;
    });

    builder.addCase("USERS_SUCCESS", (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });

    builder.addCase("USERS_FAILURE", (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  }
});

export default userSlice.reducer;
