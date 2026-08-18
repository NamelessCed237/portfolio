import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { ContentContext } from "./context";
import type { Locale, LocalizedText } from "./types";

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used inside <ContentProvider>");
  return context;
};

/** Picks the right language out of a LocalizedText, falling back to the other. */
export const useLocalized = () => {
  const { i18n } = useTranslation();
  const locale: Locale = i18n.language?.startsWith("fr") ? "fr" : "en";
  const other: Locale = locale === "fr" ? "en" : "fr";

  return useCallback(
    (value?: LocalizedText) => value?.[locale] || value?.[other] || "",
    [locale, other],
  );
};
