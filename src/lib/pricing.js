export function calculatePrice(data) {
  // Check for required fields
  // Note: sqFt is excluded from strict check because it has a default value (slider)
  const requiredFields = ['residenceType', 'bedrooms', 'bathrooms', 'serviceType', 'cleaningFrequency'];
  const isComplete = requiredFields.every(field => data[field]);

  if (!isComplete) {
    return null;
  }

  // Base Price
  let basePrice = 100;

  // Extract values
  const bedrooms = parseCount(data.bedrooms);
  const bathrooms = parseCount(data.bathrooms);
  const sqFt = data.sqFt || 300; // Default minimum in slider
  const serviceType = data.serviceType;
  const frequency = data.cleaningFrequency;

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

  let subtotal = basePrice * multiplier;

  // Frequency Discount
  let discountRate = 0;
  switch (frequency) {
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
      frequency
    }
  };
}

function parseCount(value) {
  if (!value) return 0;
  if (value === "6+") return 6;
  return parseInt(value, 10) || 0;
}
