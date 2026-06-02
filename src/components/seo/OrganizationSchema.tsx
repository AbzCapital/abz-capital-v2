/**
 * Organization Schema Markup for SEO
 * Provides structured data for Google Search and other search engines
 */

export function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.abzcapital.co.ke",
    name: "ABZ Capital",
    legalName: "ABZ Capital Limited",
    description:
      "Structured financing, investment, and insurance solutions for individuals, SMEs and institutions across emerging markets.",
    url: "https://www.abzcapital.co.ke",
    logo: "https://www.abzcapital.co.ke/logo.png",
    image: "https://www.abzcapital.co.ke/logo.png",
    sameAs: [],
    contact: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "hello@abzcapital.co.ke",
      telephone: "+254141576254",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "34487 Nairobi, Solaret Building, Utawala",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi",
      postalCode: "34487",
      addressCountry: "KE",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Kenya",
      },
      {
        "@type": "Country",
        name: "Uganda",
      },
      {
        "@type": "Country",
        name: "Tanzania",
      },
      {
        "@type": "Country",
        name: "Ghana",
      },
      {
        "@type": "Country",
        name: "Nigeria",
      },
    ],
    knowsAbout: [
      "Structured Financing",
      "Investment",
      "Insurance",
      "SME Financing",
      "Asset-backed Lending",
      "Logbook Loans",
    ],
    foundingDate: "2020",
    founder: {
      "@type": "Organization",
      name: "ABZ Capital",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema, null, 2),
      }}
    />
  );
}
