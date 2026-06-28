import type { Metadata } from "next";
import ProviderGuidePage from "@/components/ProviderGuidePage";
import { moneyTransferProviders } from "@/data/moneyTransferProviders";

export const metadata: Metadata = {
  title: "Paysend Money Transfer Guide | Deported Not Defeated",
  description: "Educational guide to Paysend for card-to-card and bank transfers with flat fees. Educational resource only.",
};

const provider = moneyTransferProviders.find((p) => p.slug === "paysend")!;

export default function PaysendPage() {
  return <ProviderGuidePage provider={provider} />;
}
