import type { Metadata } from "next";
import ProviderGuidePage from "@/components/ProviderGuidePage";
import { moneyTransferProviders } from "@/data/moneyTransferProviders";

export const metadata: Metadata = {
  title: "Xe Money Transfer Guide | Deported Not Defeated",
  description: "Educational guide to Xe Money Transfer for currency conversion and bank-to-bank international transfers. Educational resource only.",
};

const provider = moneyTransferProviders.find((p) => p.slug === "xe")!;

export default function XePage() {
  return <ProviderGuidePage provider={provider} />;
}
