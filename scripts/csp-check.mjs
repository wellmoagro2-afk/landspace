/* eslint-disable no-console */
import http from "node:http";

const URL = process.env.CSP_URL || "http://localhost:3000/";

function requestHtml(url) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      url,
      {
        method: "GET",
        headers: { Accept: "text/html" },
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (d) => (body += d));
        res.on("end", () =>
          resolve({
            status: res.statusCode ?? 0,
            headers: res.headers,
            body,
          })
        );
      }
    );

    req.on("error", reject);
    req.end();
  });
}

function countRegex(haystack, re) {
  const m = haystack.match(re);
  return m ? m.length : 0;
}

async function main() {
  const { status, headers, body } = await requestHtml(URL);

  const nonce = String(headers["x-nonce"] || "");
  const csp = String(headers["content-security-policy"] || "");

  const hasUnsafeInline = csp.includes("unsafe-inline");
  const hasNonceInScriptSrc = nonce
    ? csp.includes(`script-src 'self' 'nonce-${nonce}'`) ||
      csp.includes(`script-src-elem 'self' 'nonce-${nonce}'`) ||
      csp.includes(`'nonce-${nonce}'`)
    : false;

  const hasNonceInStyleSrc = nonce
    ? csp.includes(`style-src 'self' 'nonce-${nonce}'`) ||
      csp.includes(`style-src-elem 'self' 'nonce-${nonce}'`) ||
      csp.includes(`'nonce-${nonce}'`)
    : false;

  const hasStyleSrcAttr = csp.includes('style-src-attr');
  const hasUnsafeHashes = csp.includes("'unsafe-hashes'");
  const hasHash1 = csp.includes("sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk=");
  const hasHash2 = csp.includes("sha256-dP00IR03GcdTorqXcUpuqfKlgJ11kk5AcCicYjZqTN8=");

  const scriptTagCount = countRegex(body, /<script\b/gi);
  const styleTagCount = countRegex(body, /<style\b/gi);

  // Conta atributos nonce em tags (aproximação robusta)
  const nonceAttrCount = countRegex(body, /\bnonce\s*=\s*['"][^'"]+['"]/gi);

  // Verifica se o nonce do header aparece no HTML (ex.: <script nonce="...">)
  const hasExactNonceAttr =
    nonce.length > 0 &&
    (body.includes(`nonce="${nonce}"`) || body.includes(`nonce='${nonce}'`));

  // Heurística: procura inline event handlers comuns (onload=, onclick= etc.)
  const inlineHandlerHits = countRegex(body, /\son\w+\s*=\s*['"][^'"]+['"]/gi);

  console.log("=== CSP / Nonce Check ===");
  console.log("URL:", URL);
  console.log("STATUS:", status);
  console.log("x-nonce:", nonce || "(missing)");
  console.log("CSP has unsafe-inline?:", hasUnsafeInline);
  console.log("CSP contains nonce for scripts?:", hasNonceInScriptSrc);
  console.log("CSP contains nonce for styles?:", hasNonceInStyleSrc);
  console.log("CSP has style-src-attr?:", hasStyleSrcAttr);
  console.log("CSP style-src-attr has unsafe-hashes?:", hasUnsafeHashes);
  console.log("CSP style-src-attr has hash1?:", hasHash1);
  console.log("CSP style-src-attr has hash2?:", hasHash2);
  console.log("HTML <script> tags:", scriptTagCount);
  console.log("HTML <style> tags:", styleTagCount);
  console.log("HTML nonce attrs:", nonceAttrCount);
  console.log("HTML contains header nonce exactly?:", hasExactNonceAttr);
  console.log("HTML inline on* handlers (heuristic):", inlineHandlerHits);

  const ok =
    status === 200 &&
    !!nonce &&
    !hasUnsafeInline &&
    hasNonceInScriptSrc &&
    hasNonceInStyleSrc &&
    hasStyleSrcAttr &&
    hasUnsafeHashes &&
    hasHash1 &&
    hasHash2 &&
    styleTagCount === 0 &&
    hasExactNonceAttr;

  console.log("RESULT:", ok ? "✅ OK" : "⚠️ CHECK");

  if (!ok) {
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error("ERROR:", e?.message || e);
  process.exitCode = 1;
});
