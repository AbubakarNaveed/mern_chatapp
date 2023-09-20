import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  receiverId: "",
};

const messageReducer = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setReceiver: (state, { payload }) => {
      const { id } = payload;
      state.receiverId = id;
    },

    setMessages: (state, { payload }) => {
      const { thread } = payload;
      state.messages = thread;
    },
  },
});

export default messageReducer.reducer;

export const { setReceiver, setMessages } = messageReducer.actions;
