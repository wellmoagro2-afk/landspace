"use client";

import { Card } from "@/components/ui/Card";
import { FileText } from "lucide-react";

interface DataRequirementsProps {
  requirements: string[];
}

export default function DataRequirements({ requirements }: DataRequirementsProps) {
  return (
    <Card className="p-6 mb-16" glass>
      <div className="flex items-center mb-4">
        <FileText className="w-5 h-5 text-indigo-400 mr-2" />
        <h3 className="text-xl font-bold text-white">Dados mínimos necessários do cliente</h3>
      </div>
      <ul className="space-y-2">
        {requirements.map((req, idx) => (
          <li key={idx} className="text-slate-300 flex items-start">
            <span className="text-indigo-400 mr-2 mt-1">▸</span>
            <span>{req}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
