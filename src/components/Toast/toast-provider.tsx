import type { PropsWithChildren } from "react";
import { useCallback, useMemo, useState } from "react";

import { ToastContext, type ToastType } from "./context";
import { Toast } from "./toast";

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const showToast = useCallback((toast: Omit<ToastType, "id">) => {
    setToasts((prev) => {
      const existingIndex = prev.findIndex((item) => item.key === toast.key);
      if (existingIndex !== -1) {
        const updatedPrev = prev.map((item, index) => {
          if (index === existingIndex) {
            return { ...item, ...toast };
          }
          return item;
        });
        return updatedPrev;
      }

      const updatedPrev = prev.map((item) => ({
        ...item,
        id: item.id + 1,
      }));
      return [
        ...updatedPrev,
        {
          ...toast,
          id: 0,
          autodismiss: toast.autodismiss ?? true,
          position: toast.position ?? "bottom",
        },
      ];
    });
  }, []);

  const sortedToasts = useMemo(() => {
    return toasts.sort((a, b) => a.id - b.id);
  }, [toasts]);

  const onDismiss = useCallback((toastId: number) => {
    setToasts((prev) => {
      const updatedToasts = prev
        .filter((item) => item.id !== toastId)
        .map((item, index) => ({
          ...item,
          id: index,
        }));
      return updatedToasts;
    });
  }, []);

  const onExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const value = useMemo(() => {
    return {
      showToast,
    };
  }, [showToast]);

  return (
    <>
      <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
      {sortedToasts.map((toast, index) => {
        return (
          <Toast
            key={toast.key}
            toast={toast}
            index={index}
            onDismiss={onDismiss}
            onExpand={onExpand}
            isExpanded={isExpanded}
          />
        );
      })}
    </>
  );
};
