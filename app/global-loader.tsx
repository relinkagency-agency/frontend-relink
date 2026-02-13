'use client';

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./nprogress-custom.css";

NProgress.configure({ showSpinner: false });

export function GlobalLoader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        NProgress.start();
        const timeout = setTimeout(() => {
            NProgress.done();
        }, 500);
        return () => {
            clearTimeout(timeout);
            NProgress.done();
        };
    }, [pathname, searchParams]);

    return null;
}
