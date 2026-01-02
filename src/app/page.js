import Image from "next/image";
import DistanceCalculator from "@/components/distance-calculator";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

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
            <Text variant="h1" className="text-black dark:text-zinc-50">
              Are we in your neighborhood?
            </Text>
            <Text variant="p" className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
              We bring premium cleaning to homes within 40 miles of downtown Tulsa. Enter your address to see if you qualify for a spot.
            </Text>
          </div>
          
          <DistanceCalculator />
        </div>
      </Section>
    </div>
  );
}
