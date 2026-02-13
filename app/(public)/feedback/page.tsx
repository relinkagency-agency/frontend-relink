import Hero from "@/features/feedback/hero";
import Main from "@/features/feedback/main";

export default function page() {
  return (
    <>
      <Hero />
      <Main/>
    </>
  );
}

export const metadata = {
  title: "Feedback",
};