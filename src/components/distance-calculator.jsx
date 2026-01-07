"use client"
import { useState, useRef, useEffect } from 'react'
import { useLoadScript, Autocomplete } from '@react-google-maps/api'
import { MapPin, AlertCircle, CheckCircle } from 'lucide-react'
import { GoogleMapsService, GOOGLE_MAPS_LIBRARIES } from '@/services/external'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'


export default function DistanceCalculator({ onAddressSelect, initialAddress }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES
  })


  const [distance, setDistance] = useState(null)
  const [error, setError] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(initialAddress || '')
  const autocompleteRef = useRef(null)

  // Validate initial address if provided
  useEffect(() => {
    if (initialAddress) {
       setSelectedAddress(initialAddress)
       // We don't re-calculate distance here as we assume if it's passed back it was valid, 
       // or we could store distance in parent too. 
       // For now, let's just ensure the input is populated.
       // If we want to show the success message again, we'd need the distance passed in or re-calculated.
       // Let's assume the parent passes the whole address object including distance if needed, 
       // but for simplicity, we just populate the text field.
    }
  }, [initialAddress])


  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace()
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        const formattedAddress = place.formatted_address || ''
        setSelectedAddress(formattedAddress)
        
        const dist = calculateHaversineDistance(TULSA_COORDS.lat, TULSA_COORDS.lng, lat, lng)
        
        if (dist > 40) {
          setError('We currently only service locations within 40 miles of Tulsa.')
          setDistance(null)
          onAddressSelect({ address: formattedAddress, distance: dist, valid: false })
        } else {
          setDistance(dist)
          setError(null)
          onAddressSelect({ address: formattedAddress, distance: dist, valid: true })
        }
      } else {
        console.warn("Place details not found or invalid.")
        onAddressSelect({ valid: false })
      }
    }
  }
  
  // Trigger validation on mount if initial address exists and we want to restore state fully
  // For now, we rely on user interaction or parent state. 
  // If the parent says it's valid, we could pass `initialDistance` prop too to show the success message immediately.

  if (!isLoaded) return <div className="p-4">Loading Google Maps...</div>

  return (
    <div className="w-full max-w-md space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="space-y-2">
        <Text variant="h3">See if we’re in your neighborhood</Text>
        <Text variant="p" className="text-zinc-500 dark:text-zinc-400">
          We’re currently bringing our premium cleaning services to homes within 40 miles of Tulsa.
        </Text>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Text as="label" variant="h6" className="text-sm">
            Your Home Address
          </Text>
          <div className="relative">
            <Autocomplete
              onLoad={ref => autocompleteRef.current = ref}
              onPlaceChanged={handlePlaceChanged}
              options={{
                fields: ["geometry", "formatted_address"],
                componentRestrictions: { country: "us" }
              }}
            >
              <InputGroup className="h-10 bg-white dark:bg-zinc-950">
                <InputGroupAddon>
                  <MapPin className="h-4 w-4 text-zinc-500" />
                </InputGroupAddon>
                <InputGroupInput
                  type="text"
                  defaultValue={selectedAddress}
                  placeholder="Start typing an address..."
                />
              </InputGroup>
            </Autocomplete>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <Text as="span" variant="p" className="text-sm font-medium text-red-800 dark:text-red-200">
                  We're not there yet!
                </Text>
                <Text variant="p" className="text-xs text-red-600 dark:text-red-300">
                  {error}
                </Text>
              </div>
            </div>
          </div>
        )}

        {distance !== null && (
          <div className="rounded-lg bg-primary/5 p-4 dark:bg-primary/10">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <Text as="span" variant="p" className="text-sm font-medium text-primary">
                    Perfect! We service your area.
                  </Text>
                  <Text variant="p" className="text-xs text-muted-foreground">
                    Your home in {selectedAddress.split(',')[0]} is within our priority service zone.
                  </Text>
                </div>
              </div>
              {/* Button removed here as requested */}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
