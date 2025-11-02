import { tool } from "ai";
import { z } from "zod";

/**
 * Symptom Triage Tool
 * Helps assess symptoms and provides guidance on the urgency of care needed
 */
export const symptomTriage = tool({
  description: 
    "Assess patient symptoms and provide triage recommendations. This tool helps determine the urgency level (emergency, urgent, routine, or self-care) and provides appropriate guidance for seeking medical care.",
  inputSchema: z.object({
    symptoms: z.array(z.string()).describe("List of symptoms reported by the patient"),
    duration: z.string().describe("How long the symptoms have been present (e.g., '2 days', '1 week', 'several hours')"),
    severity: z.enum(["mild", "moderate", "severe"]).describe("Patient's assessment of symptom severity"),
    age: z.number().optional().describe("Patient's age in years"),
    hasChronicConditions: z.boolean().optional().describe("Whether patient has any chronic health conditions"),
  }),
  execute: async ({ symptoms, duration, severity, age, hasChronicConditions }) => {
    // Define emergency symptoms that require immediate attention
    const emergencySymptoms = new Set([
      "chest pain", "difficulty breathing", "severe bleeding", "loss of consciousness",
      "severe head injury", "stroke symptoms", "seizure", "severe abdominal pain",
      "high fever with confusion", "inability to speak", "sudden vision loss"
    ]);

    // Define urgent symptoms requiring prompt medical attention
    const urgentSymptoms = new Set([
      "high fever", "persistent vomiting", "severe diarrhea", "dehydration",
      "severe headache", "persistent pain", "difficulty urinating", "blood in urine",
      "blood in stool", "unusual bleeding", "severe rash"
    ]);

    // Normalize symptoms for efficient matching
    const normalizedSymptoms = symptoms.map(s => s.toLowerCase());
    
    // Check for emergency symptoms (using efficient Set-based matching)
    const hasEmergencySymptoms = normalizedSymptoms.some(symptom =>
      Array.from(emergencySymptoms).some(emergency => symptom.includes(emergency))
    );

    // Check for urgent symptoms
    const hasUrgentSymptoms = normalizedSymptoms.some(symptom =>
      Array.from(urgentSymptoms).some(urgent => symptom.includes(urgent))
    );

    // Determine urgency level
    let urgencyLevel: "emergency" | "urgent" | "routine" | "self-care";
    let recommendation: string;
    let careLocation: string;

    if (hasEmergencySymptoms || (severity === "severe" && hasChronicConditions)) {
      urgencyLevel = "emergency";
      recommendation = "Seek immediate emergency medical attention. Go to the nearest hospital emergency department or call for emergency services.";
      careLocation = "Emergency Department / Hospital";
    } else if (hasUrgentSymptoms || severity === "severe") {
      urgencyLevel = "urgent";
      recommendation = "See a doctor as soon as possible, preferably within 24 hours. Visit your local health center or clinic.";
      careLocation = "Health Center / Clinic / Doctor";
    } else if (severity === "moderate" || duration.includes("week") || duration.includes("weeks")) {
      urgencyLevel = "routine";
      recommendation = "Schedule an appointment with a healthcare provider within a few days. Monitor symptoms and seek earlier care if they worsen.";
      careLocation = "Community Health Center / General Practitioner";
    } else {
      urgencyLevel = "self-care";
      recommendation = "Symptoms appear mild. Practice self-care measures like rest, hydration, and over-the-counter medications if appropriate. Monitor symptoms and seek medical care if they worsen or persist beyond a few days.";
      careLocation = "Home care / Pharmacy for OTC medications";
    }

    // Special considerations for vulnerable populations
    const specialConsiderations: string[] = [];
    if (age && age < 5) {
      specialConsiderations.push("Young children require closer monitoring. Seek medical attention if symptoms worsen or new symptoms develop.");
    }
    if (age && age > 65) {
      specialConsiderations.push("Elderly patients may need earlier medical evaluation. Consider seeking professional advice sooner.");
    }
    if (hasChronicConditions) {
      specialConsiderations.push("Chronic conditions may complicate symptoms. Consult with your regular healthcare provider.");
    }

    return {
      urgencyLevel,
      recommendation,
      careLocation,
      symptoms,
      duration,
      severity,
      specialConsiderations,
      disclaimer: "This is not a medical diagnosis. Always consult with a qualified healthcare provider for proper medical advice.",
    };
  },
});
