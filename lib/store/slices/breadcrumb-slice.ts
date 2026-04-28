// store/slices/breadcrumb-labels.slice.ts
import { createSlice } from "@reduxjs/toolkit";
import { resolveBreadcrumbLabel } from "../thunks/resolve-breadcrumb-label";
import { RootState } from "../store";

const breadcrumbLabelsSlice = createSlice({
  name: "breadcrumbLabels",
  initialState: { labels: {} as Record<string, string> },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resolveBreadcrumbLabel.fulfilled, (state, action) => {
      state.labels[action.payload.id] = action.payload.label;
    });
  },
});

export const selectBreadcrumbLabels = (state: RootState) =>
  state.breadcrumbLabels.labels;

export const breadcrumbLabelsReducer = breadcrumbLabelsSlice.reducer;
