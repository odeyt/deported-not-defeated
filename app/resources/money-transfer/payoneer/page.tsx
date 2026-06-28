import type { Metadata } from "next";
import ProviderGuidePage from "@/components/ProviderGuidePage";
import { moneyTransferProviders } from "@/data/moneyTransferProviders";

export const metadata: Metadata = {
  title: "Payoneer Guide for Freelancers and Remote Workers | Deported Not Defeated",
  description: "Educational guide to Payoneer for receiving international payments as a freelancer or remote worker after deportation. Educational resource only.",
};

const provider = moneyTransferProviders.find((p) => p.slug === "payoneer")!;

export default function PayoneerPage() {
  return <ProviderGuidePage provider={provider} />;
}
