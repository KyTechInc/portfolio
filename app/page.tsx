import { Banner } from "@/components/banner";
import BlogSection from "@/components/blog-section";
import { Currently } from "@/components/current";
import GithubActivity from "@/components/github-activity";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Currently />
      <Banner />
      <BlogSection />
      <GithubActivity />
    </>
  );
}

