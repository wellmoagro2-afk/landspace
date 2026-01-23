/**
 * JSON-LD Structured Data para ScholarlyArticle
 * Schema.org type: ScholarlyArticle
 * Usado para SEO acadêmico e indexação pelo Google Scholar
 * Server Component - usa next/script para CSP compliance
 */
import Script from 'next/script';
import { headers } from 'next/headers';

interface ScholarlyArticleJsonLdProps {
  title: string;
  author: string;
  publicationDate: string;
  journalTitle: string;
  volume?: number;
  issue?: number;
  url: string;
  pdfUrl?: string;
  doi?: string;
  abstract?: string;
  keywords?: string[];
  language?: string;
  description?: string;
}

export default async function ScholarlyArticleJsonLd({
  title,
  author,
  publicationDate,
  journalTitle,
  volume,
  issue,
  url,
  pdfUrl,
  doi,
  abstract,
  keywords,
  language = "pt",
  description,
}: ScholarlyArticleJsonLdProps) {
  // Construir estrutura de publicação (volume/issue)
  let publicationVolume = null;
  if (volume) {
    publicationVolume = {
      "@type": "PublicationVolume",
      volumeNumber: volume.toString(),
      ...(issue && {
        isPartOf: {
          "@type": "PublicationIssue",
          issueNumber: issue.toString(),
        },
      }),
    };
  }

  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: title,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished: publicationDate,
    publisher: {
      "@type": "Organization",
      name: journalTitle,
    },
    inLanguage: language,
    url: url,
  };

  if (description) {
    structuredData.description = description;
  }

  if (abstract) {
    structuredData.abstract = abstract;
  }

  if (keywords && keywords.length > 0) {
    structuredData.keywords = keywords.join(", ");
  }

  if (doi) {
    structuredData.identifier = {
      "@type": "PropertyValue",
      propertyID: "DOI",
      value: doi,
    };
  }

  if (publicationVolume) {
    structuredData.isPartOf = publicationVolume;
  }

  if (pdfUrl) {
    structuredData.encoding = {
      "@type": "MediaObject",
      encodingFormat: "application/pdf",
      contentUrl: pdfUrl,
    };
  }

  // Obter nonce do header para CSP compliance
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') ?? undefined;

  return (
    <Script
      id="scholarly-article-jsonld"
      type="application/ld+json"
      strategy="beforeInteractive"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
