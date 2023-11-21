import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../apis/apiInstance";
import apiInstanceNotLoading from "../../apis/apiInstanceNotLoading";
import { STORE_USERS_TYPE } from "../../utils/globalConstantUtil";

export const getUsersContent = createAsyncThunk(
  STORE_USERS_TYPE.GET_USERS_DATA,
  async ({ page, item_per_page, search }, { rejectWithValue }) => {
    try {
      const response = await apiInstanceNotLoading.get(
        `users?page=${page}&item_per_page=${item_per_page}&search=${search}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createNewUser = createAsyncThunk(
  STORE_USERS_TYPE.CREATE_USER,
  async (requestBody, { rejectWithValue }) => {
    try {
      const response = await apiInstance.post("users", requestBody);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  STORE_USERS_TYPE.DELETE_USER,
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiInstance.delete(`users/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: {},
    contents: {},
    pages: {},
    errors: {},
  },
  reducers: {
    // addNewUser: (state, action) => {
    //   let { newLeadObj } = action.payload;
    //   state.users = [...state.users, newLeadObj];
    // },
    // deleteUserStore: (state, action) => {
    //   let { index } = action.payload;
    //   state.users.splice(index, 1);
    // },
  },

  extraReducers: {
    [getUsersContent.pending]: (state) => {
      state.isLoading[STORE_USERS_TYPE.GET_USERS_DATA] = true;
    },
    [getUsersContent.fulfilled]: (state, action) => {
      const { data, ...pages } = action.payload;
      state.contents[STORE_USERS_TYPE.GET_USERS_DATA] = data;
      state.pages = pages;
      state.errors[STORE_USERS_TYPE.GET_USERS_DATA] = "";
      state.isLoading[STORE_USERS_TYPE.GET_USERS_DATA] = false;
    },
    [getUsersContent.rejected]: (state, { payload }) => {
      state.errors[STORE_USERS_TYPE.GET_USERS_DATA] = payload.response.data;
      state.isLoading[STORE_USERS_TYPE.GET_USERS_DATA] = false;
    },

    [createNewUser.pending]: (state) => {
      state.isLoading[STORE_USERS_TYPE.CREATE_USER] = true;
    },
    [createNewUser.fulfilled]: (state, action) => {
      state.contents[STORE_USERS_TYPE.GET_USERS_DATA] = [
        action.payload,
        ...state.contents[STORE_USERS_TYPE.GET_USERS_DATA],
      ];
      state.errors[STORE_USERS_TYPE.CREATE_USER] = "";
      state.isLoading[STORE_USERS_TYPE.CREATE_USER] = false;
    },
    [createNewUser.rejected]: (state, { payload }) => {
      state.errors[STORE_USERS_TYPE.CREATE_USER] = payload.response.data;
      state.isLoading[STORE_USERS_TYPE.CREATE_USER] = false;
    },

    [deleteUser.pending]: (state) => {
      state.isLoading[STORE_USERS_TYPE.DELETE_USER] = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      const index = state.contents[STORE_USERS_TYPE.GET_USERS_DATA].findIndex(
        (user) => {
          return Number(user.id) === Number(action.payload.id);
        }
      );
      let tempContent = state.contents[STORE_USERS_TYPE.GET_USERS_DATA];
      tempContent.splice(index, 1);
      state.contents[STORE_USERS_TYPE.GET_USERS_DATA] = tempContent;
      state.errors[STORE_USERS_TYPE.DELETE_USER] = "";
      state.isLoading[STORE_USERS_TYPE.DELETE_USER] = false;
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.errors[STORE_USERS_TYPE.DELETE_USER] = payload.response.data;
      state.isLoading[STORE_USERS_TYPE.DELETE_USER] = false;
    },
  },
});

export const { addNewUser, deleteUserStore } = usersSlice.actions;

export default usersSlice.reducer;
