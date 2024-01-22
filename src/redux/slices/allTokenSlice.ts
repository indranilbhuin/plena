import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

const allTokenSlice = createSlice({
  name: 'allToken',
  initialState,
  reducers: {
    fetchAllTokenRequest: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchAllTokenSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchAllTokenError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const selectAllTokenData = (state: RootState) =>
  state.allToken.data;
export const selectAllTokenLoading = (state: RootState) =>
  state.allToken.isLoading;
export const selectAllTokenError = (state: RootState) =>
  state.allToken.error;

export const {
  fetchAllTokenRequest,
  fetchAllTokenSuccess,
  fetchAllTokenError,
} = allTokenSlice.actions;

export default allTokenSlice.reducer;
