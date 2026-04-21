import { useEffect, useState } from "react";
import { breadcrumbResolvers } from "../utils/breadcrumbs-resolver";
import { UUID_REGEX } from "../utils/uuid-checker";

export function useResolveBreadcrumbLabels(segments: string[]) {
  const [resolvedLabels, setResolvedLabels] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      const entries = await Promise.all(
        segments.map(async (seg) => {
          if (UUID_REGEX.test(seg)) {
            const name = await breadcrumbResolvers.projects(seg);
            return [seg, name ?? seg] as const;
          }
          // If there's a direct resolver for this segment key, use it
          if (breadcrumbResolvers[seg]) {
            const name = await breadcrumbResolvers[seg](seg);
            return [seg, name ?? seg] as const;
          }
          return null;
        })
      );

      if (!cancelled) {
        const labels: Record<string, string> = {};
        for (const entry of entries) {
          if (entry) labels[entry[0]] = entry[1];
        }
        setResolvedLabels(labels);
      }
    }

    resolve();
    return () => {
      cancelled = true;
    };
  }, [segments.join(",")]);

  return resolvedLabels;
}
