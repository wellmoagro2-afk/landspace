import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Hero from "@/components/home/Hero";
import MarketPulseWordCloud from "@/components/home/MarketPulseWordCloud";
import Ecosystem from "@/components/home/Ecosystem";
import MVVCompact from "@/components/home/MVVCompact";
import FinalCTA from "@/components/home/FinalCTA";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-cyan-lg"></div>

      <Header variant="global" minimal={true} />

      <main className="relative z-10">
        <Hero />
        <MarketPulseWordCloud />
        <Ecosystem />
        <MVVCompact />
        <FinalCTA />
      </main>

      <Footer variant="global" hideCTA={true} />
      <WhatsAppButton />
    </div>
  );
}
