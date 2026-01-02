import DistanceCalculator from "@/components/distance-calculator";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <Section padding="small" container="large" className="flex-1 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
          <div className="flex flex-col gap-4">

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
