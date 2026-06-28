import type { Metadata } from "next";
import ProviderGuidePage from "@/components/ProviderGuidePage";
import { moneyTransferProviders } from "@/data/moneyTransferProviders";

export const metadata: Metadata = {
  title: "MoneyGram Money Transfer Guide | Deported Not Defeated",
  description: "Educational guide to MoneyGram for cash pickup and international money transfers. Compare fees and agent locations. Educational resource only.",
};

const provider = moneyTransferProviders.find((p) => p.slug === "moneygram")!;

export default function MoneyGramPage() {
  return <ProviderGuidePage provider={provider} />;
}
