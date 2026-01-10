import { ShieldCheck, Home, Zap, CalendarDays } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

const benefits = [
  {
    title: "Fully Vetted & Protected",
    description: "Our cleaning teams are Licensed, fully Insured, and rigorously background-checked. Trust our professional crews to deliver peace of mind, reliable service, and a high-quality finish every time.",
    icon: ShieldCheck,
  },
  {
    title: "Expert Home",
    description: "We specialize in making residential properties and short-term rentals shine. From standard maintenance to detailed deep cleans and hassle-free move-outs, we ensure your space is spotless and organized for residents or guests.",
    icon: Home,
  },
  {
    title: "Fast Quotes",
    description: "Get your cleaning started quickly. We commit to visiting your location within 24 hours of your request to provide a comprehensive, transparent estimate, and finalize your service booking right away.",
    icon: Zap,
  },
  {
    title: "Simple Scheduling",
    description: "Enjoy maximum flexibility with your cleaning schedule, including weekly, bi-weekly, or monthly options. We offer easy payment methods, accepting Cash, Zelle, Check, or Venmo for your convenience.",
    icon: CalendarDays,
  },
];

export function Benefits() {
  return (
    <Section padding="small" container="large">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            className="flex flex-col items-start gap-4 p-6 rounded-xl bg-card border text-card-foreground shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <benefit.icon className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <Text variant="h4" className="text-xl font-bold">
                {benefit.title}
              </Text>
              <Text variant="p" className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
