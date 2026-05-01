import { useEffect } from "react";
import { useSelector } from "react-redux";
import { UUID_REGEX } from "../utils/uuid-checker";
import { resolveBreadcrumbLabel } from "../store/thunks/resolve-breadcrumb-label";
import { selectBreadcrumbLabels } from "../store/slices/breadcrumb-slice";
import { useAppDispatch } from "../store/hooks";

export function useResolveBreadcrumbLabels(segments: string[]) {
  const dispatch = useAppDispatch();
  const cachedLabels = useSelector(selectBreadcrumbLabels);

  useEffect(() => {
    segments
      .filter((seg) => UUID_REGEX.test(seg))
      .forEach((id) => dispatch(resolveBreadcrumbLabel(id)));
  }, [dispatch, segments]);

  return cachedLabels;
}
