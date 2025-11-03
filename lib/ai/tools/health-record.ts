import { tool } from "ai";
import { z } from "zod";

/**
 * Health Record Tool
 * Manages digital health records for users
 */
export const healthRecord = tool({
  description:
    "Create, retrieve, or update health records for patients. Records include medical history, symptoms, diagnoses, prescriptions, and visit notes.",
  inputSchema: z.object({
    action: z.enum(["create", "retrieve", "update", "add_visit"]).describe("Action to perform on health record"),
    userId: z.string().describe("Unique identifier for the patient"),
    recordData: z.object({
      symptoms: z.array(z.string()).optional().describe("Symptoms reported"),
      diagnosis: z.string().optional().describe("Doctor's diagnosis"),
      prescription: z.array(z.string()).optional().describe("Prescribed medications"),
      doctorNotes: z.string().optional().describe("Doctor's notes or recommendations"),
      visitDate: z.string().optional().describe("Date of consultation"),
      vitalSigns: z.object({
        bloodPressure: z.string().optional(),
        temperature: z.string().optional(),
        heartRate: z.string().optional(),
        weight: z.string().optional(),
      }).optional().describe("Vital signs recorded during visit"),
      followUpDate: z.string().optional().describe("Recommended follow-up date"),
    }).optional(),
  }),
  execute: async ({ action, userId, recordData }) => {
    // In a real implementation, this would interact with a secure database
    // For now, we'll simulate the operations
    
    const timestamp = new Date().toISOString();

    switch (action) {
      case "create":
        return {
          success: true,
          message: "New health record created successfully",
          recordId: `HR-${userId}-${Date.now()}`,
          userId,
          createdAt: timestamp,
          recordData: recordData || {},
          note: "Your health record has been created. All information is stored securely and encrypted.",
        };

      case "retrieve":
        // Simulate retrieving existing record
        return {
          success: true,
          message: "Health record retrieved successfully",
          userId,
          record: {
            recordId: `HR-${userId}-001`,
            createdAt: "2024-01-15T10:00:00Z",
            lastUpdated: timestamp,
            visits: [
              {
                visitDate: "2024-01-15",
                symptoms: ["fever", "cough", "body ache"],
                diagnosis: "Viral fever",
                prescription: ["Paracetamol 500mg - 3 times daily", "Rest and fluids"],
                doctorName: "Dr. Rahman",
                facility: "Upazila Health Complex",
              },
            ],
            chronicConditions: [],
            allergies: [],
            vaccinations: [],
          },
          note: "This is a summary of your health history. You can share this with healthcare providers during consultations.",
        };

      case "update":
        return {
          success: true,
          message: "Health record updated successfully",
          userId,
          updatedAt: timestamp,
          updatedFields: Object.keys(recordData || {}).filter(
            key => recordData?.[key as keyof typeof recordData] !== undefined
          ),
          note: "Your health information has been updated in your digital record.",
        };

      case "add_visit":
        return {
          success: true,
          message: "New visit added to health record",
          userId,
          visitData: {
            visitId: `VISIT-${Date.now()}`,
            recordedAt: timestamp,
            ...recordData,
          },
          note: "This consultation has been recorded in your health history for future reference.",
        };

      default:
        return {
          success: false,
          message: "Invalid action specified",
        };
    }
  },
});

/**
 * Vaccination Reminder Tool
 * Provides vaccination schedules and reminders
 */
export const vaccinationReminder = tool({
  description:
    "Get vaccination schedules for children or reminders for due vaccinations based on age and vaccination history.",
  inputSchema: z.object({
    ageInMonths: z.number().describe("Child's age in months"),
    previousVaccinations: z.array(z.string()).optional().describe("List of vaccines already received"),
  }),
  execute: async ({ ageInMonths, previousVaccinations = [] }) => {
    // Standard Bangladesh EPI (Expanded Program on Immunization) schedule
    // Ages in weeks for consistency: birth=0, 6w, 10w, 14w, 36w(9mo), 60w(15mo)
    const vaccinationSchedule = [
      { age: 0, ageLabel: "At birth", vaccines: ["BCG", "OPV-0", "Hepatitis B-1"] },
      { age: 1.5, ageLabel: "6 weeks", vaccines: ["Pentavalent-1", "OPV-1", "PCV-1"] },
      { age: 2.5, ageLabel: "10 weeks", vaccines: ["Pentavalent-2", "OPV-2", "PCV-2"] },
      { age: 3.5, ageLabel: "14 weeks", vaccines: ["Pentavalent-3", "OPV-3", "PCV-3", "IPV"] },
      { age: 9, ageLabel: "9 months", vaccines: ["Measles-Rubella-1", "OPV-4"] },
      { age: 15, ageLabel: "15 months", vaccines: ["Measles-Rubella-2"] },
    ];

    // Find due and upcoming vaccinations
    const dueVaccinations = [];
    const upcomingVaccinations = [];

    for (const schedule of vaccinationSchedule) {
      const vaccines = schedule.vaccines.filter(v => !previousVaccinations.includes(v));
      
      if (vaccines.length > 0) {
        if (ageInMonths >= schedule.age) {
          dueVaccinations.push({
            ageLabel: schedule.ageLabel,
            vaccines,
            status: "overdue or due now",
          });
        } else {
          upcomingVaccinations.push({
            ageLabel: schedule.ageLabel,
            vaccines,
            monthsUntilDue: schedule.age - ageInMonths,
          });
        }
      }
    }

    return {
      childAge: `${ageInMonths} months`,
      dueVaccinations,
      upcomingVaccinations: upcomingVaccinations.slice(0, 2), // Next 2 upcoming
      recommendation: dueVaccinations.length > 0
        ? "Please visit your nearest health center or EPI outreach center for due vaccinations."
        : "All vaccinations are up to date. Keep track of upcoming vaccinations.",
      whereToVaccinate: "Vaccinations are available free of cost at government health centers, community clinics, and EPI outreach centers.",
      note: "Keep your child's vaccination card safe and bring it to every vaccination visit.",
    };
  },
});
