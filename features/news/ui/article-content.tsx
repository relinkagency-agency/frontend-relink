/** @format */
import React from "react";
import Image from "next/image";

interface BlockProps {
    block: any;
}

const RichTextBlock = ({ block }: { block: any }) => {
    if (!block.body) return null;

    return (
        <div className="max-w-3xl mx-auto px-6 mb-16 selection:bg-black selection:text-white">
            <div
                className="prose prose-lg max-w-none text-neutral-800 leading-relaxed font-light 
                   prose-headings:font-serif prose-headings:text-black prose-headings:font-normal
                   prose-p:mb-8 prose-strong:font-bold prose-a:text-black prose-a:underline prose-a:underline-offset-4"
                dangerouslySetInnerHTML={{ __html: block.body.replace(/\n/g, '<br />') }}
            />
        </div>
    );
};

const QuoteBlock = ({ block }: { block: any }) => {
    if (!block.body) return null;
    return (
        <div className="max-w-4xl mx-auto px-6 mb-24 selection:bg-black selection:text-white">
            <blockquote className="border-l-4 border-black/5 pl-10 py-2">
                <p className="text-3xl md:text-5xl font-serif text-black italic leading-tight mb-8">
                    "{block.body}"
                </p>
                {block.title && (
                    <cite className="text-black/30 font-medium not-italic tracking-[0.2em] uppercase text-[10px] md:text-xs">
                        — {block.title}
                    </cite>
                )}
            </blockquote>
        </div>
    );
};

const MediaBlock = ({ block }: { block: any }) => {
    const file = block.file;
    if (!file?.url) return null;

    return (
        <div className="max-w-5xl mx-auto px-6 mb-24 selection:bg-black selection:text-white">
            <div className="group relative overflow-hidden bg-neutral-100 rounded-sm">
                <div className="relative aspect-[16/10] w-full">
                    <Image
                        src={file.url}
                        alt={file.alternativeText || ""}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                </div>
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
            </div>
            {file.caption && (
                <p className="mt-6 text-center text-[13px] text-black/40 italic font-medium tracking-wide">
                    {file.caption}
                </p>
            )}
        </div>
    );
};

const SliderBlock = ({ block }: { block: any }) => {
    if (!block.files?.length) return null;

    return (
        <div className="max-w-7xl mx-auto px-6 mb-24 selection:bg-black selection:text-white">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {block.files.map((file: any, i: number) => (
                    <div
                        key={i}
                        className="relative break-inside-avoid overflow-hidden bg-neutral-100 rounded-sm group shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                        <div className={`relative ${i % 2 === 0 ? 'aspect-square' : 'aspect-[3/4]'} w-full`}>
                            <Image
                                src={file.url}
                                alt={file.alternativeText || ""}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function ArticleContent({ blocks }: { blocks: any[] }) {
    if (!blocks || !blocks.length) return null;

    return (
        <div className="py-24 bg-transparent">
            {blocks.map((block, index) => {
                switch (block.__component) {
                    case "shared.rich-text":
                        return <RichTextBlock key={index} block={block} />;
                    case "shared.quote":
                        return <QuoteBlock key={index} block={block} />;
                    case "shared.media":
                        return <MediaBlock key={index} block={block} />;
                    case "shared.slider":
                        return <SliderBlock key={index} block={block} />;
                    default:
                        console.warn(`Unknown block component: ${block.__component}`);
                        return null;
                }
            })}
        </div>
    );
}
