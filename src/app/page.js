"use client";

import BookingFlow from "@/components/booking-flow";
import { Section } from "@/components/ui/section";
import { Gallery } from "@/components/sections/Gallery";
import { AboutUs } from "@/components/sections/AboutUs";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <Section padding="small" container="large" className="flex-1 flex flex-col justify-center gap-8">
        <BookingFlow />
      </Section>
      <Gallery />
      <AboutUs />
    </div>
  );
}
