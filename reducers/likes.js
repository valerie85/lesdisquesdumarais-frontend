import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [null],
};

export const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    addLike:(state,action)=> {
      console.log('action payload add', action.payload);
        state.value.push(action.payload);
    },
    removeLike:(state,action)=> {
      console.log('action payload remove',action.payload);
        state.value=state.value.filter(item=>item !== action.payload)
    },
  },
});

export const { addLike, removeLike } = likesSlice.actions;
export default likesSlice.reducer;
