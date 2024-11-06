import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { keyword: "" },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    basicSearch: (state, action) => {
        state.value.keyword = action.payload.keyword;
        console.log("reducer search",state.value.keyword);
    },
  },
});

export const { basicSearch } = searchSlice.actions;
export default searchSlice.reducer;