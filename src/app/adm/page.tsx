"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/studio/admin/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center">
      <div className="text-center">
        <p className="text-indigo-400">Redirecionando para o painel administrativo...</p>
      </div>
    </div>
  );
}
