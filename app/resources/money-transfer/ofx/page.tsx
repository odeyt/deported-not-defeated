import type { Metadata } from "next";
import ProviderGuidePage from "@/components/ProviderGuidePage";
import { moneyTransferProviders } from "@/data/moneyTransferProviders";

export const metadata: Metadata = {
  title: "OFX Money Transfer Guide | Deported Not Defeated",
  description: "Educational guide to OFX for large international bank transfers with competitive exchange rates. Educational resource only.",
};

const provider = moneyTransferProviders.find((p) => p.slug === "ofx")!;

export default function OFXPage() {
  return <ProviderGuidePage provider={provider} />;
}
