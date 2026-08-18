import emailjs from "@emailjs/browser";

// Single source of truth for the EmailJS config (DRY).
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

/** True when the three EmailJS keys are provided via .env */
export const isEmailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

/** Send a contact form through EmailJS. Fields sent: name, email, message. */
export const sendContactEmail = (form: HTMLFormElement) => {
  if (!isEmailConfigured) {
    return Promise.reject(new Error("EmailJS is not configured"));
  }
  return emailjs.sendForm(SERVICE_ID!, TEMPLATE_ID!, form, { publicKey: PUBLIC_KEY! });
};
