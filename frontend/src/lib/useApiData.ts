import { useEffect, useState } from "react";
import { api } from "./api";

/**
 * Fetches `path` from the API and returns it, falling back to `fallback`
 * while loading, on error, or when the API returns an empty list.
 * This keeps the public site working even when the backend is offline.
 */
export function useApiData<T>(path: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    let active = true;
    api
      .get<T>(path)
      .then((d) => {
        if (!active || d == null) return;
        if (Array.isArray(d) && d.length === 0) return; // keep fallback
        setData(d);
      })
      .catch(() => {
        /* backend offline → keep fallback */
      });
    return () => {
      active = false;
    };
  }, [path]);

  return data;
}
