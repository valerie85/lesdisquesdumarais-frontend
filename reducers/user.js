import { createSlice } from '@reduxjs/toolkit';

const initialState = {
<<<<<<< HEAD
  value: { token: null, firstName: null, likes:[]},
=======
  value: { token: null, email: null},
>>>>>>> main
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
      state.value.email = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
