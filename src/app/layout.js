import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
      </body>
    </html>
  );
}
