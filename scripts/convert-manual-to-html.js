const fs = require('fs');
const path = require('path');

// Ler o arquivo Markdown
const mdPath = path.join(__dirname, '..', 'MANUAL_EDICAO_BRIEFINGS.md');
const mdContent = fs.readFileSync(mdPath, 'utf-8');

// Função para converter Markdown para HTML (mais robusta)
function markdownToHtml(md) {
  let html = md;
  
  // Primeiro, processar code blocks (para não interferir com outros elementos)
  const codeBlocks = [];
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const id = `CODE_BLOCK_${codeBlocks.length}`;
    codeBlocks.push({ id, lang: lang || '', code: code.trim() });
    return id;
  });
  
  // Headers (ordem importante: H3 antes de H2, H2 antes de H1)
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 id="$1">$1</h2>'.replace(/id="([^"]+)"/g, (m, text) => {
    const id = text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    return `id="${id}"`;
  }));
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold e Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Inline code (depois de processar bold/italic)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
  
  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr>');
  
  // Listas ordenadas
  html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>');
  const olRegex = /(<li>.*?<\/li>)/gs;
  html = html.replace(olRegex, (match) => {
    if (match.includes('<li>') && !match.includes('<ul>')) {
      return match.replace(/(<li>.*?<\/li>)/gs, '<ol>$1</ol>');
    }
    return match;
  });
  
  // Listas não ordenadas
  const lines = html.split('\n');
  let inList = false;
  let listItems = [];
  let result = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^[-*] /) && !line.match(/^```/)) {
      if (!inList) {
        inList = true;
        listItems = [];
      }
      const content = line.replace(/^[-*] /, '').trim();
      listItems.push(`<li>${content}</li>`);
    } else {
      if (inList && listItems.length > 0) {
        result.push(`<ul>${listItems.join('\n')}</ul>`);
        listItems = [];
        inList = false;
      }
      result.push(line);
    }
  }
  if (inList && listItems.length > 0) {
    result.push(`<ul>${listItems.join('\n')}</ul>`);
  }
  html = result.join('\n');
  
  // Restaurar code blocks
  codeBlocks.forEach(({ id, lang, code }) => {
    const langClass = lang ? ` class="language-${lang}"` : '';
    html = html.replace(id, `<pre><code${langClass}>${escapeHtml(code)}</code></pre>`);
  });
  
  // Paragraphs (último passo, para não quebrar outros elementos)
  html = html.split('\n\n').map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<') || trimmed.match(/^#|^<[h|u|o|l|p|d]/)) return trimmed;
    if (trimmed.match(/^```/)) return trimmed;
    return `<p>${trimmed}</p>`;
  }).join('\n\n');
  
  // Limpar parágrafos vazios e múltiplos espaços
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/\n{3,}/g, '\n\n');
  
  return html;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Template HTML completo
