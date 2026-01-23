"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Package {
  level: 'essential' | 'professional' | 'premium';
  title: string;
  deliverables: string[];
  deadline: string;
  revisions: string;
}

interface PackageCardsProps {
  packages: Package[];
}

export default function PackageCards({ packages }: PackageCardsProps) {
  const packageConfig = {
    essential: {
      label: 'Essencial',
      color: 'bg-slate-700/50',
      borderColor: 'border-slate-600',
      textColor: 'text-slate-300',
    },
    professional: {
      label: 'Profissional',
      color: 'bg-indigo-600/30',
      borderColor: 'border-indigo-500',
      textColor: 'text-indigo-300',
    },
    premium: {
      label: 'Premium',
      color: 'bg-indigo-800/40',
      borderColor: 'border-indigo-400',
      textColor: 'text-indigo-200',
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {packages.map((pkg) => {
        const config = packageConfig[pkg.level];
        return (
          <Card key={pkg.level} className={`p-6 ${config.color} ${config.borderColor} border-2`} glass hover>
            <div className="mb-4">
              <Badge className={`${config.color} ${config.textColor} border-0 mb-2`}>
                {config.label}
              </Badge>
              <h3 className="text-xl font-bold text-white mb-3">{pkg.title}</h3>
            </div>
            <ul className="space-y-2 mb-4">
              {pkg.deliverables.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-slate-400 mb-1">
                <span className="font-semibold">Prazo:</span> {pkg.deadline}
              </p>
              <p className="text-xs text-slate-400">
                <span className="font-semibold">Revisões:</span> {pkg.revisions}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
