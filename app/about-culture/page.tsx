import Index from "@/features/about/ui";
import { getUpdates } from "@/lib/strapi";

export default function page() {


  return (
    <>
      <Index/>
    </>
  );
}

export const metadata = {
  title: "About Us",
};
