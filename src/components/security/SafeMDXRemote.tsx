/**
 * SafeMDXRemote - Wrapper seguro para MDXRemote
 * 
 * Server Component que valida conteúdo MDX antes de renderizar
 * Aplica hardening contra XSS, JSX arbitrário e ESM
 */

import type React from "react";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { assertSafeMdx } from '@/lib/mdx-security';

// Tipo para componentes MDX (baseado no padrão MDX)
// Permite componentes React com props genéricas ou específicas
// Compatível com next-mdx-remote
type MDXComponents = {
  [key: string]: React.ElementType | React.ReactElement | null | undefined;
};

interface SafeMDXRemoteProps {
  source: string;
  components?: MDXComponents;
}

/**
 * Wrapper seguro para MDXRemote
 * Valida conteúdo MDX antes de renderizar
 */
export default function SafeMDXRemote({ source, components }: SafeMDXRemoteProps) {
  // Validar conteúdo MDX (fail-fast)
  assertSafeMdx(source);

  // Renderizar com MDXRemote (já validado)
  // Cast necessário porque MDXRemote espera tipos mais específicos, mas nossos componentes customizados têm props específicas
  return <MDXRemote source={source} components={components as Parameters<typeof MDXRemote>[0]['components']} />;
}
