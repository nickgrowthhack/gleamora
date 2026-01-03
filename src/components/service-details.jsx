import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Home, Building2, Building, LayoutTemplate, Caravan } from "lucide-react";
import { cn } from "@/lib/utils";

const ServiceDetails = ({ data, updateData, priceData }) => {
  const handleServiceTypeChange = (value) => {
    if (value) updateData({ ...data, serviceType: value });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const handleResidenceChange = (value) => {
    if (value) updateData({ ...data, residenceType: value });
  };

  const handleBedroomsChange = (value) => {
     if (value) updateData({ ...data, bedrooms: value });
  };

  const handleBathroomsChange = (value) => {
     if (value) updateData({ ...data, bathrooms: value });
  };

  const handleSqFtChange = (value) => {
    updateData({ ...data, sqFt: value[0] });
  };

  const handleFrequencyChange = (value) => {
    if (value) updateData({ ...data, cleaningFrequency: value });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 space-y-8">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Service Details</h2>

      {/* Residence Type */}
      <div className="space-y-3">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Tipo de residência
        </label>
        <ToggleGroup
          type="single"
          value={data.residenceType}
          onValueChange={handleResidenceChange}
          className="justify-start flex-wrap gap-2"
          variant="outline"
        >
          <ToggleGroupItem value="House" aria-label="House" className="gap-2">
            <Home className="h-4 w-4" />
            House
          </ToggleGroupItem>
          <ToggleGroupItem value="Apartment" aria-label="Apartment" className="gap-2">
            <Building2 className="h-4 w-4" />
            Apartment
          </ToggleGroupItem>
          <ToggleGroupItem value="Townhouse" aria-label="Townhouse" className="gap-2">
            <Building className="h-4 w-4" />
            Townhouse
          </ToggleGroupItem>
           <ToggleGroupItem value="Studio" aria-label="Studio" className="gap-2">
            <LayoutTemplate className="h-4 w-4" />
            Studio
          </ToggleGroupItem>
           <ToggleGroupItem value="Mobile Homes" aria-label="Mobile Homes" className="gap-2">
            <Caravan className="h-4 w-4" />
            Mobile Homes
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Bedrooms */}
      <div className="space-y-3">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Quantidade de quartos
        </label>
        <ToggleGroup
          type="single"
          value={data.bedrooms}
          onValueChange={handleBedroomsChange}
          className="justify-start flex-wrap gap-2"
          variant="outline"
        >
          {['1', '2', '3', '4', '5', '6+'].map((num) => (
            <ToggleGroupItem key={num} value={num} className="w-10 h-10">
              {num}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Bathrooms */}
      <div className="space-y-3">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Quantidade de banheiros
        </label>
        <ToggleGroup
          type="single"
          value={data.bathrooms}
          onValueChange={handleBathroomsChange}
          className="justify-start flex-wrap gap-2"
          variant="outline"
        >
          {['1', '2', '3', '4', '5', '6+'].map((num) => (
            <ToggleGroupItem key={num} value={num} className="w-10 h-10">
              {num}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Sq Ft */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Tamanho aproximado (Sq Ft)
          </label>
          <span className="text-sm text-gray-500 font-mono">
            {data.sqFt || 300} Sq Ft
          </span>
        </div>
        <Slider
          defaultValue={[data.sqFt || 300]}
          min={300}
          max={5000}
          step={50}
          onValueChange={handleSqFtChange}
          className="py-4"
        />
      </div>

      {/* Service Type */}
      <div className="space-y-3">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Tipo de serviço
        </label>
        <RadioGroup
          value={data.serviceType}
          onValueChange={handleServiceTypeChange}
          className="grid grid-cols-1 gap-3"
        >
          {/* Standard Clean */}
          <label
            htmlFor="standard-clean"
            className={cn(
              "flex cursor-pointer items-start gap-4 rounded-lg border p-4 shadow-sm hover:bg-gray-50 transition-all",
              data.serviceType === "Standard Clean" ? "border-primary bg-blue-50/50" : "border-gray-200"
            )}
          >
            <RadioGroupItem value="Standard Clean" id="standard-clean" className="mt-1" />
            <div className="flex-1 space-y-1">
              <div className="font-medium leading-none">Standard Clean</div>
              <div className="text-sm text-gray-500">
                Routine cleaning for maintaining a tidy home
              </div>
            </div>
          </label>

          {/* Deep Clean */}
          <label
            htmlFor="deep-clean"
            className={cn(
              "flex cursor-pointer items-start gap-4 rounded-lg border p-4 shadow-sm hover:bg-gray-50 transition-all",
              data.serviceType === "Deep Clean" ? "border-primary bg-blue-50/50" : "border-gray-200"
            )}
          >
            <RadioGroupItem value="Deep Clean" id="deep-clean" className="mt-1" />
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium leading-none">Deep Clean</span>
                <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">Most Popular</Badge>
              </div>
              <div className="text-sm text-gray-500">
                Perfect for homes not cleaned in 30+ days
              </div>
            </div>
          </label>

          {/* Move-In / Move-Out */}
          <label
            htmlFor="move-in-out"
            className={cn(
              "flex cursor-pointer items-start gap-4 rounded-lg border p-4 shadow-sm hover:bg-gray-50 transition-all",
              data.serviceType === "Move-In / Move-Out" ? "border-primary bg-blue-50/50" : "border-gray-200"
            )}
          >
            <RadioGroupItem value="Move-In / Move-Out" id="move-in-out" className="mt-1" />
            <div className="flex-1 space-y-1">
              <div className="font-medium leading-none">Move-In / Move-Out</div>
              <div className="text-sm text-gray-500">
                Thorough cleaning for empty homes
              </div>
            </div>
          </label>

          {/* Airbnb / Rental */}
          <label
            htmlFor="airbnb-rental"
            className={cn(
              "flex cursor-pointer items-start gap-4 rounded-lg border p-4 shadow-sm hover:bg-gray-50 transition-all",
              data.serviceType === "Airbnb / Rental" ? "border-primary bg-blue-50/50" : "border-gray-200"
            )}
          >
            <RadioGroupItem value="Airbnb / Rental" id="airbnb-rental" className="mt-1" />
            <div className="flex-1 space-y-1">
              <div className="font-medium leading-none">Airbnb / Rental</div>
              <div className="text-sm text-gray-500">
                Quick turnaround for guests
              </div>
            </div>
          </label>

          {/* Post-Construction */}
          <label
            htmlFor="post-construction"
            className={cn(
              "flex cursor-pointer items-start gap-4 rounded-lg border p-4 shadow-sm hover:bg-gray-50 transition-all",
              data.serviceType === "Post-Construction" ? "border-primary bg-blue-50/50" : "border-gray-200"
            )}
          >
            <RadioGroupItem value="Post-Construction" id="post-construction" className="mt-1" />
            <div className="flex-1 space-y-1">
              <div className="font-medium leading-none">Post-Construction</div>
              <div className="text-sm text-gray-500">
                Remove dust and debris after renovation
              </div>
            </div>
          </label>
        </RadioGroup>
      </div>

      {/* Cleaning Frequency */}
      <div className="space-y-3">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          How often should we clean?
        </label>
        <p className="text-xs text-gray-500">
          Save more with a recurring plan. Cancel or reschedule anytime.
        </p>
        <ToggleGroup
          type="single"
          value={data.cleaningFrequency}
          onValueChange={handleFrequencyChange}
          className="justify-start w-full"
          variant="outline"
        >
          <ToggleGroupItem value="One-Time" className="flex-1 text-xs px-2 h-auto py-3 flex-col gap-1">
            <span className="font-medium">One-Time</span>
            <span className="text-gray-500">Just once</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="Weekly" className="flex-1 text-xs px-2 h-auto py-3 flex-col gap-1">
            <span className="font-medium">Weekly</span>
            <span className="text-green-600 font-bold">Save 20%</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="Bi-Weekly" className="flex-1 text-xs px-2 h-auto py-3 flex-col gap-1">
            <span className="font-medium">Bi-Weekly</span>
            <span className="text-green-600 font-bold">Save 15%</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="Monthly" className="flex-1 text-xs px-2 h-auto py-3 flex-col gap-1">
            <span className="font-medium">Monthly</span>
            <span className="text-green-600 font-bold">Save 10%</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Price Summary Footer */}
      {priceData && (
        <div className="mt-8 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-gray-600 font-medium">Estimated Total</span>
              <div className="text-right">
                {priceData.discountAmount > 0 && (
                   <span className="text-sm text-gray-400 line-through mr-2">
                     {formatCurrency(priceData.originalPrice)}
                   </span>
                )}
                <span className="text-2xl font-bold text-primary transition-all duration-300 ease-in-out">
                  {formatCurrency(priceData.finalPrice)}
                </span>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 text-right transition-opacity duration-300">
               Based on {priceData.details.bedrooms || 0} bedrooms, {priceData.details.bathrooms || 0} bathrooms, and {priceData.details.sqFt || 300} Sq Ft
            </p>
          </div>
        </div>
       )}
    </div>
  );
};

export default ServiceDetails;
