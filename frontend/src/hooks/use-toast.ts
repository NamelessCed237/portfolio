"use client";

import * as React from "react";
import { toast as sonnerToast } from "sonner";

// --- Types preserved from shadcn (optional) ---
export type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type ToastActionElement = React.ReactNode;

// --------------------
//  toast() API wrapper
// --------------------

function toast(props: ToastProps) {
  const { title, description, action } = props;

  // Sonner supports rich content directly
  const id = sonnerToast(title ?? "", {
    description,
    action:
      action && typeof action === "object"
        ? action
        : undefined,
  });

  return {
    id,
    dismiss: () => sonnerToast.dismiss(id),
    update: (newProps: ToastProps) =>
      sonnerToast(
        newProps.title ?? title ?? "",
        {
          id,
          description: newProps.description ?? description,
          action:
            newProps.action && typeof newProps.action === "object"
              ? newProps.action
              : action,
        }
      ),
  };
}

// --------------------
//   useToast() hook
// --------------------

function useToast() {
  return {
    toast,
    dismiss: (id?: string) => sonnerToast.dismiss(id),
  };
}

export { useToast, toast };
