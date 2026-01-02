import Image from "next/image";
import DistanceCalculator from "@/components/distance-calculator";
import { Section } from "@/components/ui/section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <Section padding="large" container="medium" className="flex-1 flex flex-col justify-center">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Address Distance Calculator
            </h1>
            <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
              Enter an address below to calculate its straight-line distance to Tulsa, OK.
            </p>
          </div>
          
          <DistanceCalculator />
        </div>
      </Section>
    </div>
  );
}
