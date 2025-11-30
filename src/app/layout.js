import "./globals.css";
import Script from "next/script";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {Analytics} from "@vercel/analytics/next";
import {GoogleAnalytics} from "@next/third-parties/google";

export const metadata = {
  title: "Cornerstone",
  description: "Build Your Server, Your Way.",
  keywords: ["Cornerstone", "Foundation", "Server", "Home Server", "Modular Server", "Aluminum Server", "Compact Server", "Seamless Server", "Build Your Server", "Your Way", "Stackable", "Modular", "Aluminum", "Compact", "Seamless", "Build Your Server", "Your Way", "Stackable", "Modular", "Aluminum", "Compact", "Seamless"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Navigation />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        <Analytics />
        <GoogleAnalytics gaId={"G-4FX6994NZT"}/>
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ue360a9kx0");
          `}
        </Script>
      </body>
    </html>
  );
}
