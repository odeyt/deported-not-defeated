import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-extrabold text-brand-red mb-4">404</p>
        <h1 className="text-3xl font-bold text-navy-800 mb-3">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          This page does not exist. But your future does. Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            Go Home
          </Link>
          <Link href="/laos/directory" className="bg-navy-800 hover:bg-navy-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            Search Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
