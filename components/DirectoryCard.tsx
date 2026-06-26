import { DirectoryListing } from "@/lib/types";
import { Phone, MessageCircle, Globe, MapPin, CheckCircle, Star } from "lucide-react";

interface Props {
  listing: DirectoryListing;
}

export default function DirectoryCard({ listing }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-bold text-navy-700 text-lg leading-tight">{listing.business_name}</h3>
          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <MapPin size={13} />
            <span>{listing.city}</span>
            <span className="mx-1">·</span>
            <span className="text-gray-600">{listing.category}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-end shrink-0">
          {listing.featured && (
            <span className="bg-brand-gold/20 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Star size={10} fill="currentColor" /> Featured
            </span>
          )}
          {listing.verified && (
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle size={10} /> Verified
            </span>
          )}
          {listing.english_speaking && (
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              English OK
            </span>
          )}
        </div>
      </div>

      {listing.description && (
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{listing.description}</p>
      )}

      {listing.address && (
        <p className="text-gray-500 text-xs mb-3">{listing.address}</p>
      )}

      <div className="flex flex-wrap gap-2">
        {listing.phone && (
          <a
            href={`tel:${listing.phone}`}
            className="flex items-center gap-1.5 bg-navy-50 hover:bg-navy-100 text-navy-600 text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            <Phone size={14} /> Call
          </a>
        )}
        {listing.whatsapp && (
          <a
            href={`https://wa.me/${listing.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        )}
        {listing.website_url && (
          <a
            href={listing.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            <Globe size={14} /> Website
          </a>
        )}
        {listing.google_maps_url && (
          <a
            href={listing.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-brand-red text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            <MapPin size={14} /> Map
          </a>
        )}
      </div>

      {listing.is_affiliate && (
        <p className="text-xs text-gray-400 mt-3 italic">
          Affiliate partner — we may earn a commission at no cost to you.
        </p>
      )}
    </div>
  );
}
