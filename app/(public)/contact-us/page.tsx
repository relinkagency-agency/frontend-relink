import Hero from "@/features/contact/ui/hero";
import Main from "@/features/contact/ui/main";

export default function page() {
  return (
    <>
      <Hero />
      <Main/>
    </>
  );
}

export const metadata = {
  title: "Contact Us",
};