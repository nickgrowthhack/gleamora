"use client";

import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { Gallery } from "@/components/sections/Gallery";
import { AboutUs } from "@/components/sections/AboutUs";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <Benefits />
      <AboutUs />
      <Gallery />
    </div>
  );
}
