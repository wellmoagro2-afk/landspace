"use client";

import { useState } from "react";

interface HideOnErrorProps {
  children: (opts: { hidden: boolean; onError: () => void }) => React.ReactNode;
}

export function HideOnError({ children }: HideOnErrorProps) {
  const [hidden, setHidden] = useState(false);

  return <>{children({ hidden, onError: () => setHidden(true) })}</>;
}
