import { useState, type ReactNode } from "react";

export const useAlert = () => {
  const [message, setMessage] = useState<ReactNode | null>(null);
  const onOpen = (message: ReactNode) => {
    setMessage(message);
  };
  const onClose = () => {
    setMessage(null);
  };
  return { open: message !== null, message, onOpen, onClose };
};
