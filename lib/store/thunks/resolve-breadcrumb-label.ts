import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const resolveBreadcrumbLabel = createAsyncThunk(
  "breadcrumbLabels/resolve",
  async (id: string) => {
    const res = await fetch(`/api/project-detail?id=${id}`);
    const { data } = await res.json();
    return { id, label: data?.[0]?.name ?? id };
  },
  {
    // ✅ This is the key — skip the dispatch entirely if already cached
    condition: (id, { getState }) => {
      const labels = (getState() as RootState).breadcrumbLabels.labels;
      return !labels[id]; // only fetch if not cached
    },
  }
);
