import Script from "next/script";

export default function AdBanner() {
  return (
    <div>
      {/* Placeholder for the ad */}
      {/* <div id="ad-banner" style={{ width: 728, height: 90 }} /> */}

      {/* Configuration script */}
      <Script id="ad-config" strategy="afterInteractive">
        {`
          atOptions = {
            'key': '5a4702186f11d8612bd54788262c0734',
            'format': 'iframe',
            'height': 90,
            'width': 728,
            'params': {}
          };
        `}
      </Script>

      {/* External JS script */}
      <Script
        src="//abackdamstubborn.com/5a4702186f11d8612bd54788262c0734/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
