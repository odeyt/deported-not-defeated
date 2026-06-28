import type { Metadata } from "next";
import ProviderGuidePage from "@/components/ProviderGuidePage";
import { moneyTransferProviders } from "@/data/moneyTransferProviders";

export const metadata: Metadata = {
  title: "Xoom by PayPal Money Transfer Guide | Deported Not Defeated",
  description: "Educational guide to Xoom (a PayPal service) for family remittances with cash pickup and bank deposit. Educational resource only.",
};

const provider = moneyTransferProviders.find((p) => p.slug === "xoom")!;

export default function XoomPage() {
  return <ProviderGuidePage provider={provider} />;
}
