import type { Metadata } from "next";
import ProviderGuidePage from "@/components/ProviderGuidePage";
import { moneyTransferProviders } from "@/data/moneyTransferProviders";

export const metadata: Metadata = {
  title: "Wise Money Transfer Guide for Deportees | Deported Not Defeated",
  description: "Educational guide to Wise (formerly TransferWise) for international bank transfers. Compare fees, speed, and availability. Educational resource only.",
};

const provider = moneyTransferProviders.find((p) => p.slug === "wise")!;

export default function WisePage() {
  return <ProviderGuidePage provider={provider} />;
}
