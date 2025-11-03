import type { InferUITool, UIMessage } from "ai";
import { z } from "zod";
import type { ArtifactKind } from "@/components/artifact";
import type { symptomTriage } from "./ai/tools/symptom-triage";
import type { healthFacilityLocator } from "./ai/tools/health-facility-locator";
import type { healthRecord, vaccinationReminder } from "./ai/tools/health-record";
import type { healthEducation, diseaseOutbreakAlert } from "./ai/tools/health-education";
import type { Suggestion } from "./db/schema";
import type { AppUsage } from "./usage";

export type DataPart = { type: "append-message"; message: string };

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

type symptomTriageTool = InferUITool<typeof symptomTriage>;
type healthFacilityLocatorTool = InferUITool<typeof healthFacilityLocator>;
type healthRecordTool = InferUITool<typeof healthRecord>;
type vaccinationReminderTool = InferUITool<typeof vaccinationReminder>;
type healthEducationTool = InferUITool<typeof healthEducation>;
type diseaseOutbreakAlertTool = InferUITool<typeof diseaseOutbreakAlert>;

export type ChatTools = {
  symptomTriage: symptomTriageTool;
  healthFacilityLocator: healthFacilityLocatorTool;
  healthRecord: healthRecordTool;
  vaccinationReminder: vaccinationReminderTool;
  healthEducation: healthEducationTool;
  diseaseOutbreakAlert: diseaseOutbreakAlertTool;
};

export type CustomUIDataTypes = {
  textDelta: string;
  imageDelta: string;
  sheetDelta: string;
  codeDelta: string;
  suggestion: Suggestion;
  appendMessage: string;
  id: string;
  title: string;
  kind: ArtifactKind;
  clear: null;
  finish: null;
  usage: AppUsage;
};

export type ChatMessage = UIMessage<
  MessageMetadata,
  CustomUIDataTypes,
  ChatTools
>;

export type Attachment = {
  name: string;
  url: string;
  contentType: string;
};
