import type { Metadata } from "next";
import CompareMoneyTransfer from "@/components/CompareMoneyTransfer";

export const metadata: Metadata = {
  title: "Compare Money Transfer Services for Deportees and Families | Deported Not Defeated",
  description:
    "Compare money transfer services for cash pickup, bank deposit, mobile wallet support, and family remittances by country. Educational resource only.",
  keywords: ["money transfer deportees", "send money after deportation", "cash pickup international", "remittance guide"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best way to receive money after deportation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best method depends on your country, your access to banking, and the provider options available. Cash pickup may be more practical where banking access is limited. Bank deposit may be faster and cheaper where banking infrastructure exists. Always compare fees, exchange rates, and pickup availability directly with the provider.",
      },
    },
    {
      "@type": "Question",
      name: "Can I receive money without a bank account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, cash pickup is available through providers like MoneyGram, Western Union, and Ria in many countries. Confirm pickup agent locations for your specific area and bring valid government-issued ID.",
      },
    },
    {
      "@type": "Question",
      name: "Are money transfer fees the same for every country?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Fees, exchange rates, and delivery speeds vary significantly by provider and destination country. Always compare multiple options and confirm the exact cost before sending.",
      },
    },
    {
      "@type": "Question",
      name: "Is cash pickup safer than bank deposit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both methods can be safe when using licensed, reputable providers. Cash pickup requires the recipient to present valid ID at an agent location. Bank deposit goes directly to a bank account. Choose based on your family's access to banking and proximity to pickup locations.",
      },
    },
    {
      "@type": "Question",
      name: "Does this website process money transfers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Deported Not Defeated does not process, hold, send, or receive money. We provide educational information and links to third-party licensed providers. Always use the official website of any provider you choose.",
      },
    },
  ],
};

export default function CompareMoneyTransferPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CompareMoneyTransfer />
    </>
  );
}
