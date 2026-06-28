import type { Metadata } from "next";
import ProviderGuidePage from "@/components/ProviderGuidePage";
import { moneyTransferProviders } from "@/data/moneyTransferProviders";

export const metadata: Metadata = {
  title: "Instarem Money Transfer Guide | Deported Not Defeated",
  description: "Educational guide to Instarem for low-fee bank transfers to Asia and globally. Educational resource only.",
};

const provider = moneyTransferProviders.find((p) => p.slug === "instarem")!;

export default function InstaremPage() {
  return <ProviderGuidePage provider={provider} />;
}
