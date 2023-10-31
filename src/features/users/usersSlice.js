import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../apis/apiInstance";
import apiInstanceNotLoading from "../../apis/apiInstanceNotLoading";
import { STORE_USERS_TYPE } from "../../utils/globalConstantUtil";

export const getUsersContent = createAsyncThunk(
  STORE_USERS_TYPE.GET_USERS_DATA,
  async ({ page, item_per_page, search }) => {
    const response = await apiInstanceNotLoading.get(
      `users?page=${page}&item_per_page=${item_per_page}&search=${search}`
    );
    return response.data;
  }
);

export const createNewUser = createAsyncThunk(
  STORE_USERS_TYPE.CREATE_USER,
  async (requestBody) => {
    const response = await apiInstance.post("users", requestBody);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  STORE_USERS_TYPE.DELETE_USER,
  async (id) => {
    const response = await apiInstance.delete(`users/${id}`);
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    contents: {},
    pages: {},
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
      state.isLoading = true;
    },
    [getUsersContent.fulfilled]: (state, action) => {
      const { data, ...pages } = action.payload;
      state.contents[STORE_USERS_TYPE.GET_USERS_DATA] = data;
      state.pages = pages;
      state.isLoading = false;
    },
    [getUsersContent.rejected]: (state) => {
      state.isLoading = false;
    },

    [createNewUser.pending]: (state) => {
      state.isLoading = true;
    },
    [createNewUser.fulfilled]: (state, action) => {
      state.contents[STORE_USERS_TYPE.GET_USERS_DATA] = [
        action.payload,
        ...state.contents[STORE_USERS_TYPE.GET_USERS_DATA],
      ];
      state.contents[STORE_USERS_TYPE.CREATE_USER] = action.payload;
      state.isLoading = false;
    },
    [createNewUser.rejected]: (state) => {
      state.isLoading = false;
    },

    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      const index = state.contents[STORE_USERS_TYPE.GET_USERS_DATA].findIndex(
        (user) => {
          return Number(user.id) === Number(action.payload.id);
        }
      );
      let tempContent = state.contents[STORE_USERS_TYPE.GET_USERS_DATA];
      tempContent.splice(index, 1);
      state.contents[STORE_USERS_TYPE.GET_USERS_DATA] = tempContent;
    },
    [deleteUser.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewUser, deleteUserStore } = usersSlice.actions;

export default usersSlice.reducer;
