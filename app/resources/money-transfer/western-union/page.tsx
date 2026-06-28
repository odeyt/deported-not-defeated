import type { Metadata } from "next";
import ProviderGuidePage from "@/components/ProviderGuidePage";
import { moneyTransferProviders } from "@/data/moneyTransferProviders";

export const metadata: Metadata = {
  title: "Western Union Money Transfer Guide | Deported Not Defeated",
  description: "Educational guide to Western Union for global cash pickup and international money transfers. Compare fees and agent network. Educational resource only.",
};

const provider = moneyTransferProviders.find((p) => p.slug === "western-union")!;

export default function WesternUnionPage() {
  return <ProviderGuidePage provider={provider} />;
}
