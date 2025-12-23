import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groceryProducts: [],
  apartmentFood: [],
  selectedCategory: 'all',
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      const { type, products } = action.payload;
      if (type === 'grocery') {
        state.groceryProducts = products;
      } else if (type === 'apartment') {
        state.apartmentFood = products;
      }
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setSelectedCategory,
} = productSlice.actions;

export default productSlice.reducer;
