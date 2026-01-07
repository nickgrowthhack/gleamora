import { z } from 'zod';

// Schema for Pricing Input
const PricingInputSchema = z.object({
  bedrooms: z.union([z.string(), z.number()]).transform((val) => {
    if (val === "6+") return 6;
    const parsed = parseInt(String(val), 10);
    return isNaN(parsed) ? 0 : parsed;
  }),
  bathrooms: z.union([z.string(), z.number()]).transform((val) => {
    if (val === "6+") return 6;
    const parsed = parseInt(String(val), 10);
    return isNaN(parsed) ? 0 : parsed;
  }),
  sqFt: z.number().optional().default(300),
  serviceType: z.string().optional().default("Standard Clean"),
  cleaningFrequency: z.string().optional().default("One-Time"),
});

export type PricingInput = z.input<typeof PricingInputSchema>;
export type PricingParsedInput = z.output<typeof PricingInputSchema>;

export interface PricingResult {
  originalPrice: number;
  finalPrice: number;
  discountAmount: number;
  discountRate: number;
  details: {
    bedrooms: number;
    bathrooms: number;
    sqFt: number;
    serviceType: string;
    frequency: string;
  };
}

export class PricingService {
  static calculate(input: unknown): PricingResult {
    // Validate and parse input using Zod
    const data = PricingInputSchema.parse(input);

    const { bedrooms, bathrooms, sqFt, serviceType, cleaningFrequency } = data;

    // Base Price
    let basePrice = 100;

    // Add-ons
    basePrice += bedrooms * 20;
    basePrice += bathrooms * 30;
    basePrice += sqFt * 0.10;

    // Service Type Multiplier
    let multiplier = 1.0;
    switch (serviceType) {
      case "Deep Clean":
        multiplier = 1.5;
        break;
      case "Move-In / Move-Out":
        multiplier = 2.0;
        break;
      case "Airbnb / Rental":
        multiplier = 1.2;
        break;
      case "Post-Construction":
        multiplier = 2.5;
        break;
      default:
        multiplier = 1.0;
    }

    const subtotal = basePrice * multiplier;

    // Frequency Discount
    let discountRate = 0;
    switch (cleaningFrequency) {
      case "Weekly":
        discountRate = 0.20;
        break;
      case "Bi-Weekly":
        discountRate = 0.15;
        break;
      case "Monthly":
        discountRate = 0.10;
        break;
      default:
        discountRate = 0;
    }

    const discountAmount = subtotal * discountRate;
    const finalPrice = subtotal - discountAmount;

    return {
      originalPrice: subtotal,
      finalPrice: finalPrice,
      discountAmount: discountAmount,
      discountRate: discountRate,
      details: {
        bedrooms,
        bathrooms,
        sqFt,
        serviceType,
        frequency: cleaningFrequency,
      },
    };
  }
}
