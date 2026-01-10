"use client"
import { useState, useRef, useEffect } from 'react'
import { useLoadScript, Autocomplete } from '@react-google-maps/api'
import { MapPin, AlertCircle, CheckCircle } from 'lucide-react'
import { GoogleMapsService, GOOGLE_MAPS_LIBRARIES } from '@/services/external'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Text } from '@/components/ui/text'

export default function DistanceCalculator({ address, distance, onAddressSelect }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES
  })

  const [error, setError] = useState(null)
  const autocompleteRef = useRef(null)

  // Sync internal error state if distance is valid (reset error)
  useEffect(() => {
    if (distance !== null) {
      setError(null);
    }
  }, [distance]);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace()
      const locationData = GoogleMapsService.extractLocationData(place)

      if (locationData) {
        const { lat, lng, formattedAddress } = locationData
        
        const { isServiceable, distance: calcDistance, error: serviceError } = GoogleMapsService.checkServiceAvailability(lat, lng)
        
        if (!isServiceable) {
          setError(serviceError)
          onAddressSelect({ address: formattedAddress, distance: null, valid: false })
        } else {
          setError(null)
          onAddressSelect({ address: formattedAddress, distance: calcDistance, valid: true })
        }
      } else {
        console.warn("Place details not found or invalid.")
        onAddressSelect({ address: '', distance: null, valid: false })
      }
    }
  }
  
  const handleInputChange = (e) => {
      // Just update the text, but validity is lost until selected from map or re-validated
      // However, Google Autocomplete is tricky with controlled inputs.
      // We often just let the parent know the text changed, but validity is false.
      onAddressSelect({ address: e.target.value, distance: null, valid: false })
  }

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
                  id="hero-address-input"
                  type="text"
                  value={address || ''}
                  onChange={handleInputChange}
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

        {distance !== null && !error && address && (
          <div className="rounded-lg bg-primary/5 p-4 dark:bg-primary/10">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <Text as="span" variant="p" className="text-sm font-medium text-primary">
                    Perfect! We service your area.
                  </Text>
                  <Text variant="p" className="text-xs text-muted-foreground">
                    Your home in {address.split(',')[0]} is within our priority service zone.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
