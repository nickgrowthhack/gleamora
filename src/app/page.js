"use client";

import { useState, useEffect, useMemo } from "react";
import DistanceCalculator from "@/components/distance-calculator";
import ServiceDetails from "@/components/service-details";
import Schedule from "@/components/schedule";
import { Section } from "@/components/ui/section";
import { PricingService } from "@/services/core";
import { Gallery } from "@/components/sections/Gallery";
import { AboutUs } from "@/components/sections/AboutUs";

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
  const [formData, setFormData] = useState({
    address: null,
    serviceDetails: {},
    schedule: {}
  });
  const [isStepValid, setIsStepValid] = useState(false);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Re-validate when stepping into a new step to prevent invalid state
  useEffect(() => {
    if (step === 1) {
        setIsStepValid(!!formData.address?.valid);
    } else if (step === 2) {
        // Placeholder validation for step 2 (currently always valid)
        setIsStepValid(true);
    } else if (step === 3) {
        // Validate that a date is selected for step 3
        setIsStepValid(!!formData.schedule?.date);
    }
  }, [step, formData]);

  const priceData = useMemo(() => {
    try {
      return PricingService.calculate(formData.serviceDetails);
    } catch (error) {
      return null;
    }
  }, [formData.serviceDetails]);


  const nextStep = () => {
    if (isStepValid) {
        setStep((prev) => Math.min(prev + 1, 3));
    }
  };
  
  const prevStep = () => {
      setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleAddressSelect = (data) => {
    setFormData(prev => ({ ...prev, address: data }));
    setIsStepValid(data.valid);
  };

  const handleServiceDetailsUpdate = (data) => {
      // Placeholder for future logic
      setFormData(prev => ({ ...prev, serviceDetails: data }));
      setIsStepValid(true); 
  };

  const handleScheduleUpdate = (data) => {
      setFormData(prev => ({ ...prev, schedule: data }));
      setIsStepValid(!!data.date);
  };

  return (
    <div className="flex flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <Section padding="small" container="large" className="flex-1 flex flex-col justify-center gap-8">
        
        {/* Breadcrumb Navigation */}
        <div className="w-full flex justify-center py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                {step === 1 ? (
                  <BreadcrumbPage className="font-bold text-primary">Home Address</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink 
                    onClick={() => setStep(1)} 
                    className="cursor-pointer"
                  >
                    Home Address
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {step === 2 ? (
                  <BreadcrumbPage className="font-bold text-primary">Service Details</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink 
                    onClick={() => { if (step > 2) setStep(2); }} // Only allow clicking back to 2 if on 3
                    className={`cursor-pointer ${step < 2 ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    Service Details
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                 {step === 3 ? (
                  <BreadcrumbPage className="font-bold text-primary">Schedule</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink className="cursor-not-allowed opacity-50">Schedule</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Step Content */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
            {step === 1 && (
                <div className="flex flex-col lg:flex-row gap-12 lg:items-center w-full justify-center">

                  <DistanceCalculator 
                    onAddressSelect={handleAddressSelect} 
                    initialAddress={formData.address?.address}
                  />
                </div>
            )}
            
            {step === 2 && (
                <ServiceDetails 
                    data={formData.serviceDetails} 
                    updateData={handleServiceDetailsUpdate} 
                    priceData={priceData}
                />
            )}
            
            {step === 3 && (
                <Schedule 
                    data={formData.schedule} 
                    updateData={handleScheduleUpdate} 
                />
            )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8 pb-8">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
                Back
            </Button>
            
            <Button onClick={nextStep} disabled={!isStepValid || step === 2}>
                {step === 1 ? "Get My Instant Quote" : step === 3 ? "Finish" : "Next"}
            </Button>
        </div>

      </Section>
      <Gallery />
      <AboutUs />
    </div>
  );
}
