interface CalloutProps {
  type?: "insight" | "risk" | "signal" | "method";
  title?: string;
  children: React.ReactNode;
}

const calloutStyles = {
  insight: {
    bg: "bg-[rgba(0,0,0,0.02)]",
    border: "border-[rgba(0,0,0,0.12)]",
    borderLeft: "border-l-[#00B86B]",
    defaultTitle: "Insight",
  },
  risk: {
    bg: "bg-[rgba(0,0,0,0.02)]",
    border: "border-[rgba(0,0,0,0.12)]",
    borderLeft: "border-l-red-600",
    defaultTitle: "Risco",
  },
  signal: {
    bg: "bg-[rgba(0,0,0,0.02)]",
    border: "border-[rgba(0,0,0,0.12)]",
    borderLeft: "border-l-blue-600",
    defaultTitle: "Sinal",
  },
  method: {
    bg: "bg-[rgba(0,0,0,0.02)]",
    border: "border-[rgba(0,0,0,0.12)]",
    borderLeft: "border-l-purple-600",
    defaultTitle: "Método",
  },
};

export default function Callout({ type = "insight", title, children }: CalloutProps) {
  const style = calloutStyles[type];

  return (
    <div
      className={`${style.bg} ${style.border} ${style.borderLeft} border-l-4 p-5 my-8`}
    >
      <div className="flex-1 min-w-0">
        {(title || style.defaultTitle) && (
          <div className="font-sans font-semibold text-[#4B4B4B] mb-2 text-xs uppercase tracking-wide">
            {title || style.defaultTitle}
          </div>
        )}
        <div className="text-[#111111] leading-relaxed text-[0.95rem] font-serif">{children}</div>
      </div>
    </div>
  );
}
