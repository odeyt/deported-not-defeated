import type { Metadata } from "next";
import ProviderGuidePage from "@/components/ProviderGuidePage";
import { moneyTransferProviders } from "@/data/moneyTransferProviders";

export const metadata: Metadata = {
  title: "Ria Money Transfer Guide | Deported Not Defeated",
  description: "Educational guide to Ria Money Transfer for Latin America, Caribbean, and global cash pickup and bank deposit. Educational resource only.",
};

const provider = moneyTransferProviders.find((p) => p.slug === "ria")!;

export default function RiaPage() {
  return <ProviderGuidePage provider={provider} />;
}
