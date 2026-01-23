"use client";

import { useEffect, useState } from "react";

interface PrintFooterProps {
  url: string;
  date: string;
}

export default function PrintFooter({ url, date }: PrintFooterProps) {
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <div className="editorial-print-footer no-print">
      <div className="max-w-[1200px] mx-auto px-6 py-4 text-center">
        <p className="text-xs font-sans text-[#6A6A6A]">
          {currentUrl} • {date}
        </p>
      </div>
    </div>
  );
}
