import { toast } from "sonner";

/**
 * Turns a failed write into something the author can act on: an expired
 * session, or whatever the database actually complained about.
 */
export const reportSaveError = (error: unknown) => {
  const detail = error instanceof Error ? error.message : "";

  if (detail === "unauthorized") {
    toast.error("Session expirée", { description: "Reconnectez-vous pour enregistrer." });
    return;
  }

  toast.error("Enregistrement impossible", {
    description: detail || "Le serveur n a pas accepté la modification.",
    duration: 8000,
  });
};
