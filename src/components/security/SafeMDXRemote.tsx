/**
 * SafeMDXRemote - Wrapper seguro para MDXRemote
 * 
 * Server Component que valida conteúdo MDX antes de renderizar
 * Aplica hardening contra XSS, JSX arbitrário e ESM
 */

import { MDXRemote } from 'next-mdx-remote/rsc';
import { assertSafeMdx } from '@/lib/mdx-security';

interface SafeMDXRemoteProps {
  source: string;
  components?: any;
}

/**
 * Wrapper seguro para MDXRemote
 * Valida conteúdo MDX antes de renderizar
 */
export default function SafeMDXRemote({ source, components }: SafeMDXRemoteProps) {
  // Validar conteúdo MDX (fail-fast)
  assertSafeMdx(source);

  // Renderizar com MDXRemote (já validado)
  return <MDXRemote source={source} components={components} />;
}
