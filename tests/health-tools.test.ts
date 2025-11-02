/**
 * Unit tests for ShusthoGram health tools
 * These tests verify the basic functionality of each health tool
 */

import { describe, test, expect } from '@playwright/test';
import { symptomTriage } from '@/lib/ai/tools/symptom-triage';
import { healthFacilityLocator } from '@/lib/ai/tools/health-facility-locator';
import { healthRecord, vaccinationReminder } from '@/lib/ai/tools/health-record';
import { healthEducation, diseaseOutbreakAlert } from '@/lib/ai/tools/health-education';

describe('Health Tools', () => {
  describe('Symptom Triage Tool', () => {
    test('should assess mild symptoms correctly', async () => {
      const result = await symptomTriage.execute({
        symptoms: ['mild headache', 'fatigue'],
        duration: '1 day',
        severity: 'mild',
      });

      expect(result.urgencyLevel).toBe('self-care');
      expect(result.recommendation).toContain('self-care');
      expect(result.disclaimer).toBeTruthy();
    });

    test('should flag emergency symptoms', async () => {
      const result = await symptomTriage.execute({
        symptoms: ['severe chest pain', 'difficulty breathing'],
        duration: '1 hour',
        severity: 'severe',
      });

      expect(result.urgencyLevel).toBe('emergency');
      expect(result.recommendation).toContain('immediate');
      expect(result.careLocation).toContain('Emergency');
    });

    test('should consider age in assessment', async () => {
      const result = await symptomTriage.execute({
        symptoms: ['fever'],
        duration: '2 days',
        severity: 'moderate',
        age: 3,
      });

      expect(result.specialConsiderations).toContain('Young children');
    });
  });

  describe('Health Facility Locator Tool', () => {
    test('should find health facilities', async () => {
      const result = await healthFacilityLocator.execute({
        latitude: 23.8103,
        longitude: 90.4125,
        facilityType: 'health_center',
        radius: 10,
      });

      expect(result.facilitiesFound).toBeGreaterThan(0);
      expect(result.facilities).toBeInstanceOf(Array);
      expect(result.searchLocation).toEqual({
        latitude: 23.8103,
        longitude: 90.4125,
      });
    });

    test('should filter by facility type', async () => {
      const result = await healthFacilityLocator.execute({
        latitude: 23.8103,
        longitude: 90.4125,
        facilityType: 'pharmacy',
      });

      expect(result.facilityType).toContain('Pharmacy');
      expect(result.facilities.length).toBeGreaterThan(0);
    });
  });

  describe('Health Record Tool', () => {
    test('should create new health record', async () => {
      const result = await healthRecord.execute({
        action: 'create',
        userId: 'test-user-123',
        recordData: {
          symptoms: ['fever', 'cough'],
        },
      });

      expect(result.success).toBe(true);
      expect(result.recordId).toBeTruthy();
      expect(result.userId).toBe('test-user-123');
    });

    test('should retrieve health record', async () => {
      const result = await healthRecord.execute({
        action: 'retrieve',
        userId: 'test-user-123',
      });

      expect(result.success).toBe(true);
      expect(result.record).toBeTruthy();
    });

    test('should add visit to record', async () => {
      const result = await healthRecord.execute({
        action: 'add_visit',
        userId: 'test-user-123',
        recordData: {
          symptoms: ['headache'],
          diagnosis: 'Tension headache',
          prescription: ['Rest', 'Paracetamol if needed'],
        },
      });

      expect(result.success).toBe(true);
      expect(result.visitData).toBeTruthy();
    });
  });

  describe('Vaccination Reminder Tool', () => {
    test('should provide schedule for newborn', async () => {
      const result = await vaccinationReminder.execute({
        ageInMonths: 0,
        previousVaccinations: [],
      });

      expect(result.dueVaccinations.length).toBeGreaterThan(0);
      expect(result.dueVaccinations[0].vaccines).toContain('BCG');
    });

    test('should show upcoming vaccinations', async () => {
      const result = await vaccinationReminder.execute({
        ageInMonths: 3,
        previousVaccinations: ['BCG', 'OPV-0'],
      });

      expect(result.upcomingVaccinations.length).toBeGreaterThan(0);
      expect(result.recommendation).toBeTruthy();
    });

    test('should detect overdue vaccinations', async () => {
      const result = await vaccinationReminder.execute({
        ageInMonths: 12,
        previousVaccinations: [],
      });

      expect(result.dueVaccinations.length).toBeGreaterThan(0);
      expect(result.recommendation).toContain('visit');
    });
  });

  describe('Health Education Tool', () => {
    test('should provide maternal health information', async () => {
      const result = await healthEducation.execute({
        topic: 'maternal_health',
      });

      expect(result.title).toContain('Maternal Health');
      expect(result.keyPoints).toBeInstanceOf(Array);
      expect(result.keyPoints.length).toBeGreaterThan(0);
      expect(result.warningSign).toBeTruthy();
    });

    test('should provide dengue prevention info', async () => {
      const result = await healthEducation.execute({
        topic: 'dengue_prevention',
        season: 'monsoon',
      });

      expect(result.title).toContain('Dengue');
      expect(result.keyPoints).toContain('Remove stagnant water');
      expect(result.seasonalAlert).toContain('Monsoon');
    });

    test('should provide child nutrition guidance', async () => {
      const result = await healthEducation.execute({
        topic: 'child_nutrition',
      });

      expect(result.title).toContain('Child Nutrition');
      expect(result.keyPoints).toContain('Exclusive breastfeeding for first 6 months');
    });
  });

  describe('Disease Outbreak Alert Tool', () => {
    test('should fetch outbreak alerts', async () => {
      const result = await diseaseOutbreakAlert.execute({
        diseaseType: 'all',
      });

      expect(result.searchLocation).toBe('National');
      expect(result.alertsFound).toBeGreaterThanOrEqual(0);
      expect(result.alerts).toBeInstanceOf(Array);
    });

    test('should filter by district', async () => {
      const result = await diseaseOutbreakAlert.execute({
        district: 'Dhaka',
        diseaseType: 'all',
      });

      expect(result.searchLocation).toBe('Dhaka');
      expect(result.generalAdvice).toBeTruthy();
    });

    test('should filter by disease type', async () => {
      const result = await diseaseOutbreakAlert.execute({
        diseaseType: 'dengue',
      });

      expect(result.diseaseType).toBe('dengue');
    });
  });
});
