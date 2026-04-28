import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./slices/user-slice";
import { breadcrumbLabelsReducer } from "./slices/breadcrumb-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSliceReducer,
      breadcrumbLabels: breadcrumbLabelsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
