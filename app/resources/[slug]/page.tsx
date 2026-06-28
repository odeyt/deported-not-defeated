import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle2, XCircle, Info } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { AffiliatePartner } from "@/lib/types";
import AffiliateCTAButton from "@/components/AffiliateCTAButton";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import NewsletterForm from "@/components/NewsletterForm";

interface Props {
  params: { slug: string };
}

// ── Per-provider rich content ──────────────────────────────────────────────
interface ProviderContent {
  pros: string[];
  cons: string[];
  bestFor: string;
  howItWorks: string;
  feeTip?: string;
}

const PROVIDER_CONTENT: Record<string, ProviderContent> = {
  wise: {
    pros: [
      "Uses the real mid-market exchange rate — no hidden markup",
      "Low, transparent fees shown upfront before you send",
      "Multi-currency account — hold money in 40+ currencies",
      "Fast transfers: often same-day or next business day",
      "Available in 80+ countries including most deportation destinations",
      "Mobile app works well with international phone numbers",
    ],
    cons: [
      "No cash pickup — bank account required on both ends",
      "Not available in every country (Cuba, North Korea, Iran excluded)",
      "Large transfers may require identity verification documents",
      "No Spanish/local-language in-person support",
    ],
    bestFor: "Deportees with a local bank account who need to receive regular support from family in the USA.",
    howItWorks: "Family in the USA opens a Wise account, sends money to your local bank account. Money arrives in local currency at the mid-market rate. You can also open a Wise account yourself to hold and convert funds.",
    feeTip: "Compare the total cost (fee + exchange rate) — Wise often beats banks by 3–8% on international transfers.",
  },
  remitly: {
    pros: [
      "Cash pickup available at thousands of locations in Latin America, Asia, and Africa",
      "Fast transfers — Express delivery often under 1 hour",
      "Strong coverage in Mexico, Guatemala, El Salvador, Honduras, Philippines",
      "Simple mobile app — easy for family members to use",
      "First transfer fee waived for new users",
      "Offers both bank deposit and cash pickup options",
    ],
    cons: [
      "Exchange rates include a markup (not mid-market)",
      "Economy transfers are cheaper but take 3–5 business days",
      "Transfer limits apply — large amounts require extra verification",
      "Customer service can be slow during high-volume periods",
    ],
    bestFor: "Families in the USA sending money to Latin America or the Philippines, especially where cash pickup is needed.",
    howItWorks: "Family sends from the Remitly app. You receive cash at a local pickup point (pharmacy, bank, agent) or directly to your bank account. No Remitly account needed to receive.",
    feeTip: "Choose Economy over Express when you're not in a rush — the fee can be 50–80% lower.",
  },
  worldremit: {
    pros: [
      "Operates in 130+ countries — widest global reach",
      "Multiple payout options: bank deposit, cash pickup, mobile money, airtime top-up",
      "Mobile money transfers to M-Pesa, GCash, bKash and others",
      "Competitive rates for Africa, Southeast Asia, and the Caribbean",
      "No need for recipient to have a bank account",
      "24/7 transfers — sends any time of day",
    ],
    cons: [
      "Fees vary widely by destination and payout method",
      "Exchange rate markup applies (not mid-market)",
      "Cash pickup agent availability varies by city",
      "App can be slow during peak hours",
    ],
    bestFor: "Deportees in countries where mobile money is common (Kenya, Ghana, Philippines, Bangladesh) or where banking access is limited.",
    howItWorks: "Sender uses the WorldRemit app or website. Recipient gets funds via bank account, cash pickup, or mobile wallet depending on their country. Mobile money hits your phone balance instantly.",
    feeTip: "Mobile money transfers often arrive faster and cheaper than bank deposits in many African and Asian countries.",
  },
  moneygram: {
    pros: [
      "350,000+ cash pickup locations globally — largest physical network",
      "Available in nearly every country deportees are sent to",
      "No bank account needed to receive cash",
      "Fast — most transfers ready within minutes",
      "Reliable brand with decades of international experience",
    ],
    cons: [
      "One of the higher fee providers in the market",
      "Exchange rate markup is significant",
      "Fees are not always clearly shown before confirmation",
      "In-person agent experience varies by location",
    ],
    bestFor: "Deportees in rural or remote areas where no bank or mobile money exists, but a MoneyGram agent location is nearby.",
    howItWorks: "Family sends from a MoneyGram location, app, or website. You pick up cash at any MoneyGram agent — often pharmacies, supermarkets, or small stores — with a reference number and ID.",
    feeTip: "Online MoneyGram transfers are usually cheaper than sending from a physical agent location.",
  },
  "western-union": {
    pros: [
      "500,000+ locations worldwide — the largest cash pickup network on earth",
      "Available in virtually every country, including rural areas",
      "No bank account required to send or receive",
      "Pickup possible within minutes of sending",
      "Trusted and recognized globally",
    ],
    cons: [
      "Among the highest fees in the industry",
      "Exchange rate includes a significant markup",
      "Cash pickup requires valid government ID",
      "Online and agent rates differ — not always transparent",
    ],
    bestFor: "Emergency transfers to deportees in areas with no banking infrastructure, or for family members who are not tech-savvy.",
    howItWorks: "Sender goes to a WU location, app, or website. You receive a MTCN (tracking number). Walk into any Western Union agent with your ID and MTCN to collect cash — no account needed.",
    feeTip: "Use the WU app or website instead of an in-person agent — fees can be 30–50% lower.",
  },
  ria: {
    pros: [
      "Competitive exchange rates, often better than WU and MoneyGram",
      "450,000+ pickup locations worldwide",
      "Multiple payout options: cash, bank, mobile wallet",
      "Low fees for many corridors (US → Latin America especially)",
      "Strong presence in Mexico, Central America, and South America",
    ],
    cons: [
      "Less well-known — some recipients unfamiliar with it",
      "App is less polished than Remitly or Wise",
      "Customer support response times can be slow",
      "Limited coverage in some African and Asian countries",
    ],
    bestFor: "Deportees in Latin America looking for lower fees than Western Union or MoneyGram with similar cash pickup availability.",
    howItWorks: "Family sends via Ria app, website, or local agent. You receive cash at a Ria agent location, or funds deposit to your bank account. Reference number + ID required for pickup.",
    feeTip: "Ria often has promotional rates — check the app before sending for any current fee discounts.",
  },
  xe: {
    pros: [
      "Excellent exchange rates — among the best for large transfers",
      "No transfer fees on most currency pairs",
      "Trusted currency data provider (xe.com rates are industry standard)",
      "Transfers to 130+ countries",
      "Good for large, one-time transfers",
    ],
    cons: [
      "Bank account required on both ends — no cash pickup",
      "Not ideal for small amounts (minimum transfer applies)",
      "Slower than services like Remitly or Wise for urgent transfers",
      "Less known in deportation destination countries",
    ],
    bestFor: "Larger transfers — sending $500+ from the USA to a deportee with a local bank account.",
    howItWorks: "Sender creates an XE account, sets up the transfer, and it arrives in the recipient's bank account in local currency. No mobile app pickup — bank deposit only.",
    feeTip: "XE shines on amounts over $1,000 — the zero-fee structure saves significantly compared to percentage-based services.",
  },
  ofx: {
    pros: [
      "No transfer fees on all transactions",
      "Excellent exchange rates for mid-to-large transfers",
      "24/7 phone support in multiple languages",
      "Available in 50+ countries",
      "Competitive for regular recurring transfers",
    ],
    cons: [
      "Minimum transfer of $1,000 (not suitable for small amounts)",
      "Bank account required — no cash pickup",
      "Slower than consumer apps (1–2 business days)",
      "Less intuitive for non-technical users",
    ],
    bestFor: "Deportees receiving regular large support payments (rent, living expenses) from family or businesses in the USA.",
    howItWorks: "OFX works like a bank wire but with better rates. Sender moves money to OFX, OFX converts and deposits to the recipient's foreign bank account. Good for scheduled recurring transfers.",
    feeTip: "OFX is best for $1,000+ transfers — below that, Wise or Remitly will usually be cheaper.",
  },
  paysend: {
    pros: [
      "Fixed low fees — flat rate regardless of transfer amount",
      "Fast transfers — often instant to cards and bank accounts",
      "Available in 170+ countries",
      "Card-to-card transfers possible",
      "Simple, clean mobile app",
    ],
    cons: [
      "Exchange rate includes a markup",
      "No cash pickup option",
      "Card required on the recipient end in some countries",
      "Less established than Wise or Remitly",
    ],
    bestFor: "Deportees who have a local debit card and need fast, predictable-cost transfers from family.",
    howItWorks: "Sender uses the Paysend app to send from their card. Recipient receives funds directly to their local debit card or bank account. Transfer often completes in minutes.",
    feeTip: "The flat fee model makes Paysend particularly cost-effective for amounts between $100–$500.",
  },
  payoneer: {
    pros: [
      "Widely used for freelance and remote work payments",
      "Mastercard debit card available in many countries",
      "Can receive payments from US companies and platforms",
      "Available in 200+ countries",
      "Good for deportees doing remote work",
    ],
    cons: [
      "Not designed for family remittances — best for work payments",
      "Annual card fee applies",
      "Customer support can be slow to resolve issues",
      "Exchange rate fees on withdrawals",
    ],
    bestFor: "Deportees who are freelancing or doing remote work and need to receive USD payments internationally.",
    howItWorks: "Create a Payoneer account, receive a virtual US bank account number. US clients or platforms pay you like a US employee. You withdraw to your local bank or use the Payoneer card directly.",
    feeTip: "Payoneer is a better tool for getting paid than for receiving family support — pair it with Wise or Remitly for family transfers.",
  },
  xoom: {
    pros: [
      "PayPal-backed — trusted and widely recognized",
      "Strong coverage in Latin America and the Philippines",
      "Cash pickup, bank deposit, and home delivery options",
      "Fast transfers — often within minutes",
      "Good for recipients without bank accounts",
    ],
    cons: [
      "Higher fees compared to Wise or Remitly",
      "Exchange rate markup applies",
      "Requires US PayPal account on sender side",
      "Limited coverage outside PayPal-supported regions",
    ],
    bestFor: "Families in the USA who already use PayPal and want to send money quickly to Latin America or Asia.",
    howItWorks: "Sender uses the Xoom app (linked to PayPal). Recipient picks up cash at an agent location or receives bank deposit. Home delivery available in select countries.",
    feeTip: "If the sender already has PayPal balance, Xoom fees are often lower than funding from a bank account.",
  },
  instarem: {
    pros: [
      "Excellent rates for Asia-Pacific transfers",
      "Transparent fee structure — shown before you confirm",
      "Nium-backed infrastructure — reliable and fast",
      "Earn reward points on transfers",
      "Available in 60+ countries",
    ],
    cons: [
      "Less useful for Latin America and Africa",
      "No cash pickup — bank account required",
      "Less known brand may raise questions from recipients",
      "Customer support primarily via email",
    ],
    bestFor: "Deportees in Southeast Asia, India, Philippines, or Australia receiving support from the USA.",
    howItWorks: "Sender creates an InstaRem account, transfers funds, recipient receives to bank account. Points earned can be redeemed for fee discounts on future transfers.",
    feeTip: "InstaRem is particularly strong for US → Philippines and US → India corridors.",
  },
  airalo: {
    pros: [
      "eSIM cards for 200+ countries — no physical SIM needed",
      "Activate from your phone before you even land",
      "Affordable data-only plans (no calls needed with WhatsApp/Signal)",
      "No contracts — pay only for what you need",
      "Works on any unlocked phone",
    ],
    cons: [
      "Data-only — no local phone number for calls/SMS",
      "Requires a compatible unlocked phone",
      "Some older phones don't support eSIM",
      "Plans can be pricier than local SIM for long stays",
    ],
    bestFor: "Deportees who need internet access immediately upon arrival before finding a local SIM card.",
    howItWorks: "Purchase an Airalo plan from the app. Scan a QR code to activate the eSIM — done. You have data within minutes of landing.",
    feeTip: "Buy a short plan (1 week) for arrival, then switch to a local carrier for long-term stays — local SIMs are usually cheaper.",
  },
  nordvpn: {
    pros: [
      "Protects your internet activity from surveillance",
      "Access content blocked in your country",
      "Works on phones, laptops, and tablets",
      "No-logs policy — your activity is not recorded",
      "Fast servers in 60+ countries",
    ],
    cons: [
      "Monthly cost ($3–$13/month depending on plan)",
      "Some countries block VPN traffic entirely",
      "Not useful if you just need local internet access",
      "Setup can be confusing for non-technical users",
    ],
    bestFor: "Deportees in countries with internet censorship, or anyone handling sensitive communications about their case.",
    howItWorks: "Install the NordVPN app, connect to a server, and your traffic is encrypted. Websites see the VPN server's location, not yours.",
    feeTip: "Buy a 2-year plan for the lowest monthly cost — avoid month-to-month pricing.",
  },
  safetywing: {
    pros: [
      "Designed specifically for people living outside their home country",
      "Low monthly cost (~$45/month for most adults)",
      "No long-term commitment — cancel anytime",
      "Covers emergency medical, hospitalization, and travel delays",
      "Available in almost every country",
    ],
    cons: [
      "Not available to US residents — designed for people abroad",
      "Does not cover pre-existing conditions",
      "Not a substitute for comprehensive local health insurance",
      "Limited dental and vision coverage",
    ],
    bestFor: "Deportees who need basic emergency health coverage while they figure out local insurance options.",
    howItWorks: "Sign up online, choose your plan dates, and you're covered. Show your SafetyWing card at hospitals for covered emergencies. Claims submitted online.",
    feeTip: "SafetyWing is a bridge solution — enroll in local government health insurance as soon as possible for better long-term coverage.",
  },
};

