/**
 * Calcula o tempo de leitura real baseado no conteúdo de texto
 * Remove markdown e conta palavras
 */

export function stripMarkdown(content: string): string {
  // Remove código em blocos
  content = content.replace(/```[\s\S]*?```/g, "");
  // Remove código inline
  content = content.replace(/`[^`]+`/g, "");
  // Remove links [text](url)
  content = content.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");
  // Remove imagens ![alt](url)
  content = content.replace(/!\[([^\]]*)\]\([^\)]+\)/g, "");
  // Remove headers (# ## ###)
  content = content.replace(/^#{1,6}\s+/gm, "");
  // Remove listas (- * +)
  content = content.replace(/^[\s]*[-*+]\s+/gm, "");
  // Remove listas numeradas
  content = content.replace(/^\d+\.\s+/gm, "");
  // Remove blockquotes
  content = content.replace(/^>\s+/gm, "");
  // Remove HTML tags
  content = content.replace(/<[^>]+>/g, "");
  // Remove markdown bold/italic
  content = content.replace(/\*\*([^*]+)\*\*/g, "$1");
  content = content.replace(/\*([^*]+)\*/g, "$1");
  content = content.replace(/__([^_]+)__/g, "$1");
  content = content.replace(/_([^_]+)_/g, "$1");
  // Remove linhas vazias múltiplas
  content = content.replace(/\n{3,}/g, "\n\n");
  // Remove espaços extras
  content = content.replace(/\s+/g, " ").trim();

  return content;
}

export function countWords(text: string): number {
  if (!text || text.trim().length === 0) return 0;
  // Remove pontuação e conta palavras
  const words = text
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 0);
  return words.length;
}

export function calculateReadingTime(contentMdx: string, wordsPerMinute: number = 220): number {
  const cleanText = stripMarkdown(contentMdx);
  const wordCount = countWords(cleanText);
  const minutes = Math.max(1, Math.round(wordCount / wordsPerMinute));
  return minutes;
}

export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return "1 min de leitura";
  }
  return `${minutes} min de leitura`;
}
