import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import BookingFlow from "@/components/booking-flow";

export function Hero() {
  return (
    <Section padding="medium" container="large">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-center">
        <div className="flex flex-col gap-6">
          <Text variant="h1">
            Experience the Ultimate Clean
          </Text>
          <Text variant="p" className="text-lg text-muted-foreground">
            Professional cleaning services tailored to your needs. Book your trusted cleaner in minutes with our easy-to-use platform.
          </Text>
        </div>
        <div className="w-full">
          <BookingFlow />
        </div>
      </div>
    </Section>
  );
}
