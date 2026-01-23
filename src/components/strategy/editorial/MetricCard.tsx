interface MetricCardProps {
  value: string;
  label: string;
  trend?: "up" | "down" | "neutral";
}

export default function MetricCard({ value, label, trend = "neutral" }: MetricCardProps) {
  return (
    <div className="bg-[#070B14]/70 backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-xl p-6 my-6">
      <div className="text-4xl font-bold text-[#00B86B] mb-2">{value}</div>
      <div className="text-slate-300 font-medium">{label}</div>
    </div>
  );
}
