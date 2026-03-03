import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaS, FaXTwitter } from "react-icons/fa6";
import TransitionLink from "./transitionLink";
import logo from "@/public/relink-Wordmark-2.png";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function MobileHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);

  const [isBgBlack, setIsBgBlack] = useState(false);
  const lastY = useRef(0);

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!renderMenu) return;

    if (menuOpen) {
      gsap.fromTo(
        panelRef.current,
        { xPercent: -100 },
        { xPercent: 0, duration: 0.45, ease: "power3.out", overwrite: "auto" }
      );
    } else {
      gsap.to(panelRef.current, {
        xPercent: -100,
        duration: 0.35,
        ease: "power3.in",
        onComplete: () => setRenderMenu(false),
      });
    }
  }, [menuOpen, renderMenu]);

  useEffect(() => {
    const showAnim = gsap
      .from(".mobile-tool-bar", {
        yPercent: -100,
        paused: true,
        duration: 0.25,
      })
      .progress(1);

    const st = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const goingUp = y < lastY.current;

      setIsBgBlack(goingUp && y > 10);

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`mobile-tool-bar fixed top-0 left-0 right-0 z-50 px-4 py-2 flex justify-between items-center text-white transition-colors duration-300 ${isBgBlack ? "bg-[#0B0D13]" : "bg-transparent"
          }`}
      >
        <TransitionLink onClick={() => setMenuOpen(false)} href="/" className="font-relink-headline text-[28px] lowercase">
         <Image src={logo} alt="logo" className="w-25" />
        </TransitionLink>
        <button
          onClick={() => {
            if (!menuOpen) {
              setRenderMenu(true);
              setMenuOpen(true);
            } else {
              setMenuOpen(false);
            }
          }}
          className="relative w-10 h-10 flex items-center justify-center"
        >
          <span
            className={`absolute h-[3px] w-9 bg-white transition-all duration-300 ${menuOpen ? "rotate-45" : "-translate-y-[10px]"
              }`}
          />
          <span
            className={`absolute h-[3px] w-9 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"
              }`}
          />
          <span
            className={`absolute h-[3px] w-9 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45" : "translate-y-[10px]"
              }`}
          />
        </button>
      </div>
      {renderMenu && (
        <div className="fixed inset-0 z-40 bg-transparent overflow-hidden">
          <div
            ref={panelRef}
            className="w-full h-screen bg-[#0B0D13] overflow-hidden"
          >
            <div className="text-white flex flex-col gap-32  px-4 pt-28 justify-between overflow-hidden">
              <nav className="flex flex-col gap-6 text-[31px] font-light">
                <TransitionLink
                  href="/projects"
                  className={`leading-tight ${pathname === "/projects" ? "text-amber-50" : "text-white/70"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Projects+Delivery
                </TransitionLink>
                <TransitionLink
                  href="/about-culture"
                  className={`leading-tight ${pathname === "/about-culture" ? "text-amber-50" : "text-white/70"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  About+Culture
                </TransitionLink>
                <TransitionLink
                  href="/news-insight"
                  className={`leading-tight ${pathname === "/news-insight" ? "text-amber-50" : "text-white/70"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  News+Insights
                </TransitionLink>
              </nav>
              <div className="flex flex-col gap-4">
                <button onClick={() => setMenuOpen(false)} className="flex flex-col justify-center items-center bg-amber-50 w-39 mx-auto py-2.5 text-black cursor-pointer font-medium tracking-widest">
                  <TransitionLink href="/contact-us">ENQUIRE</TransitionLink>
                  <div className="w-19.5 h-1 bg-black "></div>
                </button>
                <div className="flex justify-center gap-4 text-gray-700 mt-4">
                  <a
                    href="#"
                    className="hover:text-black w-7 h-7 flex items-center bg-white justify-center rounded-full border border-gray-300"
                  >
                    {" "}
                    <FaFacebookF size={15} />
                  </a>
                  <a
                    href="#"
                    className="hover:text-black w-7 h-7 flex items-center bg-white justify-center rounded-full border border-gray-300"
                  >
                    {" "}
                    <FaInstagram size={15} />
                  </a>
                  <a
                    href="#"
                    className="hover:text-black w-7 h-7 flex items-center bg-white justify-center rounded-full border border-gray-300"
                  >
                    {" "}
                    <FaLinkedinIn size={15} />
                  </a>
                  <a
                    href="#"
                    className="hover:text-black w-7 h-7 flex items-center bg-white justify-center rounded-full border border-gray-300"
                  >
                    {" "}
                    <FaXTwitter size={15} />
                  </a>
                </div>
                <div className="text-center">
                  <a
                    href="mailto:info@relinkagency.com"
                    className="text-sm font-light text-white/80 hover:text-white"
                  >
                    info@relinkagency.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
