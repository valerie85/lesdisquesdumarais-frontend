import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [null],
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
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
