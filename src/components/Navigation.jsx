"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Foundation", href: "/foundation" },
    { name: "Modules", href: "/foundation/modules" },
    { name: "Devlog", href: "/devlog" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled ? "bg-background/80 backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container-swiss flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="z-50 group">
            <span className="font-serif text-2xl font-medium tracking-tight text-foreground group-hover:opacity-70 transition-opacity">
              Cornerstone.
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-sans text-foreground/80 hover:text-foreground hover:opacity-70 transition-all"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/preorder"
              className="text-sm font-sans font-medium text-foreground bg-muted px-5 py-2 rounded-full hover:bg-foreground hover:text-background transition-colors"
            >
              Preorder
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col items-end gap-1.5">
                <span
                  className={`block h-px bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"
                  }`}
                />
                <span
                  className={`block h-px bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "w-4"
                  }`}
                />
                <span
                  className={`block h-px bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-background z-40 transition-transform duration-500 ease-in-out transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col justify-center items-center space-y-8 p-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-3xl font-serif text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/preorder"
              className="text-2xl font-sans font-medium text-foreground mt-8 border-b border-foreground pb-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Preorder Foundation
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
