"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onClick) {
      onClick();
    }

    if (pathname === href) {
      return;
    }

    const overlay = document.getElementById("page-transition-overlay");

    if (overlay) {
      gsap.fromTo(
        overlay,
        {
          y: "-100%",
        },
        {
          y: "0%",
          duration: 0.9,
          ease: "power3.inOut",
          onComplete: () => {
            router.push(href);
          },
        },
      );
    } else {
      router.push(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
