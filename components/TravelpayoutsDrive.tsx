import Script from "next/script";

/**
 * Travelpayouts Drive.
 *
 * Installed 2026-08-23 from the "Install Drive manually" step of Travelpayouts
 * onboarding. Partner marker: 565661 (the src path is that number, base64-encoded).
 *
 * The snippet Travelpayouts provides is written for WordPress. Its wrapper
 * attributes — nowprocket, data-noptimize, data-cfasync, data-wpfc-render,
 * seraph-accel-crit, data-no-defer — are all instructions to WP Rocket,
 * Autoptimize, Cloudflare Rocket Loader, WP Fastest Cache, and Seraphinite
 * telling them not to defer or minify the tag. None of those exist here, so
 * they are dropped. The inner document.createElement dance is likewise just a
 * hand-rolled async loader, which is exactly what next/script already does.
 *
 * What is preserved: the script source, async loading, and the data-cmp-ab
 * attribute the loader sets on the injected tag.
 *
 * NOTE: this is a remote third-party script whose behaviour can change without
 * a deploy on our side. It is monetization tooling, not part of the
 * /go/[slug] affiliate engine, and it is not evidence of program approval.
 * See docs/AFFILIATE-OFFER-REGISTRY.md.
 */
export default function TravelpayoutsDrive() {
  return (
    <Script
      id="travelpayouts-drive"
      src="https://emrldtp.cc/NTY1NjYx.js?t=565661"
      strategy="afterInteractive"
      data-cmp-ab="2"
    />
  );
}
