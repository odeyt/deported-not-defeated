import { ShieldAlert } from "lucide-react";
import { SELF_DEPORTING_DISCLAIMER } from "@/lib/knowledgeCenter/selfDeportingDisclaimer";

export { SELF_DEPORTING_DISCLAIMER };

export default function SelfDeportingDisclaimer() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-6 py-4 text-yellow-800 text-sm flex items-start gap-3">
      <ShieldAlert size={18} className="shrink-0 mt-0.5 text-yellow-600" />
      <p className="leading-relaxed">
        <strong>Educational purposes only — not legal advice.</strong> {SELF_DEPORTING_DISCLAIMER}
      </p>
    </div>
  );
}
