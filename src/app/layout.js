import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdWrapper from "@/component/AdWrapper/AdWrapper";

const inter = Inter({ subsets: ["latin"] });

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Animoon";
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION;
const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

export const metadata = {
  title: `${siteName} - Watch free Anime Online English Sub/Dub`,
  description: `${siteName} is the best site to watch Anime SUB online, or you can even watch Anime DUB in HD quality. You can also find UnderRated anime on ${siteName} website.`,
  verification: {
    google: googleVerification,
    "google-adsense-account": adsenseId,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content={
            googleVerification || "qwnQljuFScz5pMwy3mHv8BC3aZh5E9J8SYfpKwpgw1E"
          }
        />
      </head>
      <body className={inter.className}>
        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y81ZRXNW2N"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Y81ZRXNW2N');
            `,
          }}
        />

        {/* ✅ AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9295326902131480"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          async
        />

        <Script
          type="text/javascript"
          src="//embeddedoxide.com/d6/f8/e1/d6f8e16851504f20f1ccaadcdd965ee3.js"
        />

        {/* ✅ Page content */}
        {children}

        {/* ✅ Ad wrapper component */}
        {/* <AdWrapper /> */}

        {/* ✅ Toast notifications */}
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
