import { tool } from "ai";
import { z } from "zod";

/**
 * Health Education Tool
 * Provides preventive health information and disease awareness
 */
export const healthEducation = tool({
  description:
    "Provide health education, preventive care tips, and disease awareness information relevant to Bangladesh. Covers topics like maternal health, child nutrition, seasonal diseases, hygiene, and chronic disease management.",
  inputSchema: z.object({
    topic: z.enum([
      "maternal_health",
      "child_nutrition",
      "dengue_prevention",
      "diarrhea_prevention",
      "diabetes_management",
      "hypertension_management",
      "hygiene_practices",
      "seasonal_diseases",
      "family_planning",
      "mental_health",
    ]).describe("Health education topic requested"),
    season: z.enum(["monsoon", "winter", "summer", "any"]).optional().default("any").describe("Current season for context"),
  }),
  execute: async ({ topic, season = "any" }) => {
    const educationContent: Record<string, any> = {
      maternal_health: {
        title: "Maternal Health Care - প্রসবপূর্ব এবং প্রসবোত্তর যত্ন",
        keyPoints: [
          "At least 4 antenatal checkups during pregnancy",
          "Take iron and folic acid supplements daily",
          "Eat nutritious food - more vegetables, fruits, proteins",
          "Institutional delivery is safer - deliver at health facility",
          "Exclusive breastfeeding for first 6 months",
          "Postnatal checkup within 42 days of delivery",
        ],
        warningSign: "Seek immediate medical help if: severe bleeding, high fever, severe headache, convulsions, severe abdominal pain, or difficulty breathing",
        where: "Visit Upazila Health Complex or Community Clinic for antenatal care",
        governmentSupport: "Free maternal health services available at government facilities",
      },
      child_nutrition: {
        title: "Child Nutrition - শিশু পুষ্টি",
        keyPoints: [
          "Exclusive breastfeeding for first 6 months",
          "Start complementary feeding at 6 months with continued breastfeeding",
          "Feed mashed khichuri, egg, fish, vegetables, fruits",
          "Feed 5 times a day for children 6-23 months",
          "Ensure hand washing before feeding",
          "Monitor child's weight regularly at health center",
        ],
        warningSign: "Signs of malnutrition: not gaining weight, swollen limbs, constant tiredness, frequent infections",
        where: "Free nutrition counseling available at Community Clinics and Health Centers",
        supplementation: "Vitamin A capsules available at health centers - give at 6, 12, 18 months",
      },
      dengue_prevention: {
        title: "Dengue Prevention - ডেঙ্গু প্রতিরোধ",
        keyPoints: [
          "Remove stagnant water from containers, tires, flower pots",
          "Change water in flower vases every 3 days",
          "Use mosquito nets while sleeping",
          "Wear full-sleeve clothes during daytime",
          "Use mosquito repellent",
          "Keep surroundings clean",
        ],
        symptoms: "High fever, severe headache, pain behind eyes, joint pain, rash, nausea",
        warningSign: "Seek immediate medical help if: severe abdominal pain, persistent vomiting, bleeding gums/nose, difficulty breathing",
        seasonalAlert: season === "monsoon" ? "Monsoon season has higher dengue risk - be extra vigilant!" : "",
        where: "Visit nearest health center if symptoms appear. Blood test available at government facilities.",
      },
      diarrhea_prevention: {
        title: "Diarrhea Prevention - ডায়রিয়া প্রতিরোধ",
        keyPoints: [
          "Drink safe water - boil or use water purification tablets",
          "Wash hands with soap before eating and after toilet",
          "Keep food covered and eat freshly cooked food",
          "Maintain toilet hygiene",
          "Wash fruits and vegetables before eating",
        ],
        treatment: "Give ORS (Oral Rehydration Solution) immediately. Continue feeding. Give zinc supplements for 10-14 days.",
        warningSign: "Seek medical help if: blood in stool, high fever, severe dehydration, vomiting everything, no urination for 8+ hours",
        where: "ORS packets available free at community clinics and pharmacies",
        seasonalAlert: season === "monsoon" ? "Diarrheal diseases increase during monsoon - practice extra hygiene!" : "",
      },
      diabetes_management: {
        title: "Diabetes Management - ডায়াবেটিস ব্যবস্থাপনা",
        keyPoints: [
          "Check blood sugar regularly",
          "Take medications as prescribed - don't skip",
          "Eat regular meals - avoid too much rice, sugar, fried foods",
          "Exercise daily - walk for 30 minutes",
          "Check feet daily for cuts or wounds",
          "Control blood pressure and cholesterol",
        ],
        diet: "Eat more vegetables, whole grains, lean proteins. Limit white rice, sweets, fried foods.",
        warningSign: "Seek immediate help if: very high or very low blood sugar, unconsciousness, chest pain, severe infection",
        where: "Free diabetes screening available at Upazila Health Complex. NCD corner provides medicines.",
        monitoring: "Get HbA1c test every 3 months, eye checkup yearly, kidney function test yearly",
      },
      hypertension_management: {
        title: "Hypertension Management - উচ্চ রক্তচাপ ব্যবস্থাপনা",
        keyPoints: [
          "Take blood pressure medicine regularly",
          "Reduce salt intake - less than 1 teaspoon per day",
          "Exercise regularly - 30 minutes daily walk",
          "Maintain healthy weight",
          "Avoid smoking and tobacco",
          "Manage stress - adequate sleep, relaxation",
        ],
        diet: "Eat more fruits, vegetables, whole grains. Avoid processed foods, excess salt, fried foods.",
        warningSign: "Seek immediate help if: severe headache, chest pain, difficulty breathing, vision problems, numbness",
        where: "Free blood pressure check at community clinics. NCD corner at Upazila Health Complex provides medicines.",
        monitoring: "Check blood pressure regularly - at least once a month",
      },
      hygiene_practices: {
        title: "Hygiene Practices - স্বাস্থ্যবিধি অনুশীলন",
        keyPoints: [
          "Wash hands with soap: before eating, after toilet, before cooking",
          "Use clean latrines - practice safe sanitation",
          "Bathe regularly and keep clothes clean",
          "Brush teeth twice daily",
          "Trim nails regularly",
          "Keep surroundings clean - dispose garbage properly",
        ],
        handwashing: "Wash hands for 20 seconds with soap and running water. Scrub all parts including between fingers.",
        foodSafety: "Cook food thoroughly, keep food covered, separate raw and cooked food, refrigerate leftovers",
        where: "Free soap and hygiene education available at community programs",
        impact: "Good hygiene prevents 60% of diarrheal diseases and many respiratory infections",
      },
      seasonal_diseases: {
        title: "Seasonal Disease Awareness",
        monsoonDiseases: "Dengue, Diarrhea, Typhoid, Leptospirosis, Skin infections",
        winterDiseases: "Pneumonia, Common cold, Asthma flare-ups, Skin dryness",
        summerDiseases: "Heat stroke, Dehydration, Food poisoning, Chickenpox",
        currentSeasonTips: season === "monsoon" 
          ? "Monsoon: Avoid stagnant water, drink safe water, eat freshly cooked food, use mosquito protection"
          : season === "winter"
          ? "Winter: Keep children warm, vaccinate against flu, eat nutritious food, cover mouth when coughing"
          : season === "summer"
          ? "Summer: Drink plenty of water, avoid direct sun, eat fresh fruits, maintain food hygiene"
          : "Stay aware of seasonal disease patterns and take preventive measures",
      },
      family_planning: {
        title: "Family Planning - পরিবার পরিকল্পনা",
        keyPoints: [
          "Space births at least 3 years apart for mother and child health",
          "Various contraceptive methods available: pills, injections, IUD, implants, condoms",
          "Family planning services are free at government facilities",
          "Consult with health worker to choose suitable method",
          "Both partners should be involved in family planning decisions",
        ],
        benefits: "Healthy spacing improves maternal health, reduces infant mortality, ensures better child development",
        where: "Free family planning services at Community Clinics, Upazila Health Complex, and Family Welfare Centers",
        counseling: "Trained family planning counselors available to discuss all options confidentially",
      },
      mental_health: {
        title: "Mental Health Awareness - মানসিক স্বাস্থ্য সচেতনতা",
        keyPoints: [
          "Mental health is as important as physical health",
          "It's okay to seek help for emotional problems",
          "Talk to trusted family members or friends about your feelings",
          "Practice stress management - adequate sleep, exercise, relaxation",
          "Avoid substance abuse",
        ],
        warningSign: "Seek help if: persistent sadness, loss of interest, thoughts of self-harm, inability to function daily",
        where: "Mental health services available at District Hospital. National Mental Health Helpline: 16111",
        stigma: "Mental illness is treatable. Seeking help is a sign of strength, not weakness.",
        support: "Family support is crucial for mental health recovery",
      },
    };

    const content = educationContent[topic];
    
    return {
      ...content,
      language: "Content provided in English. Bengali (বাংলা) version available through voice interface.",
      disclaimer: "This information is for educational purposes. Always consult healthcare providers for personalized medical advice.",
      additionalResources: "Visit your nearest Community Clinic or Upazila Health Complex for more information and free health services.",
    };
  },
});

