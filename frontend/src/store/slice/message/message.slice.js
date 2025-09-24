import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk.js";

const initialState = {
  messages: [],
  buttonLoading: false,
  screenLoading: false,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, action.payload];
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    // ---- SEND MESSAGE ----
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        const oldMessages = state.messages ?? [];
        state.messages = [...oldMessages, action.payload?.responseData];
        state.buttonLoading = false;
      })
      .addCase(sendMessageThunk.rejected, (state) => {
        state.buttonLoading = false;
      });

    // ---- GET MESSAGES ----
    builder
      .addCase(getMessageThunk.pending, (state) => {
        state.screenLoading = true;
      })
      .addCase(getMessageThunk.fulfilled, (state, action) => {
        // ✅ backend now returns array of messages
        state.messages = action.payload?.responseData ?? [];
        state.screenLoading = false;
      })
      .addCase(getMessageThunk.rejected, (state) => {
        state.screenLoading = false;
      });
  },
});

export const { setNewMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
