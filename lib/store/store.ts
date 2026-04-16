import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./slices/user-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSliceReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
