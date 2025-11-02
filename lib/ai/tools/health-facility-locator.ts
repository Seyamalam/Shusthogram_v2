import { tool } from "ai";
import { z } from "zod";

/**
 * Health Facility Locator Tool
 * Helps users find nearby health facilities based on their location and needs
 */
export const healthFacilityLocator = tool({
  description:
    "Find nearby health facilities including hospitals, clinics, health centers, pharmacies, and diagnostic centers based on user location and type of care needed.",
  inputSchema: z.object({
    latitude: z.number().describe("User's current latitude"),
    longitude: z.number().describe("User's current longitude"),
    facilityType: z.enum([
      "emergency",
      "hospital",
      "health_center",
      "clinic",
      "pharmacy",
      "diagnostic_center",
    ]).describe("Type of health facility needed"),
    radius: z.number().optional().default(10).describe("Search radius in kilometers"),
  }),
  execute: async ({ latitude, longitude, facilityType, radius = 10 }) => {
    // In a real implementation, this would call a database or external API
    // For now, we'll return sample data for Bangladesh health facilities
    
    const facilityDescriptions = {
      emergency: "Emergency Department / Hospital",
      hospital: "District Hospital / Medical College Hospital",
      health_center: "Upazila Health Complex / Community Clinic",
      clinic: "Private Clinic / Doctor's Chamber",
      pharmacy: "Medicine Shop / Pharmacy",
      diagnostic_center: "Diagnostic Center / Pathology Lab",
    };

    // Sample facility data (in real app, this would come from a database/API)
    const sampleFacilities = [
      {
        name: "Government Upazila Health Complex",
        type: "health_center",
        address: "Main Road, Upazila Center",
        distance: "2.5 km",
        phone: "+880-xxx-xxxx",
        services: ["General Medicine", "Emergency Care", "Basic Diagnostics"],
        openHours: "24 hours",
        hasFreeService: true,
      },
      {
        name: "District Sadar Hospital",
        type: "hospital",
        address: "Hospital Road, District Center",
        distance: "8.3 km",
        phone: "+880-xxx-xxxx",
        services: ["Emergency", "Surgery", "Pediatrics", "Maternity"],
        openHours: "24 hours",
        hasFreeService: true,
      },
      {
        name: "Community Health Clinic",
        type: "health_center",
        address: "Village Center",
        distance: "1.2 km",
        phone: "+880-xxx-xxxx",
        services: ["Basic Health Checkup", "Vaccination", "Prenatal Care"],
        openHours: "9 AM - 3 PM (Sat-Thu)",
        hasFreeService: true,
      },
      {
        name: "Popular Pharmacy",
        type: "pharmacy",
        address: "Market Road",
        distance: "0.8 km",
        phone: "+880-xxx-xxxx",
        services: ["Prescription Medicines", "OTC Drugs", "Basic First Aid"],
        openHours: "8 AM - 10 PM",
        hasFreeService: false,
      },
      {
        name: "Modern Diagnostic Center",
        type: "diagnostic_center",
        address: "Town Center",
        distance: "5.1 km",
        phone: "+880-xxx-xxxx",
        services: ["Blood Tests", "X-Ray", "Ultrasound", "ECG"],
        openHours: "7 AM - 8 PM",
        hasFreeService: false,
      },
    ];

    // Filter facilities by type
    let relevantFacilities = sampleFacilities;
    if (facilityType !== "emergency") {
      relevantFacilities = sampleFacilities.filter(f => f.type === facilityType);
    } else {
      // For emergency, show hospitals and health centers
      relevantFacilities = sampleFacilities.filter(
        f => f.type === "hospital" || f.type === "health_center"
      );
    }

    // Sort by distance (in real app, would calculate actual distance)
    relevantFacilities.sort((a, b) => {
      const distA = parseFloat(a.distance.replace(" km", ""));
      const distB = parseFloat(b.distance.replace(" km", ""));
      return distA - distB;
    });

    return {
      searchLocation: { latitude, longitude },
      facilityType: facilityDescriptions[facilityType],
      searchRadius: `${radius} km`,
      facilitiesFound: relevantFacilities.length,
      facilities: relevantFacilities.slice(0, 5), // Return top 5 closest
      instructions: {
        transportation: "You can reach these facilities by rickshaw, CNG auto-rickshaw, or local bus.",
        emergency: facilityType === "emergency" 
          ? "In case of emergency, please call the nearest facility first or go directly to the emergency department."
          : "For non-emergency situations, consider calling ahead to confirm availability and timing.",
        governmentServices: "Government health facilities provide free or low-cost services. Community clinics are available for basic healthcare needs.",
      },
      disclaimer: "Facility information should be verified by calling ahead. Distance and availability may vary.",
    };
  },
});
