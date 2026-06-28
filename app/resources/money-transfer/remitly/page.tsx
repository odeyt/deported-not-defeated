import type { Metadata } from "next";
import ProviderGuidePage from "@/components/ProviderGuidePage";
import { moneyTransferProviders } from "@/data/moneyTransferProviders";

export const metadata: Metadata = {
  title: "Remitly Money Transfer Guide for Deportees | Deported Not Defeated",
  description: "Educational guide to Remitly for family remittances and international money transfers. Compare cash pickup, bank deposit, and fees. Educational resource only.",
};

const provider = moneyTransferProviders.find((p) => p.slug === "remitly")!;

export default function RemitlyPage() {
  return <ProviderGuidePage provider={provider} />;
}
