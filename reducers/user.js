import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, firstName: null, likes:[]},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
    },
    addLike:(state,action)=> {
        state.value.likes.push(action.payload);
    },
    removeLike:(state,action)=> {
        state.value.likes=state.value.likes.filter(item=>item.release_id !== action.payload.release_id)
    },
  },
});

export const { login, logout, addLike, removeLike } = userSlice.actions;
export default userSlice.reducer;
