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
        console.log("Voici l'état du Panier:", state.value)
    },
    removeFromCart:(state,action)=> {
        state.value=state.value.filter(item=>item._id !== action.payload._id)
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
