import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../apis/apiInstance";

export const getTransactionsContent = createAsyncThunk(
  "/transactions/content",
  async () => {
    const response = await apiInstance.get("users");
    return response.data;
  }
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    isLoading: false,
    transactions: [],
  },
  reducers: {
    addNewTransaction: (state, action) => {
      let { newTransactionObj } = action.payload.data;
      state.transactions = [...state.transactions, newTransactionObj];
    },

    deleteTransaction: (state, action) => {
      let { index } = action.payload;
      state.transactions.splice(index, 1);
    },
  },

  extraReducers: {
    [getTransactionsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getTransactionsContent.fulfilled]: (state, action) => {
      state.transactions = action.payload.data;
      state.isLoading = false;
    },
    [getTransactionsContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewTransaction, deleteTransaction } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
