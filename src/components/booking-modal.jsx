"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import BookingFlow from "@/components/booking-flow"

export function BookingModal({ children, initialData, onComplete }) {
  const [open, setOpen] = useState(false)

  const handleComplete = (data) => {
    console.log("Booking Completed via Modal:", data)
    if (onComplete) {
      onComplete(data)
    }
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent 
        className="max-w-3xl w-full p-0 overflow-hidden sm:max-w-4xl h-[90vh] sm:h-auto overflow-y-auto"
        showCloseButton={false} // We handle close inside the flow or allow standard close
      >
        <div className="sr-only">
          <DialogTitle>Book a Service</DialogTitle>
          <DialogDescription>
            Follow the steps to schedule your cleaning service.
          </DialogDescription>
        </div>
        
        {/* We pass onCancel to allow the flow to trigger closing, 
            and we might not need the default X close button of the dialog 
            if the flow provides one, but keeping it for accessibility is fine.
            However, I set showCloseButton={false} above to use the custom one in the flow or relying on onCancel.
            Actually, let's enable the standard close button for UX but also pass onCancel.
        */}
        
        <div className="p-4 sm:p-6">
            <BookingFlow 
                onComplete={handleComplete} 
                onCancel={handleCancel}
                initialData={initialData}
                className="w-full"
            />
        </div>
      </DialogContent>
    </Dialog>
  )
}
