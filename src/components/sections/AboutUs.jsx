import { Section } from "@/components/ui/section";

export function AboutUs() {
  return (
    <Section padding="small" container="large">
      <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-4xl mx-auto">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Us</h2>
          <p className="text-xl text-muted-foreground font-medium">
            At Gleamora Cleaning, we believe a truly clean home transforms your life.
          </p>
        </div>
        
        <div className="space-y-6 text-muted-foreground leading-relaxed text-lg text-left">
          <p>
            We have been committed to delivering a superior level of cleanliness and professionalism to the Tulsa, OK community.
          </p>
          
          <p>
            We offer a full spectrum of home cleaning solutions, perfectly tailored for modern life. Our expertise covers premium house cleaning, specialized carpet and upholstery renewal, detailed move-in/out services, and making Airbnb properties consistently guest-ready. We don’t just clean surfaces; we create beautifully organized and sanitized spaces with unmatched attention to detail.
          </p>
          
          <p>
            What sets us apart? It’s our passion for people and planet. We combine eco-friendly cleaning products with highly efficient processes, all powered by our professional, fully vetted team. We pride ourselves on transparent pricing, flexible scheduling to fit your busy life, and a commitment to communication that makes booking effortless.
          </p>
          
          <p className="font-semibold text-foreground">
            For busy families, ambitious professionals, and savvy rental owners across Tulsa, we are more than just a cleaning service—we are your partner in maximizing comfort and reclaiming your free time.
          </p>
        </div>
      </div>
    </Section>
  );
}
