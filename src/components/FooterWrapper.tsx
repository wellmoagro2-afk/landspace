"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

interface FooterWrapperProps {
  variant: 'global' | 'tech' | 'strategy' | 'academy';
}

export default function FooterWrapper({ variant }: FooterWrapperProps) {
  const pathname = usePathname();
  const hideCTA = pathname === '/academy/cursos';
  
  return <Footer variant={variant} hideCTA={hideCTA} />;
}
