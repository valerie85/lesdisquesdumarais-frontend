import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart:(state,action)=> {
        state.value.push(action.payload);
    },
    removeFromCart:(state,action)=> {
        state.value=state.value.filter(item=>item._id !== action.payload._id)
    },
    removeAllArticlesFromCart:(state)=> {
      state.value=[];
    }
  },
});

export const { addToCart, removeFromCart, removeAllArticlesFromCart } = cartSlice.actions;
export default cartSlice.reducer;
