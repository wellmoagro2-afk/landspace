export default function Divider() {
  return (
    <div className="my-8 flex items-center gap-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent"></div>
      <div className="w-2 h-2 rounded-full bg-[#00B86B]/30"></div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent"></div>
    </div>
  );
}
