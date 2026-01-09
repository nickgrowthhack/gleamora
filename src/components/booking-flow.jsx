"use client"

import { useState, useMemo, useEffect } from 'react'
import { PricingService } from '@/services/core/pricing'
import ServiceDetails from '@/components/service-details'
import DistanceCalculator from '@/components/distance-calculator'
import Schedule from '@/components/schedule'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, ChevronLeft } from 'lucide-react'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function BookingFlow({ 
  onComplete, 
  onCancel, 
  initialData, 
  className 
}) {
  const [step, setStep] = useState(1)
  
  // Default values
  const defaultBookingData = {
    serviceType: "Standard Clean",
    bedrooms: "1",
    bathrooms: "1",
    sqFt: 1000,
    cleaningFrequency: "One-Time",
    residenceType: "House",
    address: "",
    distance: null,
    date: undefined
  }

  // Initial state merging defaults with optional initialData
  const [bookingData, setBookingData] = useState({
    ...defaultBookingData,
    ...initialData
  })

  // Real-time price calculation using the core service
  const priceData = useMemo(() => {
    return PricingService.calculate(bookingData)
  }, [bookingData])

  // Scroll to top when step changes
  useEffect(() => {
    const flowContainer = document.getElementById('booking-flow-container');
    if (flowContainer) {
        flowContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  // Handler for ServiceDetails and Schedule updates
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
    // Step 1: Address (Location)
    if (step === 1) return bookingData.distance !== null && bookingData.address !== ""
    // Step 2: Service Details
    if (step === 2) return true // Defaults are set, so step 2 is always valid initially
    // Step 3: Schedule
    if (step === 3) return !!bookingData.date
    return false
  }

  const handleNext = () => {
    if (canProceed()) {
        if (step < 3) {
            setStep(step + 1)
        } else {
            // Final step completion
            if (onComplete) {
                onComplete({ ...bookingData, priceData })
            } else {
                console.log("Booking Confirmed!", { bookingData, priceData })
                alert("Booking Processed! Check console for data.")
            }
        }
    }
  }

  const handleBack = () => {
    if (step > 1) {
        setStep(step - 1)
    }
  }

  return (
    <div 
        id="booking-flow-container"
        className={cn(
            "w-full flex flex-col items-center gap-4",
            className
        )}
    >
      
      {/* Breadcrumb Navigation */}
      <div className="w-full flex justify-center py-2">
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
                  onClick={() => { if (step > 2) setStep(2); }} 
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[300px]">
        {step === 1 && (
            <div className="flex justify-center w-full animate-in fade-in slide-in-from-right-4 duration-300">
                <DistanceCalculator 
                    address={bookingData.address}
                    distance={bookingData.distance}
                    onAddressSelect={handleAddressSelect}
                />
            </div>
        )}

        {step === 2 && (
            <div className="w-full animate-in fade-in slide-in-from-right-4 duration-300">
                <ServiceDetails 
                    data={bookingData} 
                    updateData={handleUpdateData} 
                    priceData={priceData} 
                />
            </div>
        )}

        {step === 3 && (
            <div className="flex justify-center w-full animate-in fade-in slide-in-from-right-4 duration-300">
                <Schedule 
                    data={bookingData}
                    updateData={handleUpdateData}
                />
            </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-center gap-4 mt-2 pb-4 w-full">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={step === 1}
          >
              Back
          </Button>
          
          <Button 
            onClick={handleNext} 
            disabled={!canProceed()}
          >
              {step === 3 ? "Finish" : "Next"}
              {step !== 3 && <ArrowRightIcon className="w-4 h-4 ml-2" />}
          </Button>
      </div>

    </div>
  )
}
