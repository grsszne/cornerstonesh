"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling to hash anchors with nav offset
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const navHeight = 56; // h-14 = 56px
            // Get the element's top position relative to the document
            const elementTop = element.offsetTop;
            // Scroll so the element starts right below the nav bar
            const offsetPosition = elementTop - navHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 300);
      }
    };

    // Handle initial hash on page load
    handleHashScroll();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [pathname]);

  const navLinks = [
    { name: "Foundation", href: "/foundation" },
    { name: "Devlog", href: "/devlog" },
    { name: "Story", href: "/foundation#story" },
    { name: "Specs", href: "/foundation#specs" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/80 backdrop-blur-md border-b border-black dark:bg-black/80 dark:border-white"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-lg font-[500] tracking-tight text-black dark:text-white hover:opacity-70 transition-opacity"
              >
                Cornerstone
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => {
                const isHashLink = link.href.includes('#');
                const [path, hash] = isHashLink ? link.href.split('#') : [link.href, null];
                
                return isHashLink ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (pathname === path) {
                        // Already on the page, just scroll
                        const element = document.getElementById(hash);
                        if (element) {
                          const navHeight = 56; // h-14 = 56px
                          const elementTop = element.offsetTop;
                          const offsetPosition = elementTop - navHeight;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      } else {
                        // Navigate to the page first, then scroll after load
                        router.push(link.href);
                        setTimeout(() => {
                          const element = document.getElementById(hash);
                          if (element) {
                            const navHeight = 56;
                            const elementTop = element.offsetTop;
                            const offsetPosition = elementTop - navHeight;

                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        }, 500);
                      }
                    }}
                    className="text-xs font-[500] font-mono text-black dark:text-white hover:opacity-70 transition-opacity"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-xs font-[500] font-mono text-black dark:text-white hover:opacity-70 transition-opacity"
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/preorder"
                className="bg-black hover:bg-orange-500 hover:text-white hover:border-orange-500 border border-black dark:bg-white dark:text-black dark:hover:bg-orange-500 dark:hover:text-white dark:hover:border-orange-500 dark:border-white text-white text-xs px-3 py-1.5 rounded-full font-[500] font-mono transition-colors"
              >
                Buy
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-black dark:text-white hover:opacity-70 focus:outline-none p-2"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-5 flex flex-col justify-center space-y-1.5 relative">
                  <span
                    className={`block w-full h-0.5 bg-current transform transition-transform duration-300 ${
                      isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  />
                  <span
                    className={`block w-full h-0.5 bg-current transition-opacity duration-300 ${
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block w-full h-0.5 bg-current transform transition-transform duration-300 ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden absolute top-14 left-0 w-full bg-white dark:bg-black border-b border-black dark:border-white overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => {
              const isHashLink = link.href.includes('#');
              const [path, hash] = isHashLink ? link.href.split('#') : [link.href, null];
              
              return isHashLink ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    if (pathname === path) {
                      // Already on the page, just scroll
                      setTimeout(() => {
                        const element = document.getElementById(hash);
                        if (element) {
                          const navHeight = 56;
                          const elementTop = element.offsetTop;
                          const offsetPosition = elementTop - navHeight;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }, 100);
                    } else {
                      // Navigate to the page first, then scroll after load
                      router.push(link.href);
                      setTimeout(() => {
                        const element = document.getElementById(hash);
                        if (element) {
                          const navHeight = 56;
                          const elementTop = element.offsetTop;
                          const offsetPosition = elementTop - navHeight;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }, 500);
                    }
                  }}
                  className="block px-3 py-2 text-base font-medium font-mono text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-none"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium font-mono text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4">
              <Link
                href="/preorder"
                className="block w-full text-center bg-black hover:bg-orange-500 hover:text-white hover:border-orange-500 border border-black dark:bg-white dark:text-black dark:hover:bg-orange-500 dark:hover:text-white dark:hover:border-orange-500 dark:border-white text-white px-4 py-2 rounded-full font-medium font-mono transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Buy
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from jumping when nav becomes sticky (optional, but good if nav is always fixed) */}
      {/* Since we want the content to go BEHIND the blur at the top, we might NOT want a spacer, or we want the content to have top padding. 
          For an Apple-like "hero" effect, usually the nav sits on top of the hero image initially. 
          Let's assume the user wants it fixed at the top always. */}
    </>
  );
}