const htmlTemplate = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manual Completo de Edição de Briefings - LandSpace Strategy Editorial</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            line-height: 1.8;
            color: #e2e8f0;
            background: #05070C;
            padding: 0;
            margin: 0;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        header {
            background: linear-gradient(135deg, #02040a 0%, #05070C 100%);
            border-bottom: 2px solid #10b981;
            padding: 3rem 2rem;
            margin-bottom: 3rem;
        }
        
        header h1 {
            color: #10b981;
            font-size: 2.5rem;
            margin-bottom: 1rem;
            text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
        }
        
        .meta {
            color: #4ade80;
            font-family: 'JetBrains Mono', 'Courier New', monospace;
            font-size: 0.9rem;
            margin-top: 1rem;
        }
        
        nav {
            background: rgba(16, 185, 129, 0.05);
            border: 1px solid rgba(16, 185, 129, 0.2);
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 3rem;
            position: sticky;
            top: 20px;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        nav h2 {
            color: #10b981;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid rgba(16, 185, 129, 0.3);
            padding-bottom: 0.5rem;
        }
        
        nav ul {
            list-style: none;
        }
        
        nav li {
            margin: 0.5rem 0;
        }
        
        nav a {
            color: #4ade80;
            text-decoration: none;
            transition: all 0.3s;
            display: block;
            padding: 0.5rem;
            border-radius: 6px;
        }
        
        nav a:hover {
            background: rgba(16, 185, 129, 0.1);
            color: #10b981;
            transform: translateX(5px);
        }
        
        main {
            background: rgba(5, 7, 12, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 3rem;
            backdrop-filter: blur(10px);
        }
        
        h1 {
            color: #10b981;
            font-size: 2.5rem;
            margin: 2rem 0 1rem;
            text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
        }
        
        h2 {
            color: #10b981;
            font-size: 2rem;
            margin: 3rem 0 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(16, 185, 129, 0.2);
        }
        
        h3 {
            color: #4ade80;
            font-size: 1.5rem;
            margin: 2rem 0 1rem;
        }
        
        h4 {
            color: #4ade80;
            font-size: 1.2rem;
            margin: 1.5rem 0 0.8rem;
        }
        
        p {
            margin: 1rem 0;
            color: #e2e8f0;
            line-height: 1.8;
        }
        
        ul, ol {
            margin: 1rem 0 1rem 2rem;
            color: #e2e8f0;
        }
        
        li {
            margin: 0.5rem 0;
            line-height: 1.8;
        }
        
        code {
            background: rgba(16, 185, 129, 0.1);
            color: #4ade80;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-family: 'JetBrains Mono', 'Courier New', monospace;
            font-size: 0.9em;
            border: 1px solid rgba(16, 185, 129, 0.2);
        }
        
        pre {
            background: #02040a;
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 8px;
            padding: 1.5rem;
            overflow-x: auto;
            margin: 1.5rem 0;
        }
        
        pre code {
            background: transparent;
            border: none;
            padding: 0;
            color: #4ade80;
            font-size: 0.9rem;
            line-height: 1.6;
        }
        
        a {
            color: #10b981;
            text-decoration: underline;
            text-decoration-color: rgba(16, 185, 129, 0.5);
            transition: all 0.3s;
        }
        
        a:hover {
            color: #4ade80;
            text-decoration-color: #4ade80;
        }
        
        hr {
            border: none;
            border-top: 2px solid rgba(16, 185, 129, 0.3);
            margin: 3rem 0;
        }
        
        .highlight-box {
            background: rgba(16, 185, 129, 0.05);
            border-left: 4px solid #10b981;
            padding: 1.5rem;
            margin: 2rem 0;
            border-radius: 6px;
        }
        
        .warning-box {
            background: rgba(251, 191, 36, 0.1);
            border-left: 4px solid #fbbf24;
            padding: 1.5rem;
            margin: 2rem 0;
            border-radius: 6px;
        }
        
        .info-box {
            background: rgba(59, 130, 246, 0.1);
            border-left: 4px solid #3b82f6;
            padding: 1.5rem;
            margin: 2rem 0;
            border-radius: 6px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 2rem 0;
        }
        
        th, td {
            border: 1px solid rgba(16, 185, 129, 0.3);
            padding: 1rem;
            text-align: left;
        }
        
        th {
            background: rgba(16, 185, 129, 0.1);
            color: #10b981;
            font-weight: 600;
        }
        
        td {
            color: #e2e8f0;
        }
        
        footer {
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 2px solid rgba(16, 185, 129, 0.3);
            text-align: center;
            color: #4ade80;
            font-family: 'JetBrains Mono', monospace;
        }
        
        @media print {
            body {
                background: white;
                color: black;
            }
            
            nav {
                display: none;
            }
            
            main {
                background: white;
                border: none;
            }
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }
            
            nav {
                position: relative;
                max-height: none;
            }
            
            h1 {
                font-size: 2rem;
            }
            
            h2 {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>📘 Manual Completo de Edição de Briefings</h1>
            <p style="color: #e2e8f0; font-size: 1.2rem; margin-top: 1rem;">LandSpace Strategy Editorial</p>
            <div class="meta">
                <strong>Versão:</strong> 3.0 - Estrutura "Big Tech"<br>
                <strong>Última Atualização:</strong> Janeiro 2026<br>
                <strong>Sistema:</strong> Keystatic CMS + Next.js<br>
                <strong>Estrutura:</strong> Nova arquitetura editorial compartimentada
            </div>
        </header>
        
        <main>
            ${markdownToHtml(mdContent)}
        </main>
        
        <footer>
            <p><strong>LandSpace Strategy Editorial</strong></p>
            <p><em>Intelligence Division</em></p>
            <p><strong>Versão:</strong> 3.0 - Estrutura "Big Tech"</p>
            <p>Última atualização: Janeiro 2026</p>
        </footer>
    </div>
</body>
</html>`;

// Salvar o arquivo HTML
const htmlPath = path.join(__dirname, '..', 'MANUAL_EDICAO_BRIEFINGS.html');
fs.writeFileSync(htmlPath, htmlTemplate, 'utf-8');

console.log('✅ Manual HTML criado com sucesso!');
console.log(`📄 Arquivo: ${htmlPath}`);
