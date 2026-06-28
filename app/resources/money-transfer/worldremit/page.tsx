import type { Metadata } from "next";
import ProviderGuidePage from "@/components/ProviderGuidePage";
import { moneyTransferProviders } from "@/data/moneyTransferProviders";

export const metadata: Metadata = {
  title: "WorldRemit Money Transfer Guide | Deported Not Defeated",
  description: "Educational guide to WorldRemit for international money transfers to mobile wallets, cash pickup, and bank deposit. Educational resource only.",
};

const provider = moneyTransferProviders.find((p) => p.slug === "worldremit")!;

export default function WorldRemitPage() {
  return <ProviderGuidePage provider={provider} />;
}
