"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Buscar...",
}: SearchInputProps) {
  return (
    <div className="relative max-w-md mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(255,255,255,0.46)]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-[#070B14]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-xl text-[rgba(255,255,255,0.92)] placeholder-[rgba(255,255,255,0.46)] focus:outline-none focus:border-[#00B86B]/50 focus:ring-2 focus:ring-[#00B86B]/20 transition-all duration-300"
      />
    </div>
  );
}
