'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Entry animation - slide down and exit below viewport
    if (overlayRef.current) {
      // Reset position to top first
      gsap.set(overlayRef.current, { y: '0%' });
      
      // Then animate down and out
      gsap.to(overlayRef.current, {
        y: '100%',
        duration: 1.2,
        ease: 'power3.inOut',
      });
    }
  }, [pathname]);

  return (
    <>
      <div
        id="page-transition-overlay"
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: '#000000',
          zIndex: 9999,
          pointerEvents: 'none',
            willChange: 'transform',
           
        }}/>
      
      {/* Page content */}
      {children}
    </>
  );
}