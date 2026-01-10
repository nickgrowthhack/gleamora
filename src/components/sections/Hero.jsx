import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import BookingFlow from "@/components/booking-flow";

export function Hero() {
  return (
    <Section id="hero-section" padding="large" container="large" className="relative overflow-hidden isolate">
      {/* Background Decorator - Primary Blob (Moved to Top Right) */}
      <div 
        aria-hidden="true" 
        className="absolute -top-40 -right-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 animate-blob"
      >
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>

      {/* Background Decorator - Secondary Blob (Moved to Bottom Left) */}
      <div 
        aria-hidden="true" 
        className="absolute top-[calc(100%-13rem)] -left-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] animate-blob"
        style={{ animationDelay: '2s' }}
      >
        <div 
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 items-start lg:items-center relative z-10">
        <div className="flex flex-col gap-6 lg:max-w-2xl">
          <Text variant="h1">
            Experience the Ultimate Clean
          </Text>
          <Text variant="p" className="text-lg text-muted-foreground">
            Professional cleaning services tailored to your needs. Book your trusted cleaner in minutes with our easy-to-use platform.
          </Text>
        </div>
        <div className="w-full lg:w-[500px] shrink-0">
          <BookingFlow />
        </div>
      </div>
    </Section>
  );
}
