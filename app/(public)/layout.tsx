/** @format */

import Header from "@/shared/layouts/header";
import Footer from "@/shared/layouts/footer";
import PageTransition from "@/shared/layouts/pageTransitiion";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <PageTransition>
                <main className="min-h-[70vh]">{children}</main>
            </PageTransition>
            <Footer />
        </>
    );
}
