"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  durationMs: number;
  createdAt: number;
}

const MAX_TOASTS = 4;
const VALID_TYPES: ToastType[] = ["success", "error", "info"];

function makeId(): string {
  if (typeof globalThis !== "undefined" && globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isValidType(t: unknown): t is ToastType {
  return typeof t === "string" && VALID_TYPES.includes(t as ToastType);
}

export default function ToastViewport() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timeoutsRef = useRef<Map<string, number>>(new Map());

  const removeToast = useCallback((id: string) => {
    const handle = timeoutsRef.current.get(id);
    if (handle != null) {
      clearTimeout(handle);
      timeoutsRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{
        type?: unknown;
        message?: unknown;
        description?: unknown;
        durationMs?: unknown;
      }>;
      const detail = customEvent.detail;
      if (!detail || typeof detail !== "object") return;

      const type = detail.type;
      const message = detail.message;
      if (!isValidType(type)) return;
      if (typeof message !== "string" || message.trim() === "") return;

      const id = makeId();
      const durationMs =
        typeof detail.durationMs === "number" && detail.durationMs >= 0
          ? detail.durationMs
          : type === "success"
            ? 3000
            : type === "error"
              ? 4000
              : 2500;

      const description =
        detail.description != null && typeof detail.description === "string"
          ? detail.description
          : undefined;

      const toast: ToastItem = {
        id,
        type,
        message: message.trim(),
        description,
        durationMs,
        createdAt: Date.now(),
      };

      setToasts((prev) => {
        const next = [...prev, toast].slice(-MAX_TOASTS);
        return next;
      });

      if (durationMs > 0) {
        const handle = window.setTimeout(() => {
          timeoutsRef.current.delete(id);
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, durationMs);
        timeoutsRef.current.set(id, handle);
      }
    };

    window.addEventListener("ls:toast", handler);
    return () => {
      window.removeEventListener("ls:toast", handler);
      timeoutsRef.current.forEach((handle) => clearTimeout(handle));
      timeoutsRef.current.clear();
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-full max-w-sm pointer-events-none"
      aria-live="polite"
      role="status"
    >
      {toasts.map((toast) => (
        <ToastItemView key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItemView({ toast, onClose }: { toast: ToastItem; onClose: () => void }) {
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    const t = requestAnimationFrame(() => setEntering(false));
    return () => cancelAnimationFrame(t);
  }, []);

  const typeStyles = {
    success: "border-l-4 border-l-green-500 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 shadow-lg",
    error: "border-l-4 border-l-red-500 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 shadow-lg",
    info: "border-l-4 border-l-cyan-400 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 shadow-lg",
  };

  const iconStyles = {
    success: "text-green-400",
    error: "text-red-400",
    info: "text-cyan-400",
  };

  return (
    <div
      className={`rounded-xl p-4 transition-all duration-300 ease-out pointer-events-auto ${
        entering ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
      } ${typeStyles[toast.type]}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 mt-0.5 ${iconStyles[toast.type]}`}>
          {toast.type === "success" && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {toast.type === "error" && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {toast.type === "info" && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">{toast.message}</p>
          {toast.description && (
            <p className="text-xs text-slate-400 mt-1">{toast.description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          aria-label="Fechar notificação"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