const DEFAULT_CONTENT: ProviderContent = {
  pros: [
    "Established service with international reach",
    "Multiple transfer options available",
    "Competitive rates for supported corridors",
  ],
  cons: [
    "Availability and fees vary by country",
    "Always compare with other providers before sending",
  ],
  bestFor: "Compare with other providers to find the best fit for your specific country and situation.",
  howItWorks: "Visit the official website for current rates, fees, and availability in your destination country.",
};

async function getPartner(slug: string): Promise<AffiliatePartner | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("affiliate_partners")
    .select("*, affiliate_categories(id, name, slug)")
    .eq("slug", slug)
    .eq("active", true)
    .single();
  return data as AffiliatePartner | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const partner = await getPartner(params.slug);
  if (!partner) return { title: "Not Found" };
  const catName = (partner.affiliate_categories as any)?.name ?? "Resource";
  return {
    title: `${partner.company_name} Review & Guide for Deportees | Deported Not Defeated`,
    description: `Pros, cons, and honest guide to ${partner.company_name} for people rebuilding life after deportation. Is it right for your country and situation?`,
    keywords: [partner.company_name, catName, "deportee", "rebuild", "review", "pros cons"],
  };
}

export default async function PartnerPage({ params }: Props) {
  const partner = await getPartner(params.slug);
  if (!partner) notFound();

  const cat = partner.affiliate_categories as any;
  const catSlug = cat?.slug ?? "resources";
  const catName = cat?.name ?? "Resources";
  const isApproved = partner.affiliate_status === "approved" && !!partner.affiliate_url;
  const content = PROVIDER_CONTENT[partner.slug] ?? DEFAULT_CONTENT;

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</Link>
            <span className="text-gray-600">/</span>
            <Link href={`/resources/${catSlug}`} className="text-gray-400 hover:text-white transition-colors">{catName}</Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300">{partner.company_name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold">{partner.company_name}</h1>
          {partner.short_description && (
            <p className="text-gray-300 text-lg mt-3 leading-relaxed">{partner.short_description}</p>
          )}
          <div className="mt-6">
            <AffiliateCTAButton partner={partner} size="md" />
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* About */}
          {(partner.full_description || partner.short_description) && (
            <div>
              <h2 className="text-2xl font-bold text-navy-800 mb-3">About {partner.company_name}</h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {partner.full_description ?? partner.short_description}
              </p>
            </div>
          )}

          {/* Best For */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
            <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-blue-900 mb-1">Best For</p>
              <p className="text-blue-800 text-sm leading-relaxed">{content.bestFor}</p>
            </div>
          </div>

          {/* Pros & Cons */}
          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-5">Pros & Cons</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Pros */}
              <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                <p className="font-bold text-green-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-green-600" /> Pros
                </p>
                <ul className="space-y-3">
                  {content.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-green-900">
                      <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Cons */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                <p className="font-bold text-red-800 mb-4 flex items-center gap-2">
                  <XCircle size={17} className="text-red-500" /> Cons
                </p>
                <ul className="space-y-3">
                  {content.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                      <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-navy-800 mb-2">How It Works</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{content.howItWorks}</p>
          </div>

          {/* Fee tip */}
          {content.feeTip && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
              <span className="text-amber-500 text-lg shrink-0">💡</span>
              <div>
                <p className="font-bold text-amber-800 text-sm mb-1">Money-Saving Tip</p>
                <p className="text-amber-700 text-sm leading-relaxed">{content.feeTip}</p>
              </div>
            </div>
          )}

          {/* Why it may help */}
          {partner.why_it_fits && (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-navy-800 mb-2">Why It May Help After Deportation</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{partner.why_it_fits}</p>
            </div>
          )}

          {/* CTA */}
          <div className="bg-navy-800 rounded-2xl p-8 text-center">
            <h3 className="text-white font-bold text-xl mb-2">
              Visit {partner.company_name} Official Website
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Compare options and check current rates before sending. Always verify fees and availability for your specific country.
            </p>
            <AffiliateCTAButton partner={partner} size="lg" />
            {!isApproved && partner.official_website_url && (
              <p className="text-gray-400 text-xs mt-3 flex items-center justify-center gap-1">
                <ExternalLink size={10} /> Opens official website in a new tab
              </p>
            )}
          </div>

          {/* Country focus */}
          {partner.country_focus && (
            <p className="text-gray-400 text-sm text-center">
              Coverage / focus: {partner.country_focus}
            </p>
          )}

          {/* Disclosure */}
          {partner.show_disclosure && <AffiliateDisclosure />}

          {/* Back links */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={`/resources/${catSlug}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-navy-800 transition-colors"
            >
              <ArrowLeft size={14} /> Back to {catName}
            </Link>
            <Link href="/resources" className="text-sm text-gray-600 hover:text-navy-800 transition-colors">
              All Resources →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
