"use client";
import { useRef } from "react";
import { useFooterBounce } from "@/shared/hooks/UseFooterBounce";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import FooterCta from "./footerCta";
import Faq from "./faq";
import TransitionLink from "./transitionLink";

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  const down = "M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z";
  const center = "M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z";
  const up = "M0-0.3C0-0.3,464,-140,1139,-140S2278-0.3,2278-0.3V683H0V-0.3z";

  useFooterBounce({ footerRef, down, up, center });
  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#0B0D13] text-white md:pb-0 pb-6 "
    >
      <svg
        viewBox="0 0 2278 683"
        preserveAspectRatio="none"
        className="w-full md:h-18 h-14 overflow-visible block relative "
      >
        <path
          id="bouncy-path"
          fill="#0B0D13"
          d="M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z"
        />
      </svg>

      <Faq />
      <FooterCta />

      <div className="container mx-auto md:px-0 px-4 md:py-12 py-2 font-relink-neue font-light -mt-30 relative z-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 items-start">
          <div>
            <h4 className="font-relink-headline font-light text-[50px] tracking-[-0.04em] select-none">
              Relink
            </h4>
            <TransitionLink
              href="mailto:info@relinkagency.com"
              className="text-sm font-light text-gray-500 hover:text-gray-400"
            >
              info@relinkagency.com
            </TransitionLink>
            <div className="flex gap-3.5 text-xl text-gray-700 mt-4">
              <TransitionLink
                href="#"
                className="hover:text-black w-7 h-7 flex items-center bg-white justify-center rounded-full border border-gray-300"
              >
                {" "}
                <FaFacebookF size={18} />
              </TransitionLink>
              <TransitionLink
                href="#"
                className="hover:text-black w-7 h-7 flex items-center bg-white justify-center rounded-full border border-gray-300"
              >
                {" "}
                <FaInstagram size={18} />
              </TransitionLink>
              <TransitionLink
                href="#"
                className="hover:text-black w-7 h-7 flex items-center bg-white justify-center rounded-full border border-gray-300"
              >
                {" "}
                <FaLinkedinIn size={18} />
              </TransitionLink>
              <TransitionLink
                href="#"
                className="hover:text-black w-7 h-7 flex items-center bg-white justify-center rounded-full border border-gray-300"
              >
                {" "}
                <FaXTwitter size={18} />
              </TransitionLink>
            </div>
          </div>

          <div>
            <h4 className="font-relink-neue font-light text-2xl mb-4 tracking-tight">
              Product
            </h4>
            <ul className="space-y-7 text-sm text-gray-500 text-[15px]">
              <li>
                <TransitionLink href="#" className="hover:text-gray-400">
                  Branding
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="#" className="hover:text-gray-400">
                  Digital Marketing
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="#" className="hover:text-gray-400">
                  Web Design & Development
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="#" className="hover:text-gray-400">
                  SEO
                </TransitionLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-relink-neue font-light text-2xl mb-4 tracking-tight">
              Creativity
            </h4>
            <ul className="space-y-7 text-sm text-gray-500 text-[15px]">
              <li>
                <TransitionLink href="#" className="hover:text-gray-400">
                  Video Production
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="#" className="hover:text-gray-400">
                  Photogragpy
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="#" className="hover:text-gray-400">
                  Application Design and Development
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="#" className="hover:text-gray-400">
                  Packaging Design
                </TransitionLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-relink-neue mb-4 font-light text-2xl tracking-tight">
              Legal
            </h4>
            <ul className="space-y-7 text-sm text-gray-500 text-[15px]">
              <li>
                <TransitionLink href="#" className="hover:text-gray-400 ">
                  Privacy
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="#" className="hover:text-gray-400">
                  Terms
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="#" className="hover:text-gray-400">
                  Contact
                </TransitionLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t my-6 md:my-8 border-gray-500"></div>
        <div className="flex justify-start gap-2 text-center items-center text-sm text-gray-500 font-relink-neue font-light">
          <p>&copy; 2026 Relink. All rights reserved</p>
          <div className="h-3 border border-gray-500"></div>
          <TransitionLink href="#" className="hover:text-gray-400">
            Privacy Policy
          </TransitionLink>
        </div>
      </div>
    </footer>
  );
}
