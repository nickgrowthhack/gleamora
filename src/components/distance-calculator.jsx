"use client"
import { useState, useRef } from 'react'
import { useLoadScript, Autocomplete } from '@react-google-maps/api'
import { MapPin } from 'lucide-react'
import { calculateHaversineDistance } from '@/lib/utils'
import { Text } from '@/components/ui/text'

const TULSA_COORDS = { lat: 36.1540, lng: -95.9928 }
const LIBRARIES = ['places']

export default function DistanceCalculator() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES
  })

  const [distance, setDistance] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState('')
  const autocompleteRef = useRef(null)

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace()
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        setSelectedAddress(place.formatted_address || '')
        
        const dist = calculateHaversineDistance(TULSA_COORDS.lat, TULSA_COORDS.lng, lat, lng)
        setDistance(dist)
      } else {
        console.warn("Place details not found or invalid.")
      }
    }
  }

  if (!isLoaded) return <div className="p-4">Loading Google Maps...</div>

  return (
    <div className="w-full max-w-md space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="space-y-2">
        <Text variant="h2">Distance Calculator</Text>
        <Text variant="p" className="text-sm text-zinc-500 dark:text-zinc-400">
          Calculate the distance from Tulsa to any location.
        </Text>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Text as="label" variant="h6" className="text-sm">
            Enter Address
          </Text>
          <div className="relative">
            <Autocomplete
              onLoad={ref => autocompleteRef.current = ref}
              onPlaceChanged={handlePlaceChanged}
              options={{
                fields: ["geometry", "formatted_address"],
                locationBias: { 
                  center: TULSA_COORDS,
                  radius: 50000 // 50km bias (approx 31 miles)
                }
              }}
            >
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Start typing an address..."
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 pl-9 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-300"
                />
              </div>
            </Autocomplete>
          </div>
        </div>

        {distance !== null && (
          <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <Text as="span" variant="p" className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Distance to Tulsa
              </Text>
              <Text as="span" variant="h4" className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                {distance.toFixed(2)} miles
              </Text>
            </div>
            {selectedAddress && (
              <Text variant="p" className="mt-1 text-xs text-zinc-500 truncate" title={selectedAddress}>
                {selectedAddress}
              </Text>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
