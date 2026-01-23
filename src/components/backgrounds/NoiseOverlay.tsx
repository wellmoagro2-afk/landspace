/**
 * Noise Overlay Component
 * CSP-compliant: usa classe CSS ao invés de inline style
 */
export function NoiseOverlay({ className = "" }: { className?: string }) {
  return <div className={`absolute inset-0 opacity-[0.015] pointer-events-none noise-overlay ${className}`}></div>;
}
