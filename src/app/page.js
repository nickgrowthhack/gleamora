"use client";

import { useState } from "react";
import DistanceCalculator from "@/components/distance-calculator";
import ServiceDetails from "@/components/service-details";
import Schedule from "@/components/schedule";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Home() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <Section padding="small" container="large" className="flex-1 flex flex-col justify-center gap-8">
        
        {/* Breadcrumb Navigation */}
        <div className="w-full flex justify-center py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                {step === 1 ? (
                  <BreadcrumbPage className="font-bold text-primary">Home Address</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink onClick={() => setStep(1)} className="cursor-pointer">Home Address</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {step === 2 ? (
                  <BreadcrumbPage className="font-bold text-primary">Service Details</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink onClick={() => setStep(2)} className="cursor-pointer">Service Details</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                 {step === 3 ? (
                  <BreadcrumbPage className="font-bold text-primary">Schedule</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink onClick={() => setStep(3)} className="cursor-pointer">Schedule</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Step Content */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
            {step === 1 && (
                <div className="flex flex-col lg:flex-row gap-12 lg:items-center w-full justify-center">
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
            )}
            
            {step === 2 && <ServiceDetails />}
            
            {step === 3 && <Schedule />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8 pb-8">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
                Back
            </Button>
            <Button onClick={nextStep} disabled={step === 3}>
                Next
            </Button>
        </div>

      </Section>
    </div>
  );
}
