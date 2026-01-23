"use client";

import { Card } from "@/components/ui/Card";
import { CheckCircle2 } from "lucide-react";

interface DeliverablesListProps {
  deliverables: string[];
}

export default function DeliverablesList({ deliverables }: DeliverablesListProps) {
  return (
    <Card className="p-6 mb-16" glass>
      <h3 className="text-xl font-bold text-white mb-4">Entregáveis</h3>
      <ul className="space-y-3">
        {deliverables.map((item, idx) => (
          <li key={idx} className="flex items-start text-slate-300">
            <CheckCircle2 className="w-5 h-5 text-indigo-400 mr-3 mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
