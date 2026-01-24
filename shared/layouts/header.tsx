"use client";
import { useState, useRef, useEffect } from "react";
import MobileHeader from "./mobileHeader";
import Link from "next/link";
import TransitionLink from "./transitionLink";

export default function Header() {
  const lastY = useRef(0);
  const [isHeaderBgBlack, setIsHeaderBgBlack] = useState(false);
  const [hideNav, setHideNav] = useState(false);

  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);


  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const goingUp = y < lastY.current;

      if (y > lastY.current) {
        setHideNav(true);
      } else if (y < lastY.current) {
        setHideNav(false);
      }

      setIsHeaderBgBlack(goingUp && y > 10);
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      {isMobile ? (
        <MobileHeader />
      ) : (
        <div
          className={`main-tool-bar fixed top-0 left-0 right-0 z-50 px-12 py-4 flex justify-between items-center font-semibold text-white  ${
            isHeaderBgBlack ? "bg-[#0B0D13]" : "bg-transparent"
          }`}
        >
          <div
            className={`transition-all duration-300 ${
              hideNav
                ? "opacity-0 -translate-y-3 pointer-events-none"
                : "opacity-100 translate-y-0"
            }`}
          >
            <h4 className="font-relink-headline text-[38px] select-none uppercase">
              <TransitionLink href="/">Relink</TransitionLink>
            </h4>
          </div>

          <nav className="flex items-center gap-6">
            <div
              className={`flex gap-6 items-center text-[14px] uppercase tracking-[0.15em] transition-all duration-300 ${
                hideNav
                  ? "opacity-0 -translate-y-3 pointer-events-none"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <TransitionLink href="/work-services">WORK+SERVICES</TransitionLink>
              <TransitionLink href="/about-culture">ABOUT+CULTURE</TransitionLink>
              <TransitionLink href="/news-insight">NEWS+INSIGHT</TransitionLink>
            </div>

            <button className="bg-amber-50 px-4 py-2 text-gray-900 cursor-pointer font-medium tracking-widest">
              <TransitionLink href="/contact-us">ENQUIRE</TransitionLink>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
