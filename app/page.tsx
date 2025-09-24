import { Banner } from "@/components/banner";
import { Currently } from "@/components/current";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Currently />
      <Banner />
    </>
  );
}

