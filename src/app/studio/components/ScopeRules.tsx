"use client";

import { Card } from "@/components/ui/Card";
import { AlertCircle } from "lucide-react";

interface ScopeRulesProps {
  rules: string[];
}

export default function ScopeRules({ rules }: ScopeRulesProps) {
  return (
    <Card className="p-6 mb-16" glass>
      <div className="flex items-center mb-4">
        <AlertCircle className="w-5 h-5 text-amber-400 mr-2" />
        <h3 className="text-xl font-bold text-white">Regras de revisão/escopo</h3>
      </div>
      <ul className="space-y-2">
        {rules.map((rule, idx) => (
          <li key={idx} className="text-slate-300 flex items-start">
            <span className="text-amber-400 mr-2 mt-1">▸</span>
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
