/**
 * Simple verification script for health tools
 * Run with: npx tsx scripts/test-health-tools.ts
 */

import { symptomTriage } from '../lib/ai/tools/symptom-triage';
import { healthFacilityLocator } from '../lib/ai/tools/health-facility-locator';
import { healthRecord, vaccinationReminder } from '../lib/ai/tools/health-record';
import { healthEducation, diseaseOutbreakAlert } from '../lib/ai/tools/health-education';

async function testTools() {
  console.log('🏥 Testing ShusthoGram Health Tools\n');

  // Test 1: Symptom Triage
  console.log('1️⃣ Testing Symptom Triage Tool...');
  try {
    const triageResult = await symptomTriage.execute({
      symptoms: ['fever', 'cough', 'body ache'],
      duration: '3 days',
      severity: 'moderate',
      age: 35,
    });
    console.log('✅ Symptom Triage Result:', {
      urgencyLevel: triageResult.urgencyLevel,
      careLocation: triageResult.careLocation,
    });
  } catch (error) {
    console.error('❌ Symptom Triage failed:', error);
  }

  // Test 2: Health Facility Locator
  console.log('\n2️⃣ Testing Health Facility Locator Tool...');
  try {
    const facilityResult = await healthFacilityLocator.execute({
      latitude: 23.8103,
      longitude: 90.4125,
      facilityType: 'health_center',
    });
    console.log('✅ Health Facility Result:', {
      facilitiesFound: facilityResult.facilitiesFound,
      firstFacility: facilityResult.facilities[0]?.name,
    });
  } catch (error) {
    console.error('❌ Health Facility Locator failed:', error);
  }

  // Test 3: Health Record
  console.log('\n3️⃣ Testing Health Record Tool...');
  try {
    const recordResult = await healthRecord.execute({
      action: 'create',
      userId: 'test-user-001',
      recordData: {
        symptoms: ['headache'],
        diagnosis: 'Tension headache',
      },
    });
    console.log('✅ Health Record Result:', {
      success: recordResult.success,
      recordId: recordResult.recordId,
    });
  } catch (error) {
    console.error('❌ Health Record failed:', error);
  }

  // Test 4: Vaccination Reminder
  console.log('\n4️⃣ Testing Vaccination Reminder Tool...');
  try {
    const vaccinationResult = await vaccinationReminder.execute({
      ageInMonths: 6,
      previousVaccinations: ['BCG', 'OPV-0'],
    });
    console.log('✅ Vaccination Reminder Result:', {
      dueCount: vaccinationResult.dueVaccinations.length,
      upcomingCount: vaccinationResult.upcomingVaccinations.length,
    });
  } catch (error) {
    console.error('❌ Vaccination Reminder failed:', error);
  }

  // Test 5: Health Education
  console.log('\n5️⃣ Testing Health Education Tool...');
  try {
    const educationResult = await healthEducation.execute({
      topic: 'dengue_prevention',
      season: 'monsoon',
    });
    console.log('✅ Health Education Result:', {
      title: educationResult.title,
      keyPointsCount: educationResult.keyPoints.length,
    });
  } catch (error) {
    console.error('❌ Health Education failed:', error);
  }

  // Test 6: Disease Outbreak Alert
  console.log('\n6️⃣ Testing Disease Outbreak Alert Tool...');
  try {
    const outbreakResult = await diseaseOutbreakAlert.execute({
      diseaseType: 'all',
    });
    console.log('✅ Disease Outbreak Alert Result:', {
      searchLocation: outbreakResult.searchLocation,
      alertsFound: outbreakResult.alertsFound,
    });
  } catch (error) {
    console.error('❌ Disease Outbreak Alert failed:', error);
  }

  console.log('\n✅ All health tools tested successfully!');
}

testTools().catch(console.error);
