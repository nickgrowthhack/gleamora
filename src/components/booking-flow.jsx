"use client"

import { useState, useMemo } from 'react'
import { PricingService } from '@/services/core/pricing'
import ServiceDetails from '@/components/service-details'
import DistanceCalculator from '@/components/distance-calculator'
import Schedule from '@/components/schedule'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { ChevronLeft, ChevronRight, Check, Calendar, MapPin, Sparkles } from 'lucide-react'
import { cn } from "@/lib/utils"

export default function BookingFlow() {
  const [step, setStep] = useState(1)
  
  // Initial state matching the requirements of all sub-components and PricingService
  const [bookingData, setBookingData] = useState({
    serviceType: "Standard Clean",
    bedrooms: "1",
    bathrooms: "1",
    sqFt: 1000,
    cleaningFrequency: "One-Time",
    residenceType: "House",
    address: "",
    distance: null,
    date: undefined
  })

  // Real-time price calculation using the core service
  const priceData = useMemo(() => {
    return PricingService.calculate(bookingData)
  }, [bookingData])

  // Handler for ServiceDetails and Schedule updates
  // They return the FULL new state object
  const handleUpdateData = (newData) => {
    setBookingData(newData)
  }

  // Handler specifically for DistanceCalculator
  const handleAddressSelect = ({ address, distance, valid }) => {
    setBookingData(prev => ({
      ...prev,
      address,
      distance: valid ? distance : null
    }))
  }

  // Validation logic per step
  const canProceed = () => {
    if (step === 1) return true // Defaults are set, so step 1 is always valid initially
    if (step === 2) return bookingData.distance !== null && bookingData.address !== ""
    if (step === 3) return !!bookingData.date
    return false
  }

  const handleNext = () => {
    if (canProceed()) {
        if (step < 3) {
            setStep(step + 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            // Placeholder for submission logic
            console.log("Booking Confirmed!", { bookingData, priceData })
            alert("Booking Processed! Check console for data.")
        }
    }
  }

  const handleBack = () => {
    if (step > 1) {
        setStep(step - 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Progress Bar Helper
  const steps = [
    { number: 1, label: "Service", icon: Sparkles },
    { number: 2, label: "Location", icon: MapPin },
    { number: 3, label: "Schedule", icon: Calendar },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Progress Stepper */}
      <div className="relative flex items-center justify-between w-full max-w-md mx-auto mb-8">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-zinc-100 dark:bg-zinc-800 -z-10" />
        <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-300 -z-10"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
        
        {steps.map((s) => (
            <div key={s.number} className="flex flex-col items-center gap-2 bg-white dark:bg-zinc-950 px-2">
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    step >= s.number 
                        ? "border-primary bg-primary text-white" 
                        : "border-zinc-200 text-zinc-400 dark:border-zinc-800"
                )}>
                    <s.icon className="w-5 h-5" />
                </div>
                <span className={cn(
                    "text-xs font-medium transition-colors duration-300",
                    step >= s.number ? "text-primary" : "text-zinc-400"
                )}>
                    {s.label}
                </span>
            </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="min-h-[400px]">
        {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <ServiceDetails 
                    data={bookingData} 
                    updateData={handleUpdateData} 
                    priceData={priceData} 
                />
            </div>
        )}

        {step === 2 && (
            <div className="flex justify-center animate-in fade-in slide-in-from-right-4 duration-300">
                <DistanceCalculator 
                    address={bookingData.address}
                    distance={bookingData.distance}
                    onAddressSelect={handleAddressSelect}
                />
            </div>
        )}

        {step === 3 && (
            <div className="flex justify-center animate-in fade-in slide-in-from-right-4 duration-300">
                <Schedule 
                    data={bookingData}
                    updateData={handleUpdateData}
                />
            </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800 z-50 md:relative md:bg-transparent md:border-none md:p-0">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
            <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className={cn("w-full", step === 1 && "opacity-0 pointer-events-none")}
            >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
            </Button>
            
            <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="w-full"
            >
                {step === 3 ? "Complete Booking" : "Next Step"}
                {step === 3 ? <Check className="w-4 h-4 ml-2" /> : <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
        </div>
      </div>

    </div>
  )
}
