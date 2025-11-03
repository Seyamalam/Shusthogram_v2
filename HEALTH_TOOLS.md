# ShusthoGram Health Tools Documentation

## Overview

ShusthoGram provides six specialized health tools that work through conversational AI to assist users with healthcare needs in rural Bangladesh.

## Available Tools

### 1. Symptom Triage Tool (`symptomTriage`)

**Purpose**: Assess symptoms and provide urgency guidance

**When to use**: When users describe health symptoms and need guidance on what action to take

**Input Parameters**:
- `symptoms`: Array of symptoms (e.g., ["fever", "cough", "headache"])
- `duration`: How long symptoms have been present (e.g., "2 days", "1 week")
- `severity`: Patient's assessment ("mild", "moderate", "severe")
- `age`: Patient's age in years (optional)
- `hasChronicConditions`: Whether patient has chronic conditions (optional)

**Output**:
- `urgencyLevel`: "emergency", "urgent", "routine", or "self-care"
- `recommendation`: Specific action to take
- `careLocation`: Where to seek care
- `specialConsiderations`: Special advice for vulnerable populations
- `disclaimer`: Medical disclaimer

**Example Usage**:
```
User: "I have high fever and severe headache for 3 days. I'm 45 years old."
AI: [Uses symptomTriage tool]
Result: Urgent care needed - visit health center within 24 hours
```

### 2. Health Facility Locator Tool (`healthFacilityLocator`)

**Purpose**: Find nearby health facilities based on location and care needed

**When to use**: When users need to find hospitals, clinics, pharmacies, or diagnostic centers

**Input Parameters**:
- `latitude`: User's current latitude
- `longitude`: User's current longitude
- `facilityType`: Type of facility needed
  - "emergency": Emergency department/hospital
  - "hospital": District hospital or medical college
  - "health_center": Upazila Health Complex or Community Clinic
  - "clinic": Private clinic or doctor's chamber
  - "pharmacy": Medicine shop or pharmacy
  - "diagnostic_center": Diagnostic center or pathology lab
- `radius`: Search radius in kilometers (default: 10)

**Output**:
- `facilities`: List of nearby facilities with:
  - Name, address, distance
  - Phone number
  - Available services
  - Open hours
  - Whether free service is available
- `instructions`: Transportation and access guidance

**Example Usage**:
```
User: "Where is the nearest health center?"
AI: [Uses healthFacilityLocator with user's location]
Result: Shows 3 nearby health centers with distances and contact info
```

### 3. Health Record Tool (`healthRecord`)

**Purpose**: Manage digital health records for patients

**When to use**: To create, retrieve, update, or add visits to health records

**Input Parameters**:
- `action`: "create", "retrieve", "update", or "add_visit"
- `userId`: Unique identifier for the patient
- `recordData`: Health information including:
  - `symptoms`: Reported symptoms
  - `diagnosis`: Doctor's diagnosis
  - `prescription`: Prescribed medications
  - `doctorNotes`: Doctor's recommendations
  - `visitDate`: Date of consultation
  - `vitalSigns`: Blood pressure, temperature, heart rate, weight
  - `followUpDate`: Recommended follow-up date

**Output**:
- Confirmation of action taken
- Record ID or retrieved record data
- Secure storage confirmation

**Example Usage**:
```
User: "Can you save my doctor's prescription?"
AI: [Uses healthRecord with action="add_visit"]
Result: Consultation recorded in digital health history
```

### 4. Vaccination Reminder Tool (`vaccinationReminder`)

**Purpose**: Provide vaccination schedules and reminders for children

**When to use**: When users ask about child vaccinations or vaccine schedules

**Input Parameters**:
- `ageInMonths`: Child's age in months
- `previousVaccinations`: List of vaccines already received (optional)

**Output**:
- `dueVaccinations`: Vaccines that are due now or overdue
- `upcomingVaccinations`: Next vaccines coming up
- `recommendation`: Action to take
- `whereToVaccinate`: Where to get vaccinations
- Follows Bangladesh EPI (Expanded Program on Immunization) schedule

**Example Usage**:
```
User: "My baby is 6 months old. What vaccines does she need?"
AI: [Uses vaccinationReminder]
Result: Shows due vaccines and schedule for next vaccinations
```

### 5. Health Education Tool (`healthEducation`)

**Purpose**: Provide preventive health information and disease awareness

**When to use**: When users want to learn about health topics, prevention, or disease management

**Input Parameters**:
- `topic`: Health topic requested
  - "maternal_health": Prenatal and postnatal care
  - "child_nutrition": Infant and child feeding
  - "dengue_prevention": Mosquito-borne disease prevention
  - "diarrhea_prevention": Water-borne disease prevention
  - "diabetes_management": Managing diabetes
  - "hypertension_management": Managing high blood pressure
  - "hygiene_practices": Personal and food hygiene
  - "seasonal_diseases": Seasonal health concerns
  - "family_planning": Contraception and birth spacing
  - "mental_health": Mental health awareness
- `season`: "monsoon", "winter", "summer", or "any" (optional)

**Output**:
- Detailed educational content with:
  - Key points and best practices
  - Warning signs to watch for
  - Where to access services
  - Seasonal-specific advice

**Example Usage**:
```
User: "How can I prevent dengue?"
AI: [Uses healthEducation with topic="dengue_prevention"]
Result: Provides prevention tips, symptoms, and when to seek care
```

### 6. Disease Outbreak Alert Tool (`diseaseOutbreakAlert`)

**Purpose**: Get information about disease outbreaks in specific regions

**When to use**: When users want to know about current health alerts or outbreaks

**Input Parameters**:
- `district`: District name to check (optional)
- `diseaseType`: Specific disease or "all" (default: "all")
  - Options: "dengue", "cholera", "typhoid", "covid", "measles"

**Output**:
- Current health alerts and outbreaks
- Affected areas
- Severity level
- Recommendations
- Last updated date

**Example Usage**:
```
User: "Are there any disease outbreaks in Dhaka?"
AI: [Uses diseaseOutbreakAlert with district="Dhaka"]
Result: Shows current health alerts for Dhaka region
```

## Integration with Chat Interface

All tools are automatically invoked by the AI based on user queries. Users don't need to explicitly call tools - they simply describe their needs in natural language.

### Example Conversations

**Symptom Assessment**:
```
User: "আমার জ্বর এবং কাশি আছে" (I have fever and cough)
AI: Let me assess your symptoms...
[Uses symptomTriage]
AI: Based on your symptoms, this appears to be a routine case...
```

**Finding Care**:
```
User: "Where can I get medicines nearby?"
AI: Let me find pharmacies near you...
[Uses healthFacilityLocator]
AI: Here are 3 pharmacies within 2 km of your location...
```

**Health Education**:
```
User: "How do I take care of my pregnant wife?"
AI: Let me provide maternal health guidance...
[Uses healthEducation]
AI: Here are important prenatal care tips...
```

## Technical Notes

- All tools return structured data that the AI formats into user-friendly responses
- Tools are designed to work with minimal internet connectivity
- Health records are stored securely with encryption
- Location data is only used for facility finding and is not stored
- All tools include medical disclaimers reminding users to consult healthcare professionals

## Future Enhancements

Planned improvements:
- Integration with actual facility databases
- Real-time disease outbreak data from DGHS
- Voice input/output in Bengali
- Telemedicine integration
- SMS-based access for users without smartphones
- Offline mode for basic triage

## Support

For technical issues or questions about health tools:
- Check the main README.md for setup instructions
- Review tool implementation in `lib/ai/tools/` directory
- Contact development team for assistance
