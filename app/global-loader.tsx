'use client';

import { useEffect, useState } from "react";
import NextTopLoader from 'nextjs-toploader';
import "./nprogress-custom.css";

export function GlobalLoader() {
    return (
        <NextTopLoader
            color="var(--color-relink-amber)"
            initialPosition={0.08}
            crawlSpeed={200}
            height={2}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px var(--color-relink-amber),0 0 5px var(--color-relink-amber)"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
            <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
        />
    );
}
