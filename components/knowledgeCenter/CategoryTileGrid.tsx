import Link from "next/link";
import {
  Scale,
  DoorOpen,
  Banknote,
  Briefcase,
  Home,
  Users,
  Plane,
  HeartPulse,
  Brain,
  Laptop,
  Sparkles,
  Star,
  Newspaper,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import {
  KNOWLEDGE_CATEGORIES,
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
  CATEGORY_ICONS,
} from "@/lib/knowledgeCenter/categories";

const ICON_MAP: Record<string, LucideIcon> = {
  Scale,
  DoorOpen,
  Banknote,
  Briefcase,
  Home,
  Users,
  Plane,
  HeartPulse,
  Brain,
  Laptop,
  Sparkles,
  Star,
  Newspaper,
};

export default function CategoryTileGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {KNOWLEDGE_CATEGORIES.map((category) => {
        const Icon = ICON_MAP[CATEGORY_ICONS[category]] ?? Scale;
        return (
          <Link
            key={category}
            href={`/knowledge-center/${category}`}
            className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-brand-red" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-navy-800 group-hover:text-brand-red transition-colors">
                {CATEGORY_LABELS[category]}
              </h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                {CATEGORY_DESCRIPTIONS[category]}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-brand-red text-sm font-semibold">
              Browse <ChevronRight size={14} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
