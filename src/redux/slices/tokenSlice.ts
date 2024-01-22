import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    fetchTokenRequest: (state, _coingeckoId) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTokenSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchTokenError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const selectTokenData = (state: RootState) => state.token.data;
export const selectTokenLoading = (state: RootState) => state.token.isLoading;
export const selectTokenError = (state: RootState) => state.token.error;

export const {fetchTokenRequest, fetchTokenSuccess, fetchTokenError} =
  tokenSlice.actions;

export default tokenSlice.reducer;
