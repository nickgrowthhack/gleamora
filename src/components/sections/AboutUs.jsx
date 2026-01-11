import { Section } from "@/components/ui/section";

export function AboutUs() {
  return (
    <Section id="about-us" padding="small" container="large">
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 text-left">
        <div className="md:w-1/3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Us</h2>
        </div>
        
        <div className="space-y-6 md:w-2/3 text-muted-foreground leading-relaxed text-lg">
          <p>
            At Gleamora Cleaning, we believe a truly clean home transforms your life. We are committed to delivering superior cleanliness and professionalism to the Tulsa, OK community.
          </p>
          
          <p>
            We offer premium house cleaning, carpet renewal, and move-in/out services, tailored for modern life. Our eco-friendly products and professional team ensure your space is beautifully organized and sanitized.
          </p>
          
          <p>
            We are more than just a cleaning service—we are your partner in reclaiming your free time.
          </p>
        </div>
      </div>
    </Section>
  );
}