/**
 * Disease Outbreak Alert Tool
 * Provides alerts about disease outbreaks in specific regions
 */
export const diseaseOutbreakAlert = tool({
  description:
    "Get information about current disease outbreaks or health alerts in Bangladesh or specific regions.",
  inputSchema: z.object({
    district: z.string().optional().describe("District name to check for local outbreaks"),
    diseaseType: z.enum(["all", "dengue", "cholera", "typhoid", "covid", "measles"]).optional().default("all"),
  }),
  execute: async ({ district, diseaseType = "all" }) => {
    // In real implementation, this would fetch from DGHS or WHO database
    // For now, providing sample structure
    
    const currentAlerts = [
      {
        disease: "Dengue",
        severity: "moderate",
        affectedAreas: ["Dhaka", "Chattogram", "Sylhet"],
        recommendation: "Use mosquito protection, remove stagnant water, seek medical care for fever",
        lastUpdated: new Date().toISOString().split('T')[0],
      },
      {
        disease: "Diarrhea",
        severity: "low",
        affectedAreas: ["Coastal districts"],
        recommendation: "Drink safe water, maintain hygiene, use ORS for treatment",
        lastUpdated: new Date().toISOString().split('T')[0],
      },
    ];

    const filteredAlerts = diseaseType === "all" 
      ? currentAlerts 
      : currentAlerts.filter(alert => 
          alert.disease.toLowerCase() === diseaseType.toLowerCase()
        );

    const localAlerts = district 
      ? filteredAlerts.filter(alert => 
          alert.affectedAreas.some(area => 
            area.toLowerCase().includes(district.toLowerCase())
          )
        )
      : filteredAlerts;

    return {
      searchLocation: district || "National",
      diseaseType,
      alertsFound: localAlerts.length,
      alerts: localAlerts,
      generalAdvice: "Stay informed about health alerts, practice preventive measures, and seek medical care early if symptoms appear",
      source: "Data from Directorate General of Health Services (DGHS), Bangladesh",
      note: "This is a sample alert system. In production, real-time data from health authorities would be integrated.",
    };
  },
});
