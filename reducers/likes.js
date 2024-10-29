import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [null],
};

export const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    addLike:(state,action)=> {
        state.value.push(action.payload);
    },
    removeLike:(state,action)=> {
        state.value=state.value.filter(item=>item._id !== action.payload._id)
    },
  },
});

export const { addLike, removeLike } = likesSlice.actions;
export default likesSlice.reducer;