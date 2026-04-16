import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 0,
  },
  reducers: {
    incrementCounter: (state) => {
      state.counter++;
    },
    decrementCounter: (state) => {
      state.counter--;
    },
  },
});

export const counterSliceReducer = counterSlice.reducer;
export const { incrementCounter, decrementCounter } = counterSlice.actions;
