import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Operator, OperatorAddon } from '../../types';
import axios from 'axios';
import { baseUrl } from '../../api/apiConfig';

interface OperatorState {
  operators: Operator[];
  operatorAddons: OperatorAddon[];
  loading: boolean;
  error: string | null;
}

export const fetchOperators = createAsyncThunk(
  'operators/fetchOperators',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Operator[]>(`${baseUrl}/operator`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('An unexpected error occurred while fetching operators');
    }
  }
);

export const fetchOperatorAddons = createAsyncThunk(
  'operators/fetchOperatorAddons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<OperatorAddon[]>(`${baseUrl}/operatorAddon`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('An unexpected error occurred while fetching operator addons');
    }
  }
);

const initialState: OperatorState = {
  operators: [],
  operatorAddons: [],
  loading: false,
  error: null,
};

const operatorSlice = createSlice({
  name: 'operators',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperators.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOperators.fulfilled, (state, action: PayloadAction<Operator[]>) => {
        state.loading = false;
        state.operators = action.payload;
      })
      .addCase(fetchOperators.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch operators';
      })
      .addCase(fetchOperatorAddons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOperatorAddons.fulfilled, (state, action: PayloadAction<OperatorAddon[]>) => {
        state.loading = false;
        state.operatorAddons = action.payload;
      })
      .addCase(fetchOperatorAddons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch operator addons';
      });
  },
});

export default operatorSlice.reducer;
