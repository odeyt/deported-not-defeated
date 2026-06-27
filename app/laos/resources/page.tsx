import { redirect } from "next/navigation";

// Redirected to the new resources hub
export default function LegacyResourcesPage() {
  redirect("/resources");
}
