import type { Metadata } from "next";
import { SITE_CONFIG } from "@/data/portfolio";
import type { InfrastructureCaseStudy } from "@/types/portfolio";

const PORTRAIT_URL = `${SITE_CONFIG.origin}${SITE_CONFIG.portraitPath}`;

export function buildPageMetadata({
  title,
  description,
  pathname,
  ogType = "website",
}: {
  title: string;
  description: string;
  pathname: string;
  ogType?: "website" | "article";
}): Metadata {
  const canonicalUrl = `${SITE_CONFIG.origin}${pathname}`;

  return {
    title,
    description,
    authors: [{ name: SITE_CONFIG.name }],
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
    openGraph: {
      locale: "en_US",
      type: ogType,
      siteName: SITE_CONFIG.name,
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: PORTRAIT_URL,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [
        {
          url: PORTRAIT_URL,
          alt: SITE_CONFIG.name,
        },
      ],
    },
  };
}

const personEntity = {
  "@type": "Person",
  "@id": `${SITE_CONFIG.origin}/#person`,
  name: SITE_CONFIG.name,
  url: `${SITE_CONFIG.origin}/`,
  jobTitle: SITE_CONFIG.jobTitle,
  image: PORTRAIT_URL,
  sameAs: [
    SITE_CONFIG.socials.github,
    SITE_CONFIG.socials.linkedinCanonical,
    SITE_CONFIG.socials.instagram,
  ],
};

const websiteEntity = {
  "@type": "WebSite",
  "@id": `${SITE_CONFIG.origin}/#website`,
  name: SITE_CONFIG.name,
  alternateName: SITE_CONFIG.shortName,
  url: `${SITE_CONFIG.origin}/`,
};

export function buildHomeJsonLd(title: string, description: string) {
  const url = `${SITE_CONFIG.origin}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: "en",
        isPartOf: { "@id": websiteEntity["@id"] },
        mainEntity: { "@id": personEntity["@id"] },
      },
      personEntity,
      websiteEntity,
    ],
  };
}

export function buildInfrastructureIndexJsonLd(
  title: string,
  description: string
) {
  const url = `${SITE_CONFIG.origin}/infrastructure/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: "en",
        isPartOf: { "@id": websiteEntity["@id"] },
      },
      personEntity,
      websiteEntity,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_CONFIG.origin}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Infrastructure & DevOps",
            item: url,
          },
        ],
      },
    ],
  };
}

export function buildCaseStudyJsonLd(
  item: InfrastructureCaseStudy,
  title: string
) {
  const url = `${SITE_CONFIG.origin}/infrastructure/${item.slug}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${url}#page`,
        url,
        name: title,
        description: item.summary,
        inLanguage: "en",
        isPartOf: { "@id": websiteEntity["@id"] },
        headline: item.title,
        author: { "@id": personEntity["@id"] },
        mainEntityOfPage: url,
        about: item.technologies,
      },
      personEntity,
      websiteEntity,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_CONFIG.origin}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Infrastructure & DevOps",
            item: `${SITE_CONFIG.origin}/infrastructure/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.title,
            item: url,
          },
        ],
      },
    ],
  };
}
