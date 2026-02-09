/** @format */

"use client";

import React from "react";
import Services from "./services";
import type { Service } from "@/lib/strapi.types";

export type ServiceCategory = "development" | "marketing" | "ai";

const STATIC_SERVICES: Record<ServiceCategory, Service[]> = {
    development: [
        {
            id: 1,
            title: "Web App Development",
            slug: "web-app-development",
            shortDescription:
                "Building scalable, high-performance web applications using modern frameworks like Next.js and React. We use web app development to create custom web applications tailored to your business needs, helping you make informed decisions and take action.",
            order: 1,
        },
        {
            id: 2,
            title: "Mobile App Development",
            slug: "mobile-app-development",
            shortDescription:
                "Creating seamless cross-platform mobile experiences with React Native for iOS and Android. We use mobile app development to create custom mobile applications tailored to your business needs, helping you make informed decisions and take action.",
            order: 2,
        },
        {
            id: 3,
            title: "E-commerce Solutions",
            slug: "ecommerce-solutions",
            shortDescription:
                "Developing robust online stores and marketplaces tailored to your business needs. We use e-commerce solutions to create custom e-commerce stores tailored to your business needs, helping you make informed decisions and take action.",
            order: 3,
        },
        {
            id: 4,
            title: "Custom Software",
            slug: "custom-software",
            shortDescription:
                "Engineering bespoke software solutions to solve complex business challenges. We use custom software development to create custom software tailored to your business needs, helping you make informed decisions and take action.",
            order: 4,
        },
    ],
    marketing: [
        {
            id: 1,
            title: "SEO Optimization",
            slug: "seo-optimization",
            shortDescription:
                "Improving your online visibility and driving organic traffic to your website. We craft marketing campaigns that resonate with your audience and drive measurable results, combining creativity with data analytics.",
            order: 1,
        },
        {
            id: 2,
            title: "Content Strategy",
            slug: "content-strategy",
            shortDescription:
                "Crafting compelling content that resonates with your audience and builds brand authority. We create content that not only entertains but also educates and inspires your audience, helping them make informed decisions and take action.",
            order: 2,
        },
        {
            id: 3,
            title: "Social Media",
            slug: "social-media-marketing",
            shortDescription:
                "Engaging your audience and growing your brand presence across social platforms. We use social media to connect with your audience, build relationships, and drive traffic to your website.",
            order: 3,
        },
        {
            id: 4,
            title: "PPC Advertising",
            slug: "ppc-advertising",
            shortDescription:
                "Driving targeted traffic and maximizing ROI with data-driven paid advertising campaigns. We use PPC to reach your ideal audience and convert them into customers.",
            order: 4,
        },
    ],
    ai: [
        {
            id: 1,
            title: "Machine Learning",
            slug: "machine-learning",
            shortDescription:
                "Leveraging data to build predictive models and intelligent systems. We use machine learning to analyze data and make predictions, helping you make informed decisions and take action.",
            order: 1,
        },
        {
            id: 2,
            title: "Natural Language Processing",
            slug: "nlp",
            shortDescription:
                "Enabling computers to understand, interpret, and generate human language. We use NLP to analyze text data and extract insights, helping you make informed decisions and take action.",
            order: 2,
        },
        {
            id: 3,
            title: "Computer Vision",
            slug: "computer-vision",
            shortDescription:
                "Empowering systems to derive meaningful information from digital images and videos. We use computer vision to analyze visual data and extract insights, helping you make informed decisions and take action.",
            order: 3,
        },
        {
            id: 4,
            title: "AI Integration",
            slug: "ai-integration",
            shortDescription:
                "Seamlessly integrating AI capabilities into your existing software and workflows. We use AI to automate tasks and improve efficiency, helping you make informed decisions and take action.",
            order: 4,
        },
    ],
};

interface StaticServicesProps {
    category: ServiceCategory;
}

export default function StaticServices({ category }: StaticServicesProps) {
    const services = STATIC_SERVICES[category] || [];

    return <Services services={services} />;
}
