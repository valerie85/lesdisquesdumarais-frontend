import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    addLike:(state,action)=> {
        state.value.push(action.payload);
    },
    removeLike:(state,action)=> {
        state.value=state.value.filter(item=>item !== action.payload)
    },
    removeAllLikes: (state)=>{
      state.value=[];
    }
  },
});

export const { addLike, removeLike, removeAllLikes } = likesSlice.actions;
export default likesSlice.reducer;
